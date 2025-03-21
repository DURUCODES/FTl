import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/CartSlice";
import { motion } from "framer-motion";
import ModalForDetails from "../componets/Modal/ModalForDetails";
import { PiLockKeyLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import QuickView from "../componets/QuickView/QuickView";

const ProductPage = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickOpen, setQuickView] = useState(false); // State to control QuickView visibility
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    toast("Added to cart");
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Function to open QuickView
  const handleQuickViewOpen = () => {
    setQuickView(true);
  };

  // Function to close QuickView
  const handleQuickViewClose = () => {
    setQuickView(false);
  };

  return (
    <div>
      <motion.div
        className="md:gap-6 pl-3 mb-10 pr-3 md:flex w-full flex-col justify-between md:items-start"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
      >
        <div className="w-full">
          <div className="mx-2 rounded my-4 relative transform transition-transform duration-300">
            {/* Product Image */}
            <Link to={`/collections/${product._id}`}>
              <div className="w-full h-[300px] relative">
                <img
                  src={product.images}
                  className="w-full h-full object-fit"
                />
                {/* "On Sale" Badge */}
                <div
                  className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-3 "
                  style={{ zIndex: 10 }}
                >
                  On Sale
                </div>
              </div>
            </Link>

            <div
              className="w-[40px] shadow-sm border  p-2 rounded-full flex items-center justify-right my-2 float-right"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={handleQuickViewOpen} // Open QuickView when clicked
            >
              <PiLockKeyLight />
            </div>

            <div className="flex flex-col s mt-3">
              <h3 className="text-[15px] font-medium text-gray-800 truncate">
                {product.name}
              </h3>

              <div className="flex gap-4 items-center">
                {/* Product Price */}
                <p className="text-[14px] font-medium text-black">
                  ₦{product.price}
                </p>
                <p className="text-[14px] font-medium text-red-500 line-through">
                  $40000
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Details */}
        {isModalOpen && (
          <ModalForDetails
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}

        {/* QuickView Modal */}
        {quickOpen && (
          <QuickView
            onClose={handleQuickViewClose}
            quickOpen={quickOpen}
            product={product}
          />
        )}

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default ProductPage;
