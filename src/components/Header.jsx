import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import axios from "axios";
import {
  clearWishlist,
  updateWishlist,
} from "../features/wishlist/wishlistSlice";

const Header = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleUser, setRoleUser] = useState("");
  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  const fetchWishlist = async () => {
    if (loginState) {
      try {
        const getResponse = await axios.get(
          `https://json-server-production-d0c3.up.railway.app/user/${localStorage.getItem(
            "id"
          )}`
        );
        const userObj = getResponse.data;
        setRoleUser(userObj.role);

        store.dispatch(updateWishlist({ userObj }));
      } catch (error) {
        console.error(error);
      }
    } else {
      store.dispatch(clearWishlist());
    }
  };

  useEffect(() => {
    setIsLoggedIn(loginState);

    fetchWishlist();
  }, [loginState]);

  return (
    <>
      {/* <div className="topbar border-b border-gray-800">
        <ul>
          <li>
            <FaHeadphones className="text-2xl max-sm:text-lg text-accent-content" />
            <span className="text-2xl max-sm:text-lg text-accent-content">
              +381 61/123-456
            </span>
          </li>
          <li>
            <FaRegEnvelope className="text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-2xl max-sm:text-lg text-accent-content">
              support@test.com
            </span>
          </li>
        </ul>
      </div> */}
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            {/* <AiFillShopping /> */}
            {/* <img className="w-10" src="/logoo.png" alt="" /> */}
            UD MAKTUWO
          </Link>
        </div>
        <div className="flex-none">
          {/* <Link
            to="/search"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link> */}
          <button
            className="text-accent-content btn btn-ghost btn-circle text-xl"
            onClick={() => dispatch(changeMode())}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {/* <Link
            to="/wishlist"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <FaHeart className="text-xl" />
          </Link> */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator text-accent-content text-xl">
                <FaBagShopping />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg> */}
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-accent-content">
                  {amount} Items
                </span>
                <span className="text-accent-content">
                  Subtotal: IDR {total}
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-orange-500 btn-block text-white hover:bg-orange-600 "
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div>
                  <FaCircleUser className="text-2xl" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-sm w-52"
              >
                {roleUser === "Admin" && (
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="justify-between text-accent-content"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Order history
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-accent-content">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {pathname !== "/register" &&
      pathname !== "/login" &&
      pathname !== "/admin-dashboard" ? (
        <div className="navbar-bottom-menu bg-[#6C4E31]">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="ml-4 btn drawer-button">
                <HiMiniBars3BottomLeft className="text-2xl" />
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu p-4 w-60 min-h-full bg-[#6C4E31] text-base-content">
                <label htmlFor="my-drawer" className=" drawer-button">
                  <FaWindowClose className="text-white text-3xl ml-auto" />
                </label>
                {/* Sidebar content here */}
                {/* <li className="text-xl">
                <NavLink className="text-accent-content" to="/shop">
                  Shop
                </NavLink>
              </li> */}
                <li className="text-xl text-white mt-5">
                  <a href="/" className="flex justify-center">
                    Home
                  </a>
                  <a href="#produk" className="flex justify-center">
                    Produk
                  </a>
                  <a href="#about" className="flex justify-center">
                    About
                  </a>
                </li>
                {/* <li className="text-xl">
                <NavLink className="text-accent-content" to="/contact">
                  Contact
                </NavLink>
              </li> */}
                {!isLoggedIn && (
                  <>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
                )}
              </ul>
            </div>
          </div>

          <div className="container  navlinks-container">
            <div className="w-full flex justify-between text-lg">
              <div className="space-x-10">
                <NavLink className="text-white" to="/">
                  Home
                </NavLink>
                {/* <NavLink className="text-accent-content" to="/shop">
            Shop
          </NavLink> */}
                <a href="#produk" className="text-white">
                  Produk
                </a>
                <a href="#about" className="text-white">
                  About
                </a>
              </div>
              {!isLoggedIn && (
                <div className="space-x-10">
                  <NavLink className="text-white" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="text-white" to="/register">
                    Register
                  </NavLink>
                </div>
              )}
            </div>

            {/* <NavLink className="text-accent-content" to="/contact">
            Contact
          </NavLink> */}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Header;
