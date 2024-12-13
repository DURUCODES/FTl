import { useState } from "react";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { HiOutlineMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

const ModalForDetails = ({ product, onClose, setOpenCart }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  if (!product) return null;

  const colorOptions = product.colors;
  const sizeOptions = product.sizes;

  const openCartFunction = () => {
    setOpenCart(true);
  };

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
    /* 
    onClose();
    openCartFunction(); */
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-full md:w-[800px] h-full md:h-[600px] overflow-y-auto  rounded-md p-4 z-10 fixed">
        <div className="flex items-center justify-between mb-4">
          <div className="float-right">
            <button onClick={onClose} className="text-[20px] text-gray-700">
              <GrClose />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-contain"
            />
          </div>
          <div className="w-full md:w-1/2 text-black">
            <div className="border-b-2 p2-4 md:py-2 ">
              <h2 className="text-[24px] font-semibold">{product.name}</h2>
            </div>
            <p className="mt-2 text-[14px]">{product.description}</p>

            {/* COLOR SELECTION */}
            <div className="mb-4">
              <span className="font-bold text-black">Select Color</span>
              <div className="flex gap-2 mt-2">
                {colorOptions?.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer w-10 h-10 ${
                      selectedColor === color
                        ? "border-2 border-blue-500"
                        : "border border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* SIZE SELECTION */}
            <div className="mb-4">
              <span className="font-bold text-black">Select Size</span>
              <div className="flex gap-2 mt-2">
                {sizeOptions?.map((size, index) => (
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
            <div className="flex flex-col-reverse my-4 gap-4 mt-6">
              <div className="flex flex-col w-full space-y-2">
                <button
                  onClick={handleAddToCart}
                  className="bg-white border-black border-[1.5px] text-black h-[40px] rounded flex justify-center items-center"
                  disabled={isLoading} // Disable the button when loading
                >
                  {isLoading ? (
                    <ClipLoader color="black" size={20} /> // Show spinner
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button className="bg-black hover:bg-white hover:text-black border-[1.5px] border-black h-[40px] rounded text-white">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ModalForDetails;
