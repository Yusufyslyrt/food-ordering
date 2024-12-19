// Jaccard benzerlik katsayısını hesaplayan fonksiyon
const calculateJaccardSimilarity = (ingredients1, ingredients2) => {
  const set1 = new Set(ingredients1);
  const set2 = new Set(ingredients2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
};

// Büyükten küçüğe sıralı ürün önerisi yapan fonksiyon
export const getRecommendations = (
  cartProducts, // Sepetteki ürünler
  allProducts,  // Tüm ürünler
  threshold = 0.1 // Minimum benzerlik skoru
) => {
  // Sepetteki tüm ürünlerin malzemelerini birleştir
  const cartIngredients = [
    ...new Set(cartProducts.flatMap((product) => product.ingredients)),
  ];

  // Eğer sepette malzeme yoksa öneri döndürme
  if (cartIngredients.length === 0) {
    return [];
  }

  // Sepette olmayan ürünleri filtrele
  const availableProducts = allProducts.filter(
    (product) =>
      !cartProducts.some((cartProduct) => cartProduct._id === product._id) &&
      product.ingredients.length > 0
  );

  // Her ürün için benzerlik skorunu hesapla
  const productsWithScores = availableProducts.map((product) => {
    const similarityScore = calculateJaccardSimilarity(
      cartIngredients,
      product.ingredients
    );
    return {
      ...product,
      similarityScore,
    };
  });

  // Benzerlik skoruna göre sıralama (yüksekten düşüğe)
  const sortedProducts = productsWithScores
    .filter((product) => product.similarityScore > threshold) // Eşik değer üzerinde olanlar
    .sort((a, b) => b.similarityScore - a.similarityScore);   // Skora göre sıralama

  // Sıralanmış tüm ürünleri döndür
  return sortedProducts;
};

/* ------------------------------------------------------------------------ */
/* 
// Jaccard benzerlik katsayısını hesaplayan fonksiyon
const calculateJaccardSimilarity = (ingredients1, ingredients2) => {
  const set1 = new Set(ingredients1);
  const set2 = new Set(ingredients2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
};

// KNN algoritması ile ürün önerisi yapan fonksiyon
export const getRecommendations = (
  cartProducts, // Sepetteki ürünler
  allProducts,  // Tüm ürünler
  k = 5,        // Komşu sayısı (K)
  threshold = 0.1 // Minimum benzerlik skoru
) => {
  // Sepetteki tüm ürünlerin malzemelerini birleştir
  const cartIngredients = [
    ...new Set(cartProducts.flatMap((product) => product.ingredients)),
  ];

  // Eğer sepette malzeme yoksa öneri döndürme
  if (cartIngredients.length === 0) {
    return [];
  }

  // Sepette olmayan ürünleri filtrele
  const availableProducts = allProducts.filter(
    (product) =>
      !cartProducts.some((cartProduct) => cartProduct._id === product._id) &&
      product.ingredients.length > 0
  );

  // Her ürün için benzerlik skorunu hesapla
  const productsWithScores = availableProducts.map((product) => {
    const similarityScore = calculateJaccardSimilarity(
      cartIngredients,
      product.ingredients
    );
    return {
      ...product,
      similarityScore,
    };
  });

  // Benzerlik skoruna göre sıralama (yüksekten düşüğe)
  const sortedProducts = productsWithScores
    .filter((product) => product.similarityScore > threshold)
    .sort((a, b) => b.similarityScore - a.similarityScore);

  // En yüksek skora sahip ilk K ürünü döndür
  return sortedProducts.slice(0, k-3);
};
 */
/* ----------------------------------------------------------------- */

/* // Jaccard benzerlik katsayısını hesaplayan fonksiyon
const calculateJaccardSimilarity = (ingredients1, ingredients2) => {
  const set1 = new Set(ingredients1);
  const set2 = new Set(ingredients2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
};

// KNN algoritması ile ürün önerisi yapan fonksiyon
export const getRecommendations = (
  cartProducts,
  allProducts,
  threshold = 0.1
) => {
  // Sepetteki tüm ürünlerin malzemelerini birleştir
  const cartIngredients = [
    ...new Set(cartProducts.flatMap((product) => product.ingredients)),
  ];
  if (cartIngredients.length === 0) {
    return [];
  }

  // Sepette olmayan ürünleri filtrele
  const availableProducts = allProducts.filter(
    (product) =>
      !cartProducts.some((cartProduct) => cartProduct._id === product._id) &&
      product.ingredients.length > 0
  );

  // Her ürün için benzerlik skorunu hesapla
  const productsWithScores = availableProducts.map((product) => {
    const similarityScore = calculateJaccardSimilarity(
      cartIngredients,
      product.ingredients
    );
    return {
      ...product,
      similarityScore,
    };
  });

  // Benzerlik skoruna göre filtrele
  const filteredProducts = productsWithScores.filter(product => product.similarityScore > threshold);

  // Tüm önerileri döndür
  return filteredProducts; // K parametresi kaldırıldı, tüm öneriler döndürülüyor
};
 */


