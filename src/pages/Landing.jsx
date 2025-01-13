import React, { useEffect, useState } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalKopi from "../components/ModalKopi";

// hgygh

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
      <div>
        <div className="xl:flex xl:items-center px-10 py-20 xl:px-20">
          <div>
            <h1 className="text-3xl xl:text-6xl font-bold mb-4 xl:mb-8 uppercase text-center xl:text-left">
              Jaga mimpimu tetap<br></br>terjaga dengan secangkir<br></br>kopi
            </h1>
            <p className="text-center xl:text-left mb-6 xl:mb-10 capitalize">
              Produk kopi kami dijamin 100% alami dari perkebunan hingga diolah
              menjadi biji kopi
            </p>
            <div className="w-full text-center xl:text-left">
              <a
                href="#produk"
                className="bg-orange-500 text-white font-semibold xl:px-8 xl:py-3 px-6 py-2 rounded-sm hover:bg-orange-600"
              >
                Belanja Sekarang
              </a>
            </div>
          </div>

          <img src="/bgkopi.png" alt="Kopi" className="mt-20 xl:w-1/2" />
        </div>

        <div
          id="produk"
          className="w-full h-screen pt-16 xl:pt-20 bg-[url('/bgkopi.jpg')] bg-no-repeat bg-cover px-10"
        >
          <h1 className="text-2xl xl:text-4xl font-bold text-center mb-6">
            PRODUK KAMI
          </h1>
          <p className="capitalize text-center xl:mb-12">
            kopi yang paling disukai pelanggan kami. Dari arabika hingga
            robusta, selalu ada secangkir kopi baru yang layak dicoba
          </p>
          <div className="xl:flex w-full p-8 space-y-5 xl:space-x-10 xl:space-y-0 justify-center">
            <div className="h-fit px-4 pt-4 pb-6 bg-white shadow-md rounded-sm">
              <img
                src="/KopiSachet.jpg"
                alt="Kopi Sachet"
                className="w-full h-40 xl:w-80 xl:h-80 object-cover"
              />
              <div className="flex justify-between">
                <h2 className="text-black font-medium mb-6">KOPI SACHET</h2>
                <h2 className="text-gray-500 font-medium mb-6">Rp 1.500</h2>
              </div>
              <button
                onClick={() => {
                  navigate("/shop/product/205082351");
                }}
                className="bg-orange-500  text-white font-semibold w-full py-2 rounded-sm hover:bg-orange-700"
              >
                Detail
              </button>
            </div>
            <div className="h-fit px-4 pt-4 pb-6 bg-white shadow-md rounded-sm">
              <img
                src="/kopibubuk.jpg"
                alt="Kopi Sachet"
                className="w-full h-40 xl:w-80 xl:h-80 object-cover"
              />
              <div className="flex justify-between">
                <h2 className="text-black font-medium mb-6">KOPI BUBUK</h2>
                <h2 className="text-gray-500 font-medium mb-6">Rp 15.000</h2>
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setIdModal("205107270");
                }}
                className="bg-orange-500  text-white font-semibold w-full py-2 rounded-sm hover:bg-orange-700"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
        <div
          id="bubuk-kopi"
          className="h-full xl:h-screen w-full pt-10 xl:pt-20"
        >
          <h3 className="text-2xl xl:text-4xl text-center font-bold mb-20">
            PERBEDAAN
            <br /> ARABIKA,ROBUSTA & BLENDING
          </h3>
          <div className="xl:flex px-20 space-y-5 xl:space-x-10">
            <div className="xl:w-1/3 bg-[#AF8F6F] text-white text-center p-6 rounded-sm">
              <div className="w-full flex justify-center mb-6">
                <h1 className="bg-white text-4xl font-bold rounded-full w-20 h-20  p-4 text-stone-500 text-center">
                  1
                </h1>
              </div>

              <h4 className="text-xl font-bold mb-3">ARABICA</h4>
              <p>
                Arabica dikenal dengan rasa halus, kompleks, dan sedikit asam,
                serta kandungan kafein rendah (1-1,5%), cocok untuk pecinta kopi
                premium
              </p>
            </div>
            <div className="xl:w-1/3 bg-[#74512D] text-white text-center p-6 rounded-sm xl:translate-y-20">
              <div className="w-full flex justify-center mb-6">
                <h1 className="bg-white text-4xl font-bold rounded-full w-20 h-20  p-4 text-stone-600 text-center">
                  2
                </h1>
              </div>
              <h4 className="text-xl font-bold mb-3">ROBUSTA</h4>
              <p>
                Robusta lebih kuat, pahit, dan earthy, dengan kafein tinggi
                (2-2,7%), tumbuh di dataran rendah, dan lebih terjangkau.
              </p>
            </div>
            <div className="xl:w-1/3 bg-[#543310] text-white text-center p-6 rounded-sm xl:translate-y-40">
              <div className="w-full flex justify-center mb-6">
                <h1 className="bg-white text-4xl font-bold rounded-full w-20 h-20  p-4 text-stone-700 text-center">
                  3
                </h1>
              </div>
              <h4 className="text-xl font-bold mb-3">BLENDING</h4>
              <p>
                campuran Arabica dan Robusta untuk menciptakan rasa seimbang.
                Pilihannya tergantung pada selera dan kebutuhan
              </p>
            </div>
          </div>
        </div>
        <div
          id="about"
          className="h-screen pt-10 xl:pr-32 xl:pl-12 bg-[#74512D] text-white xl:flex items-center justify-center overflow-hidden"
        >
          <img
            src="/coffeecup.png"
            alt="Kopi"
            className="w-80 translate-x-10 xl:w-1/2 xl:translate-x-0"
          />
          <div className="">
            <h1 className="text-2xl xl:text-4xl font-bold text-center mb-10">
              ABOUT US
            </h1>
            <div className="space-y-5">
              <p className="xl:text-lg text-justify px-10 xl:px-0">
                Selamat datang di Kopi UD MAKTUWO! Kami adalah penyedia kopi
                premium yang berkomitmen untuk menghadirkan kenikmatan kopi
                terbaik dari biji pilihan. Didirikan dengan semangat dan cinta
                terhadap kopi, kami mengutamakan kualitas dan keaslian dalam
                setiap cangkir yang kami sajikan.
              </p>
              <p className="xl:text-lg text-justify px-10 xl:px-0">
                Biji kopi kami dipilih langsung dari petani lokal, diproses
                dengan standar tinggi untuk memastikan kesegaran dan cita rasa
                yang khas. Di Kopi Udmaktuwo, kami percaya bahwa setiap tegukan
                kopi adalah pengalaman istimewa. Mari bergabung dengan kami
                dalam menikmati setiap momen kopi yang autentik dan penuh rasa.
                Terima kasih telah memilih kami sebagai teman kopi Anda!
              </p>
              {/* <button className="bg-orange-500 text-white px-10 py-2 rounded-sm">
                Contact
              </button> */}
            </div>
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
