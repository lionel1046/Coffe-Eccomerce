import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const coffeeTab = [
  {
    title: "Arabica",
    image: "/arabika.jpeg",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.",
  },
  {
    title: "Robusta",
    image: "/robusta.jpeg",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.",
  },
  {
    title: "Blending",
    image: "/blending.jpeg",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.",
  },
];

export default function ModalKopi({ onClose, id }) {
  const [selectedTab, setSelectedTab] = useState({
    title: "Arabica",
    image: "/arabika.jpeg",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.",
  });
  return (
    <Modal onClose={onClose}>
      <div className="w-full flex justify-center mb-10">
        <div className="flex space-x-3 bg-neutral-100 w-fit rounded-lg p-1">
          {coffeeTab.map((tab) => (
            <div key={tab.title} className="w-28 h-8">
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
      <div className="flex space-x-5">
        <img
          src={id === "205107270" ? selectedTab.image : "/KopiSachet.jpg"}
          alt="Kopi Bubuk"
          width={500}
          height={500}
          className="w-96 h-96 object-cover rounded-md"
        ></img>
        <div className="flex flex-col justify-between">
          <div className="w-80 font-medium space-y-4">
            <h4 className="text-black text-xl">{selectedTab.title}</h4>
            <p>{selectedTab.description}</p>
          </div>
          <div className="flex justify-end w-full">
            <Link
              to={`/shop/product/${id}`}
              className="bg-black text-white w-fit py-2 px-8 rounded-lg"
            >
              Beli Sekarang
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
