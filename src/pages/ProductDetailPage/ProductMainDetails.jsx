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

  //// ADD TO CAFT FUNCTION
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

  /// WISHLIST CART FUNCTION
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
      <div className="pt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-100 mb-4 overflow-hidden">
                <Swiper spaceBetween={10} slidesPerView={1}>
                  {product.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black mb-2">
                  {product.name}
                </h2>

                {cartItem ? (
                  <div className="bg-gray-100 rounded-2xl flex justify-between items-center space-x-3 px-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(cartItem.id))}
                      className="text-[15px]"
                    >
                      -
                    </button>
                    <span className="text-[10px]">{cartItem.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(cartItem.id))}
                      className="text-[15px]"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="bg-black text-white px-4 py-2 rounded-2xl"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <p className="text-black text-sm mb-4">{product.description}</p>
              <div className="flex mb-4 items-center justify-between">
                <div className="mr-4 flex items-center text-yellow-400 space-x-0.5 text-[12px]">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
                <div className="space-x-1">
                  <span className="font-bold text-black text-[14px]">
                    Availability:
                  </span>
                  <span className="font-bold text-black text-[14px]">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-black">Select Color:</span>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => setSelectedColor("white")}
                    className="w-6 h-6 rounded-full bg-white mr-2 border border-gray-300"
                  ></button>
                  <button
                    onClick={() => setSelectedColor("black")}
                    className="w-6 h-6 rounded-full bg-black mr-2 border border-gray-300"
                  ></button>
                  <button
                    onClick={() => setSelectedColor("green")}
                    className="w-6 h-6 rounded-full bg-green-800 mr-2 border border-gray-300"
                  ></button>
                  <button
                    onClick={() => setSelectedColor("red")}
                    className="w-6 h-6 rounded-full bg-red-500 mr-2 border border-gray-300"
                  ></button>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-black">Select Size:</span>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => setSelectedSize("S")}
                    className="bg-white hover:bg-black text-black hover:text-white border-2 border-black w-[50px] h-[50px] rounded-full font-bold"
                  >
                    S
                  </button>
                  <button
                    onClick={() => setSelectedSize("M")}
                    className="bg-white hover:bg-black text-black hover:text-white border-2 border-black w-[50px] h-[50px] rounded-full font-bold"
                  >
                    M
                  </button>
                  <button
                    onClick={() => setSelectedSize("L")}
                    className="bg-white hover:bg-black text-black hover:text-white border-2 border-black w-[50px] h-[50px] rounded-full font-bold"
                  >
                    L
                  </button>
                  <button
                    onClick={() => setSelectedSize("XL")}
                    className="bg-white hover:bg-black text-black hover:text-white border-2 border-black w-[50px] h-[50px] rounded-full font-bold"
                  >
                    XL
                  </button>
                  <button
                    onClick={() => setSelectedSize("XXL")}
                    className="bg-white hover:bg-black text-black hover:text-white border-2 border-black w-[50px] h-[50px] rounded-full font-bold"
                  >
                    XXL
                  </button>
                </div>
              </div>

              <div>
                <span className="font-bold text-black">Description:</span>
                <p className="text-black text-sm mt-2">
                  {product.description}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>

              <div className="flex items-center justify-between  space-x-2 px-4 my-4">
                <div>
                  <span className="font-bold text-black">Price:</span>
                  <span className="text-black font-bold text-[22px]">
                    ₦{product.price}
                  </span>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-2xl flex items-center"
                  >
                    <span className="mr-2">
                      {" "}
                      <IoBagHandleOutline />
                    </span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

      {/* 
          <button
            onClick={handleAddToWishList}
            className="  border-2  text-black hover:text-white py-2 px-6 rounded-full font-light hover:bg-gray-800"
          >
            <CiHeart />
          </button> */}
    </motion.div>
  );
};

export default ProductMainDetails;

/*  */
