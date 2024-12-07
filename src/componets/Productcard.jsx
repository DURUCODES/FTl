import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/CartSlice";
const Productcard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    toast("Added to cart");
  };
  return (
    <div className="">
      <Link>
        <div className=" md:gap-6 pl-3 pr-3 md:flex w-full justify-between md:items-center">
          <div className="  mx-2 rounded my-4 relative    transform transition-transform duration-300 ">
            <div>
              <img
                src={product.Image}
                className=" rounded md:w-80 md:max-h-96 transition-transform transform duration-1000 ease-in-out scale-100 cursor-pointer   "
              />
            </div>
            <div className=" flex flex-col justify-between  p-4">
              <div className="flex flex-col-reverse  justify-start md:flex-row   mb-4 md:items-center md:justify-between">
                <h3 className=" text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
              <div className="flex items-center mt-2 justify-center">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  class="relative flex items-center justify-between w-36 h-10 cursor-pointer border-b-2 border-r-4  border-gray-800  rounded-lg bg-gray-100 shadow-lg overflow-hidden transition-transform duration-1000 ease-in-out transform hover:scale-105 active:translate-x-1 active:translate-y-1 group"
                >
                  <span class="text-gray-800 font-semibold transition-transform duration-1000 ease-in-out transform translate-x-6 group-hover:translate-x-[-150%]">
                    Add Item
                  </span>
                  <span class="absolute flex items-center justify-center w-10 h-full bg-gray-200 transition-transform duration-1000 ease-in-out transform -translate-x-full group-hover:w-full group-hover:translate-x-0">
                    <svg
                      class="w-5 text-gray-800"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Productcard;
