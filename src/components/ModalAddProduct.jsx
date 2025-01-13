import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

export default function ModalAddProduct({ setProducts, setModalAddProduct }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [readyStock, setReadyStock] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    let regObj = {
      id: nanoid(),
      imageUrl: `/${image}`,
      name,
      description,
      isInStock: readyStock,
      price: { current: { value: price, text: `IDR ${price.toString()}` } },
    };

    fetch("https://json-server-production-d0c3.up.railway.app/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regObj),
    })
      .then((res) => {
        setProducts((prevProducts) => [...prevProducts, regObj]);
        setModalAddProduct(false);
        toast.success("Product Added");
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  };
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <div className="flex flex-col justify-center">
        <div className="mx-auto md:w-full md:max-w-md ">
          <div className=" w-full rounded-lg">
            <h3 className="text-3xl font-bold text-center">Add New Product</h3>
            <form className="w-80 px-6 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-black">
                Image
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-black">
                Name
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-black">
                Description
              </label>
              <input
                type="tel"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-black">
                Ready Stock
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                value={readyStock}
                onChange={(e) => setReadyStock(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-black">
                Price
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required={true}
              />
              <button
                type="submit"
                className="transition duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus:shadow-sm focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
