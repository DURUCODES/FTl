import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { addToCart } from "../../redux/CartSlice";
import { addToWishList } from "../../redux/wishListSlice";
import { motion } from "framer-motion";
import { RingLoader } from "react-spinners"; // Import RingLoader here
import { HiOutlineMinus } from "react-icons/hi";

const ProductMainDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  // ADD TO CART FUNCTION
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!selectedColor || !selectedSize) {
      toast.warn("Please select a color and size before adding to cart.");
      return;
    }

    setIsLoading(true); // Start loading

    // Simulate adding to the cart by dispatching action (use timeout to simulate an API request)
    setTimeout(() => {
      const productWithDetails = {
        ...product,
        selectedColor,
        selectedSize,
        quantity,
      };

      dispatch(addToCart(productWithDetails));
      toast("Added to cart");

      setIsLoading(false); // Stop loading
    }, 1000); // Simulate 1 second delay for adding to cart
  };

  // WISHLIST FUNCTION
  const handleAddToWishList = () => {
    dispatch(addToWishList(product)); // Correctly dispatch the action here
    toast("Added to wishlist");
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    // Show loading spinner while product is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader size={80} color="black" loading={loading} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state: fade in from below
      animate={{ opacity: 1, y: 0 }} // Final state: fully visible
      transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
    >
      <div className="flex flex-col md:flex-row justify-between md:max-w-8xl md:mx-auto p-3 md:gap-4">
        <div className="md:w-1/2 rounded-lg bg-gray-100 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[460px]"
          />
        </div>

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
            <div className="bg-green-500 text-white text-xs font-bold py-1.5 px-3">
              On Sale
            </div>
          </div>

          {/* SIZE SELECTION */}
          <div className="mb-4">
            <span className="font-bold text-black">Select Size</span>
            <div className="flex gap-2 mt-2">
              {product.sizes?.map((size, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer p-2 border rounded ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* COLOR SELECTION */}
          <div className="mb-4">
            <span className="font-bold text-black"> Color</span>
            <div className="flex gap-2 mt-2">
              {product.colors?.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`cursor-pointer w-10 h-10 round ${
                    selectedColor === color
                      ? "border-2 border-blue-500"
                      : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <span className="font-bold text-black">Quantity</span>
            <div className="border border-black w-[120px] flex items-center justify-between py-1.5 px-4 text-[15px] my-2 ">
              <button onClick={handleDecrement} className="px-2 py-1 ">
                <HiOutlineMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={handleIncrement} className="px-2 py-1">
                <BsPlusLg />
              </button>
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <div className="my-4 space-y-4">
            <button
              onClick={handleAddToCart}
              className="border-black border w-full py-2"
              disabled={isLoading} // Disable the button during loading
            >
              {isLoading ? (
                <RingLoader color="black" size={20} /> // Show loading spinner while adding to cart
              ) : (
                "Add to cart"
              )}
            </button>
            <button className="border-black border w-full py-2 bg-black text-white">
              Buy now
            </button>
            <button
              className="flex items-center gap-2 text-center mx-auto"
              onClick={handleAddToWishList}
            >
              Add to wishlist <CiHeart />
            </button>
          </div>

          {/* Description */}
          <div>
            <p className="text-black text-sm mt-2">{product.description}</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </motion.div>
  );
};

export default ProductMainDetails;
