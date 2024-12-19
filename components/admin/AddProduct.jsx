import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  const handleExtra = (e) => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prev) => [...prev, extra]);
      }
    }
  };

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "yemek-siparis");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkhqbjlfr/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions,
        ingredients,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Ürün oluşturuldu");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Yeni Ürün Ekle</Title>
            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={handleOnChange}
                  className="hidden"
                />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                  Bir resim seç
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Başlık</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Bir başlık yazın..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Tanım</span>
              <textarea
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Bir tanım yazın ..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Bir kategori seç</span>
              <select
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Bir kategori yazın..."
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title.toLowerCase()}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Fiyatlar</span>
              {category === "pizza" ? (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="medium"
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="large"
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
              ) : (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Malzemeler</span>
              <div className="flex gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="Malzeme ekle"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                />
                <button
                  className="btn-primary ml-auto"
                  onClick={handleAddIngredient}
                >
                  Malzeme Ekle
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                {ingredients.map((item, index) => (
                  <span
                    className="inline-block border border-orange-500 text-orange-500 p-1 rounded-xl text-xs cursor-pointer"
                    key={index}
                    onClick={() => {
                      setIngredients(ingredients.filter((_, i) => i !== index));
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="font-semibold mb-[2px]">Ekstra</span>
              <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="item"
                  name="text"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="fiyat"
                  name="price"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <button className="btn-primary ml-auto" onClick={handleExtra}>
                  Ekle
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                {extraOptions.map((item, index) => (
                  <span
                    className="inline-block border border-orange-500 text-orange-500  p-1 rounded-xl text-xs cursor-pointer"
                    key={index}
                    onClick={() => {
                      setExtraOptions(
                        extraOptions.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary !bg-success"
                onClick={handleCreate}
              >
                Oluştur
              </button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default AddProduct;
