import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/CartSlice";
import { CiHeart } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { addToWishList } from "../redux/wishListSlice";
import { motion } from "framer-motion";
import ModalForDetails from "../componets/Modal/ModalForDetails";

const ProductPage = ({ product, images }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <div onClick={() => handleShowModal(product)} className="w-full">
          <div className="mx-2 rounded my-4 relative transform transition-transform duration-300">
            {/* Product Image */}
            <div className="w-full h-[250px] relative">
              <img
                src={product.image}
                className="w-full h-full object-contain mx-auto rounded-md"
              />
              <div className="absolute top-0 left-0 bg-green-500 text-white inline-block px-2 py-1 rounded">
                <p className="text-[14px]">On Sale</p>
              </div>
            </div>

            <div className="flex flex-col space-x-2 ">
              <h3 className="text-[15px] font-light text-gray-800   truncate">
                {product.name}
              </h3>

              <div className="flex     gap-4 items-center">
                {/* Product Price */}
                <p className="text-[12px] font-extralight text-black">
                  ₦{product.price}
                </p>
                <p className="text-[12px] font-extralight text-red-500 line-through">
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

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default ProductPage;
