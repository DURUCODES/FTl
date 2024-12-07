import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiHeart } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import ModalForDetails from "../Modal/ModalForDetails";
import Loading2 from "../Loading/Loading2";

const BlackFriday = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product for modal

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Category ID 8 is fixed for Black Friday
        const categoryId = 8;
        const response = await axios.get(
          "https://ftl-server.onrender.com/api/products"
        );

        // Filter products by categoryId === 8
        const filteredProducts = response.data.data.filter(
          (product) => product.categoryId === categoryId
        );

        setCategoryProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products for category:", error);
      }
    };

    fetchCategoryProducts();
  }, []); // Empty dependency array means this runs once on component mount

  const handleShowModal = (product) => {
    setSelectedProduct(product); // Set the selected product for modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProduct(null); // Clear selected product
  };

  return (
    <div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-6"
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
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} onClick={() => handleShowModal(product)}>
              <div className="mx-2 rounded my-4 relative transform transition-transform duration-300">
                {/* Product Image */}
                <div className="w-full h-[250px] relative">
                  <img
                    src={product.image}
                    className="w-full h-full object-contain mx-auto rounded-md"
                    alt={product.name}
                    kkkkk
                  />
                  <div className="absolute top-0 left-0 bg-green-500 text-white inline-block px-2 py-1 rounded">
                    <p className="text-[14px]">On Sale</p>
                  </div>
                </div>

                <div className="flex flex-col space-x-2">
                  <h3 className="text-[15px] font-light text-gray-800 truncate">
                    {product.name}
                  </h3>

                  <div className="flex gap-4 items-center">
                    {/* Product Price */}
                    <p className="text-[12px] font-extralight text-black">
                      ₦{new Intl.NumberFormat().format(product.price)}
                    </p>
                    <p className="text-[12px] font-extralight text-red-500 line-through">
                      $40000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading2 />
        )}

        {/* Modal for Details */}
        {isModalOpen && selectedProduct && (
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

export default BlackFriday;
