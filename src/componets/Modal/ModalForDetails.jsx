import { useState } from "react";
import { addToCart } from "../../redux/CartSlice";
import { addToWishList } from "../../redux/wishListSlice";
import Select from "react-select";
import { toast } from "react-toastify";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

const ModalForDetails = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedColor || !selectedSize) {
      toast.error(
        "Please select both a color and a size before adding to the cart."
      );
      return;
    }

    const productWithOptions = {
      ...product,
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value,
      quantity: quantity,
    };

    dispatch(addToCart(productWithOptions));
    toast.success("Added to cart");
  };

  const handleAddToWishList = () => {
    if (!wishlist) {
      dispatch(addToWishList(product));
      setWishlist(true);
      toast.success("Added to wishlist");
    } else {
      setWishlist(false);
      toast.error("Removed from wishlist");
    }
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
      <div className="bg-white w-full md:w-[800px] h-full md:h-[600px] overflow-y-auto p-2 rounded-md  z-10 fixed">
        <div className="breadcrumbs text-sm px-4">
          <ul className="text-black text-center flex items-center">
            <Link to="/">
              <li className="flex items-center">
                Home{" "}
                <span>
                  <MdOutlineChevronRight />
                </span>
              </li>
            </Link>
            <li className="cursor-pointer flex items-center">{product.name}</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-700"
        >
          <IoIosClose />
        </button>
        <div className="flex flex-col md:flex-row md:p-4 gap-8">
          <div className="md:w-1/2 flex justify-center items-center ">
            <img
              src={product.image} // Use the first image or add logic to select different images
              alt={product.name}
              className="object-cover w-full h-[400px] "
            />
          </div>
          <div className="w-full md:w-1/2 text-black">
            <div className="border-b-2 p2-4 md:py-2 ">
              {" "}
              <h2 className="text-[34px] font-semibold">{product.name}</h2>
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
            <div className="mt-4 flex flex-col  gap-4">
              <span className="font-bold">Quantity:</span>
              <div className="space-x-2">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 border border-black "
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 border border-black "
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex  flex-col-reverse   my-4  gap-4 mt-6">
              <div className="flex  flex-col w-full space-y-2">
                <button
                  onClick={handleAddToCart}
                  className=" bg-white border-black border-[1.5px] text-black h-[40px] rounded "
                >
                  Add to Cart
                </button>

                <button className=" bg-black hover:bg-white hover:text-black border-[1.5px] border-black  h-[40px] rounded text-white">
                  Buy Now
                </button>
              </div>

              <div>
                <button
                  onClick={handleAddToWishList}
                  className="px-4 text-[10px] rounded py-2 bg-gray-200"
                >
                  {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
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
