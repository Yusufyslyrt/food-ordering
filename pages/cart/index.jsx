import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset, addProduct } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getRecommendations } from "../../util/recommendationHelper";
import { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();
  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    method: 0,
  };
  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Sipariş vereceğinizden emin misiniz?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Sipariş başarıyla oluşturuldu", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Önce giriş yapın.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Tüm ürünleri getir
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        const allProducts = res.data;

        // Öneri hesapla
        if (cart.products.length > 0) {
          const recommendedProducts = await getRecommendations(
            cart.products,
            allProducts
          );
          setRecommendations(recommendedProducts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecommendations();
  }, [cart.products]);

  const handleAddToCart = (product) => {
    dispatch(
      addProduct({
        ...product,
        extras: [{ text: "Boş" }],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-stretch md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex flex-col justify-center items-center flex-1 p-10 overflow-x-auto w-full">
          <div className="max-h-52 overflow-auto w-full">
            {cart?.products?.length > 0 ? (
              <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      ÜRÜN
                    </th>
                    <th scope="col" className="py-3 px-6">
                      EKSTRALAR
                    </th>
                    <th scope="col" className="py-3 px-6">
                      FİYAT
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ADET
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr
                      className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                      key={index}
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                        <Image
                          src={product?.img}
                          alt=""
                          width={50}
                          height={50}
                        />
                        <span>{product.name}</span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.extras?.length > 0
                          ? product.extras.map((item) => (
                              <span key={item.id}>{item.text}, </span>
                            ))
                          : "empty"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.price} TL
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center font-semibold">Hiç Ürün Yok..</p>
            )}
          </div>
          {recommendations.length > 0 && (
            <div className="w-full py-5">
              <h2 className="text-2xl font-semibold mb-5">Önerilen Ürünler</h2>
              <div className="flex gap-4 overflow-x-auto">
                {recommendations.map((product) => (
                  <div
                    key={product._id}
                    className="bg-secondary p-4 rounded-lg text-white flex-shrink-0 w-80 flex flex-col justify-between items-start"
                  >
                    <div>
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={110}
                        height={100}
                        className="w-full h-40 object-fill rounded-lg"
                      />
                      <h3 className="text-xl mt-2">{product.title}</h3>
                      <p className="text-sm opacity-70 mt-1">
                        {product.desc}
                        {/* {product.desc.length > 50
                          ? `${product.desc.substring(0, 50)}...`
                          : product.desc} */}
                      </p>
                      <p className="mt-2">Fiyat: {product.prices[0]} TL</p>
                    </div>
                    <button
                      className="btn-primary mt-2 flex justify-center items-center gap-3"
                      onClick={() => handleAddToCart(product)}
                    >
                      Sepete Ekle <RiShoppingCart2Fill />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full   md:text-start !text-center">
          <Title addClass="text-[40px]">TOPLAM TUTAR</Title>

          <div className="mt-6">
            <b>Ara Toplam: </b>
            {cart.total} TL <br />
            <b className=" inline-block my-1">İndirim: </b>0.0 TL <br />
            <b>Toplam: </b>
            {cart.total} TL
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={createOrder}
            >
              ŞİMDİ ÖDEME YAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
/* 
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

<Slider {...settings}>
              {recommendations.map((product) => (
                <div
                  key={product._id}
                  className="bg-secondary p-4 rounded-lg text-white flex-shrink-0 w-60 mr-10"
                >
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-xl mt-2">{product.title}</h3>
                  <p className="text-sm opacity-70 mt-1">{product.desc}</p>
                  <p className="mt-2">Fiyat: {product.prices[0]} TL</p>
                </div>
              ))}
          </Slider> */
