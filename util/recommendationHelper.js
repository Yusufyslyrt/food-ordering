import * as tf from '@tensorflow/tfjs';

// Özellik vektörü oluşturma
const createFeatureVector = (ingredients, allIngredients) => {
  return allIngredients.map(ing => ingredients.includes(ing) ? 1 : 0);
};

// Kosinüs benzerliği hesaplama
const calculateCosineSimilarity = (vector1, vector2) => {
  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

export const getRecommendations = async (cartProducts, allProducts) => {
  try {
    // Tüm benzersiz malzemeleri topla
    const allIngredients = [...new Set(
      allProducts.flatMap(product => product.ingredients)
    )];

    // Sepetteki ürünlerin kategorilerini topla
    const cartCategories = [...new Set(
      cartProducts.map(product => product.category)
    )];

    // Sepetteki ürünlerin malzemelerini birleştir
    const cartIngredients = [...new Set(
      cartProducts.flatMap(product => product.ingredients)
    )];

    if (cartIngredients.length === 0) return [];

    // Her kategori için ayrı öneriler oluştur
    const recommendationsByCategory = {};
    cartCategories.forEach(category => {
      // Kategori bazlı sepet ürünleri
      const categoryCartProducts = cartProducts.filter(p => p.category === category);
      const categoryCartIngredients = [...new Set(
        categoryCartProducts.flatMap(p => p.ingredients)
      )];
      const categoryVector = createFeatureVector(categoryCartIngredients, allIngredients);

      // Aynı kategorideki diğer ürünleri değerlendir
      const categorySimilarities = allProducts
        .filter(product => 
          product.category === category &&
          !cartProducts.some(cp => cp._id === product._id) &&
          product.ingredients.length > 0
        )
        .map(product => {
          const productVector = createFeatureVector(product.ingredients, allIngredients);
          const similarity = calculateCosineSimilarity(categoryVector, productVector);
          
          // Malzeme sayısı ağırlığı
          const ingredientCountWeight = Math.min(product.ingredients.length / 2, 1.2);
          
          return {
            ...product,
            similarity: similarity * ingredientCountWeight
          };
        })
        .filter(product => product.similarity > 0.1) // Minimum benzerlik eşiği
        .sort((a, b) => b.similarity - a.similarity);

      recommendationsByCategory[category] = categorySimilarities;
    });

    // Farklı kategorilerden önerileri birleştir
    let finalRecommendations = [];
    let categoryIndex = 0;
    const maxIterations = Math.max(
      ...Object.values(recommendationsByCategory)
        .map(recommendations => recommendations.length)
    );

    // Kategorilerden sırayla ürün al
    for (let i = 0; i < maxIterations; i++) {
      const categories = Object.keys(recommendationsByCategory);
      if (categories.length === 0) break;

      const currentCategory = categories[categoryIndex % categories.length];
      const categoryRecommendations = recommendationsByCategory[currentCategory];

      if (categoryRecommendations[i]) {
        finalRecommendations.push(categoryRecommendations[i]);
      }

      categoryIndex++;
    }

    return finalRecommendations;
  } catch (error) {
    console.error("Öneri hesaplama hatası:", error);
    return [];
  }
};

// Kategori bazlı filtreleme için yardımcı fonksiyon
export const filterByCategory = (recommendations, category) => {
  return recommendations.filter(product => product.category === category);
};

// Fiyat bazlı filtreleme için yardımcı fonksiyon
export const filterByPriceRange = (recommendations, minPrice, maxPrice) => {
  return recommendations.filter(product => 
    product.prices[0] >= minPrice && product.prices[0] <= maxPrice
  );
};

