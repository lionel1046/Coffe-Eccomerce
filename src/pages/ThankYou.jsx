import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      const response = await axios.post(
        "https://json-server-production-d0c3.up.railway.app/orders",
        {
          userId: localStorage.getItem("id"),
          orderStatus: "in progress",
          subtotal: total,
          cartItems: cartItems,
        }
      );
    } catch (err) {
      toast.error(err.response);
    }
  };

  if (cartItems.length > 0) {
    saveToOrderHistory();
    store.dispatch(clearCart());
    store.dispatch(calculateTotals());
    toast.success("Order completed");
  }

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <SectionTitle title="Thank You" path="Home | Cart | Thank you" /> */}
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          Terima Kasih telah berbelanja di UD Maktuwo!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          Kami harap anda menyukai kopi dari UD Maktuwo
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Silahkan klik "LANJUTKAN PEMBAYARAN" untuk menyelesaikan pemesanan:
        </h3>
        <a
          href="https://wa.me/6285277953466/?text=Assalamu'alaikum%20admin,%20saya%20ingin%20melakukan%20pembayaran"
          className="btn w-1/4 bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8"
        >
          Lanjutkan pembayaran
        </a>

        <h4 className="text-xl mt-5 max-sm:text-lg">
          Terima kasih telah memilih kami sebagai teman kopi Anda!
        </h4>
        <h4 className="text-xl max-sm:text-lg">UD Maktuwo</h4>
      </div>
    </>
  );
};

export default ThankYou;
