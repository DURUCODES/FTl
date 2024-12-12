import { useState } from "react";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import Select from "react-select";
import { ClipLoader } from "react-spinners"; // Assuming you're using react-spinners for the loading spinner

const ModalForDetails = ({ product, onClose, setOpenCart }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  if (!product) return null;

  const colorOptions = [
    { value: "gray", label: "Gray", color: "#2d2d2d" },
    { value: "red", label: "Red", color: "#f44336" },
    { value: "blue", label: "Blue", color: "#2196f3" },
    { value: "yellow", label: "Yellow", color: "#ffeb3b" },
  ];

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const openCartFunction = () => {
    setOpenCart(true);
  };
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Check if both color and size are selected
    if (!selectedColor || !selectedSize) {
      alert("Please select both a color and a size before adding to the cart.");
      return;
    }

    setIsLoading(true); // Set loading state to true when starting the add to cart action

    // Simulate a network delay or async action (for example purposes)
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

    setIsLoading(false); // Set loading state to false after the product is added to cart

    onClose();
    openCartFunction();
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
            <Select
              value={selectedColor}
              onChange={setSelectedColor}
              options={colorOptions}
              className="mt-4"
              placeholder="Select Color"
            />
            <div className="mt-4">
              <span className="font-bold">Select Size:</span>
              <div className="flex gap-2 mt-2">
                {sizeOptions?.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-full ${
                      selectedSize?.value === size.value
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex md:justify-between">
              <p className="text-[16px] font-light">
                ₦{new Intl.NumberFormat().format(product.price)}
                <span className="text-[14px] text-red-400 line-through mx-2">
                  $1200
                </span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex flex-col gap-4">
              <span className="font-bold">Quantity:</span>
              <div className="space-x-2">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 border border-black"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 border border-black"
                >
                  +
                </button>
              </div>
            </div>

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
    </div>
  );
};

export default ModalForDetails;
