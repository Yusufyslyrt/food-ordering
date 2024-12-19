import Title from "../ui/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const handleDelete = async (id) => {
    try {
      if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success("Ürün silindi");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Ürünler</Title>
      <div className="overflow-auto max-h-[400px] w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px] ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                RESİM
              </th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                BAŞLIK
              </th>
              <th scope="col" className="py-3 px-6">
                FİYAT
              </th>
              <th scope="col" className="py-3 px-6">
                EKLE/KALDIR
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  key={product._id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product._id.substring(0, 5)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.prices[0]} TL
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button
                      className="btn-primary !bg-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
