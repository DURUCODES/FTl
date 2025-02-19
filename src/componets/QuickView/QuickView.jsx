import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { HiOutlineMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";

const QuickView = ({ product, onClose, quickOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!selectedColor || !selectedSize) {
      toast.warn("Please select a color and size before adding to cart.");
      return;
    }

    setIsLoading(true); // Set loading state to true when starting the add to cart action

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second loading

    // Create product object with selected options and quantity
    const productWithOptions = {
      ...product,
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value,
      quantity: quantity,
    };

    // Dispatch action to add product to cart
    dispatch(addToCart(productWithOptions));

    setIsLoading(false);
    toast("Added to cart");
  };

  useEffect(() => {
    if (quickOpen) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 300); // Delay to allow transition to complete
      return () => clearTimeout(timer);
    }
  }, [quickOpen]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }; // This was missing a closing brace here

  return (
    <>
      {quickOpen && (
        <div className="bg-black fixed z-10 bg-opacity-10 backdrop-blur-md h-screen top-0 right-0 w-full">
          <div
            className={`bg-white md:w-[400px] absolute mt-4 h-[95%] w-[90%] rounded-md right-2 px-4 py-4 transition-transform duration-300 ease-in-out ${
              showMenu
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900">
                {product.name}
              </h2>
              <span>
                <RiCloseLargeLine
                  className="md:text-[25px] text-[20px] cursor-pointer"
                  onClick={onClose}
                />
              </span>
            </div>

            <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-150px)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />

              <div className="flex items-center space-x-2">
                <p className="text-lg font-bold text-black mt-2">
                  ₦{product.price}
                </p>
                <p className="font-light text-[12px] text-red-600 mt-2 line-through">
                  ₦40003
                </p>
              </div>

              <div>
                <p className="font-bold">Color</p>
                {/* Render the colors as a list or a comma-separated string */}
                <div className="border w-[40px] h-[40px] text-center p-2 ">
                  {Array.isArray(product.colors)
                    ? product.colors.join(", ")
                    : product.colors}
                </div>
              </div>

              <div>
                <p className="font-bold">Size</p>
                {/* Render the sizes similarly */}
                <div className="border w-[40px] h-[40px] text-center p-2">
                  {Array.isArray(product.sizes)
                    ? product.sizes.join(", ")
                    : product.sizes}
                </div>
              </div>

              <div>
                <span className="font-bold text-black">Quantity</span>
                <div className="border border-black w-[120px] flex items-center justify-between py-1.5 px-4 text-[15px] my-2">
                  <button onClick={handleDecrement} className="px-2 py-1">
                    <HiOutlineMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement} className="px-2 py-1">
                    <BsPlusLg />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 ">
                <button
                  onClick={handleAddToCart}
                  className="bg-white border-black border-[1.5px] text-black h-[40px] rounded flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader color="black" size={20} />
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button className="bg-black hover:bg-white hover:text-black border-[1.5px] border-black h-[40px] rounded text-white">
                  Buy Now
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
              </div>
            </div>

            <p className="mt-4 text-black text-[12px] underline text-center cursor-pointer">
              Learn more
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickView;
