import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/CartSlice";
import { addToWishList } from "../../redux/wishListSlice";
import LoadingFetch from "../../componets/Loading/LoadingFetch";
import { IoBagHandleOutline } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FiMinus } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import Accordion from "./Accordion";

const ProductMainDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ftl-server.onrender.com/api/products/${id}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div>
        <LoadingFetch />
      </div>
    );
  if (!product) return <div>Product not found</div>;

  //// ADD TO CART FUNCTION
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!selectedColor || !selectedSize) {
      toast.warn("Please select a color and size before adding to cart.");
      return;
    }

    const productWithDetails = {
      ...product,
      selectedColor,
      selectedSize,
    };

    dispatch(addToCart(productWithDetails));
    toast("Added to cart");
  };

  /// WISHLIST FUNCTION
  const handleAddToWishList = () => {
    dispatch(addToWishList(product)); // Correctly dispatch the action here
    toast("Added to wishlist");
  };

  const cartItem = cart.product.find((item) => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state: fade in from below
      animate={{ opacity: 1, y: 0 }} // Final state: fully visible
      transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
    >
      <div className="flex flex-col md:flex-row justify-between md:max-w-8xl  md:mx-auto p-3  md:gap-4">
        <div className="md:w-1/2 rounded-lg bg-gray-100 mb-4 ">
          <img
            src={product.image}
            alt={product.name}
            className="  w-full h-[460px] "
          />
        </div>

        {/*  DETAILS BLEOW */}

        <div className="md:w-1/2 md:px-8">
          <p className="text-[12px]">FTL</p>
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">
              {product.name}
            </h2>
          </div>
          {/* PRICE AND ON SALE TAG */}
          <div className="flex items-center space-x-4 justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-[14px] font-medium text-black">
                ₦{product.price}
              </p>
              <p className="text-[14px] font-medium text-red-500 line-through">
                $40000
              </p>
            </div>
            <div
              className="  bg-green-500 text-white text-xs font-bold py-1.5 px-3 "
              style={{}}
            >
              On Sale
            </div>
          </div>

          {/* SELECT AND COLOR BUTTON */}
          {/* Size Selection */}
          <div className="mb-4">
            <span className="font-bold text-black">Select Size:</span>
            <select
              className="w-full p-2 border border-gray-300 "
              onChange={(e) => setSelectedSize(e.target.value)}
              value={selectedSize}
            >
              <option value="">Select a size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <span className="font-bold text-black">Select Color:</span>
            <select
              className="w-full p-2 border border-gray-300 "
              onChange={(e) => setSelectedColor(e.target.value)}
              value={selectedColor}
            >
              <option value="">Select a color</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
            </select>
          </div>

          {/* QUANTITY */}

          <div>
            <span className="font-bold text-black">Quantity</span>
            <div className="border border-black w-[120px] flex items-center py-1.5 px-4 text-[15px] my-2 gap-6">
              {/* Decrease button */}
              <button
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    dispatch(decreaseQuantity(cartItem.id)); // Decrease the quantity
                  }
                }}
                className="text-[20px]"
              >
                <FiMinus />
              </button>

              {/* Display cart item quantity */}
              <span>{cartItem ? cartItem.quantity : 0}</span>

              {/* Increase button */}
              <button
                onClick={() => {
                  dispatch(increaseQuantity(cartItem.id)); // Increase the quantity
                }}
                className="text-[20px]"
              >
                <IoAddOutline />
              </button>
            </div>
          </div>

          {/* ADD TO CART AND BUY ITEM DEV BELOW */}
          <div className="my-4 space-y-4">
            <button className="border-black border w-full py-2">
              Add to cart
            </button>
            <button className="border-black border w-full py-2 bg-black text-white">
              Buy now
            </button>
            <button className=" flex items-center gap-2 text-center mx-auto ">
              Add to wishlist <CiHeart />
            </button>
          </div>

          {/* Descriptionn below */}
          <div>
            <p className="text-black text-sm mt-2">{product.description}</p>
          </div>

          <div>
            <Accordion />
          </div>
        </div>
      </div>

      <ToastContainer />
    </motion.div>
  );
};

export default ProductMainDetails;
