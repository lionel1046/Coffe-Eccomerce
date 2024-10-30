import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">Sahabat Kopi!</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
        Selamat datang di Kopi Udmaktuwo! Kami adalah penyedia kopi premium yang berkomitmen
        untuk menghadirkan kenikmatan kopi terbaik dari biji pilihan. Didirikan dengan semangat dan cinta terhadap kopi,
        kami mengutamakan kualitas dan keaslian dalam setiap cangkir yang kami sajikan. 
        Biji kopi kami dipilih langsung dari petani lokal, diproses dengan standar tinggi untuk memastikan
        kesegaran dan cita rasa yang khas. Di Kopi Udmaktuwo, kami percaya bahwa setiap tegukan kopi adalah pengalaman istimewa.
        Mari bergabung dengan kami dalam menikmati setiap momen kopi yang autentik dan penuh rasa.
        Terima kasih telah memilih kami sebagai teman kopi Anda!
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
