import React, { useEffect, useState } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalKopi from "../components/ModalKopi";

export const landingLoader = async () => {
  const response = await axios(
    `https://json-server-production-d0c3.up.railway.app/products?_page=1&_limit=8`
  );
  const data = response.data;

  return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [idModal, setIdModal] = useState("");

  return (
    <main>
      <div className="selected-products">
        <div className="flex w-full p-8">
          <div
            className="w-1/2 h-1/2 p-6 cursor-pointer"
            onClick={() => {
              setIdModal("205082351");
              setOpenModal(true);
            }}
          >
            <h2 className="text-center text-2xl mb-6">KOPI SACHET</h2>
            <img
              src="/KopiSachet.jpg"
              alt="Kopi Sachet"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-1/2 h-1/2 p-6 cursor-pointer"
            onClick={() => {
              setIdModal("205107270");
              setOpenModal(true);
            }}
          >
            <h2 className="text-center text-2xl mb-6">KOPI BUBUK</h2>
            <img
              src="/kopibubuk.jpg"
              alt="Kopi Sachet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* <div className="selected-products-grid max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price.current.value}
            />
          ))}
        </div> */}
      </div>
      {openModal && (
        <ModalKopi
          onClose={() => {
            setOpenModal(false);
            setIdModal("");
          }}
          id={idModal}
        />
      )}
    </main>
  );
};

export default Landing;
