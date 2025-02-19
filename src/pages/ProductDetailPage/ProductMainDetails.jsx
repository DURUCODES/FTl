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
import Select from "react-select"; // Import react-select

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

  // Transform color options for react-select
  const colorOptions = product?.colors?.map((color) => ({
    value: color,
    label: (
      <div
        style={{
          backgroundColor: color,
          width: 20,
          height: 20,
          borderRadius: "50%",
        }}
      ></div>
    ),
  }));

  // Transform size options for react-select
  const sizeOptions = product?.sizes?.map((size) => ({
    value: size,
    label: size,
  }));

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
      <div className="flex flex-col md:flex-row  justify-evenly  md:max-w-8xl md:mx-auto md:p-3 md:px-8 md:gap-4 my-8">
        <div className="md:w-1/2 flex flex-col-reverse md:flex-row  justify-between space--4 rounded-lg  mb-4">
          <div className="md:space-y-4  space-x-4 md:space-x-0 flex  flex-row items-center md:flex-col md:p-0 p-4 mx-auto md:mx-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-[100px] h-[100px] object-fit rounded-2xl border border-black"
            />

            <img
              src={product.image}
              alt={product.name}
              className="w-[100px] h-[100px] object-fit rounded-2xl border border-black"
            />
          </div>
          <div className="w-full">
            <img
              src={product.image}
              alt={product.name}
              className="md:w-[600px] w-full h-[660px] object-fit "
            />
          </div>
        </div>

        <div className="md:w-1/2 md:px-8 px-2">
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
            <Select
              options={sizeOptions}
              onChange={(selectedOption) =>
                setSelectedSize(selectedOption?.value)
              }
              value={sizeOptions?.find(
                (option) => option.value === selectedSize
              )}
              placeholder="Select Size"
            />
          </div>

          {/* COLOR SELECTION */}
          <div className="mb-4">
            <span className="font-bold text-black">Color</span>
            <Select
              options={colorOptions}
              onChange={(selectedOption) =>
                setSelectedColor(selectedOption?.value)
              }
              value={colorOptions?.find(
                (option) => option.value === selectedColor
              )}
              placeholder="Select Color"
            />
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
