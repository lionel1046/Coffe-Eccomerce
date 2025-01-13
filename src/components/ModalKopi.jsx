import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const coffeeTab = [
  {
    title: "Arabica",
    image: "/arabika.jpeg",
    description:
      "Kopi Arabika punya rasa yang halus, manis, dengan aroma wangi seperti buah atau cokelat, dan sedikit asam segar. Cocok untuk yang suka kopi ringan dan lembut.",
  },
  {
    title: "Robusta",
    image: "/robusta.jpeg",
    description:
      "Kopi Robusta rasanya lebih kuat, pahit, dengan aroma tajam seperti cokelat gelap atau kacang panggang. Pas untuk pecinta kopi bold dan intens.",
  },
  {
    title: "Blending",
    image: "/blending.jpeg",
    description:
      "Kopi Blending ini cocok buat kamu yang ingin menikmati kekayaan rasa arabika tapi tetap dapat efek kuatnya dari robusta.",
  },
];

//yghb

export default function ModalKopi({ onClose, id }) {
  const [selectedTab, setSelectedTab] = useState({
    title: "Arabica",
    image: "/arabika.jpeg",
    description:
    "Kopi Arabika punya rasa yang halus, manis, dengan aroma wangi seperti buah atau cokelat, dan sedikit asam segar. Cocok untuk yang suka kopi ringan dan lembut.",
  });
  return (
    <Modal onClose={onClose}>
      <div className="w-full flex justify-center mb-5 xl:mb-10">
        <div className="flex space-x-3 bg-neutral-100 w-fit rounded-lg p-1">
          {coffeeTab.map((tab) => (
            <div key={tab.title} className="w-20 xl:w-28 h-8">
              <input
                name={tab.title}
                id={tab.title}
                type="radio"
                checked={selectedTab.title === tab.title}
                onChange={() => {
                  setSelectedTab(tab);
                }}
                className="absolute appearance-none"
              />
              <label
                htmlFor={tab.title}
                className={`w-full h-full flex justify-center items-center rounded-lg ${
                  tab.title === selectedTab.title &&
                  "bg-white text-black font-medium border border-neutral-200"
                }`}
              >
                {tab.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="xl:flex space-y-5 xl:space-x-5">
        <img
          src={id === "205107270" ? selectedTab.image : "/KopiSachet.jpg"}
          alt="Kopi Bubuk"
          width={500}
          height={500}
          className="w-96 h-60 xl:h-96 object-cover rounded-md"
        ></img>
        <div className="flex flex-col justify-between">
          <div className="xl:w-80 font-medium space-y-4">
            <h4 className="text-black text-xl">{selectedTab.title}</h4>
            <p className="text-justify text-sm">{selectedTab.description}</p>
          </div>
          <div className="flex justify-end w-full mt-5 xl:mt-0">
            <Link
              to={`/shop/product/${id}`}
              className="bg-orange-500 text-white w-fit py-2 px-8 rounded-md"
            >
              Beli Sekarang
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
