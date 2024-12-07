import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import emprtybag1 from "./emptybag.jpg";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextAuth/ContextAuth";
import { TfiTrash } from "react-icons/tfi";

const CartSide = ({
  openCart,
  handleCartClose,
  handleLoginOpen,
  openLogin,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("enter address here");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Add state to control LoginSlide visibility
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  const [orderId, setOrderId] = useState(null);

  // CREATE ORDER TO SEND TO API FUNCTION////
  const createOrder = async () => {
    const orderItems = cart.product.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    console.log("Order items being sent:", orderItems);

    try {
      const response = await axios.post(
        "https://ftl-server.onrender.com/api/orders/create",
        {
          orderItems: orderItems,
        },
        {
          withCredentials: true, // Send credentials with request
        }
      );
      console.log("Order created successfully:", response.data);
      const orderId = response.data.id;
      setOrderId(orderId);
      console.log("ID FROM RESPONSE", orderId);
      return { success: true, orderId };
    } catch (error) {
      // console.error(
      //   "Error creating order:",
      //   error.response?.data || error.message
      // );
      console.log("Error creating order:", error);
    }
  };

  // PROCEEDDED TO CHECKPOUT FUNCTION HERE ///
  const proceedToCheckout = async () => {
    if (!isAuthenticated) {
      handleCartClose();
      handleLoginOpen(); // Open the login slide
      return;
    }

    const res = await createOrder(); // Create order before navigating

    if (res.success) {
      navigate("/checkout", {
        state: {
          orderId: res.orderId, // Pass the order ID here
        },
      });
      //alert("Order has been created successfully. Proceed to checkout.");
    }
    handleCartClose();
  };

  // useEffect for delayed transition
  useEffect(() => {
    if (openCart) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timer);
    }
  }, [openCart]);

  const goToHome = () => {
    handleCartClose();
  };

  return (
    <div className="text-black">
      {openCart && (
        <div className="bg-black fixed bg-opacity-10 z-10 backdrop-blur-md h-screen top-0 right-0 w-full">
          <div
            className={`bg-white sd:w-[90%] md:w-[full] z-10 absolute right-0 top-0 h-screen  px-3 py-4 transition-transform duration-300 ease-in-out ${
              showMenu
                ? "transform translate-x-50"
                : "transform -translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto">
              {" "}
              {/* Added this div to enable scrolling */}
              {cart.product.length > 0 ? (
                <div className="bg-white">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h1 className="text-[20px] font-bold font-style:italic">
                        Shopping Cart
                      </h1>{" "}
                      <span>Items: {cart.totalQuantity}</span>
                    </div>
                    <RiCloseLargeLine
                      className="md:text-[25px] text-[20px] cursor-pointer"
                      onClick={handleCartClose}
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full mt-0">
                    {cart.product.map((product) => (
                      <div key={product.id} className="  ">
                        {/* DIV FOR PRODUCT DISPLAYS HERE  */}
                        <div className=" flex  justify-between items-center   my-4 bg-white text-black p-4  md:p-6">
                          <div className="flex  items-center">
                            {/* for image */}
                            <div className="mr-4">
                              <img
                                className="h-[120px] w-[120px] "
                                src={product.image}
                                alt="product image"
                              />
                            </div>
                            <div>
                              {/* details and button */}
                              <p className="text-[14px] text-gray-406">
                                {product.name}
                              </p>
                              <p>{product.description}</p>
                              <p>{product.size}</p>
                              <p>{product.color}</p>
                              <div className=" flex items-center">
                                <div className=" border-black border px-5 space-x-4 mr-2">
                                  <button
                                    onClick={() =>
                                      dispatch(decreaseQuantity(product.id))
                                    }
                                  >
                                    -
                                  </button>
                                  <span>{product.quantity}</span>
                                  <button
                                    onClick={() =>
                                      dispatch(increaseQuantity(product.id))
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <span
                                  onClick={() =>
                                    dispatch(removeFromCart(product.id))
                                  }
                                >
                                  <TfiTrash />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            {/* Price */}${product.price}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* CART TOTAL BELOW */}
                    <div className="my-5 bg-white">
                      {/* MINESSSSJDDDKDJD */}
                      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white text-black sm:p-6">
                          <p className="text-xl font-semibold text-gray-900 dark:text-black">
                            Order summary
                          </p>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                  Total Items
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-black">
                                  ( {cart.totalQuantity})
                                </dd>
                              </dl>
                            </div>

                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                              <dt className="text-base font-[200px] text-gray-900 dark:text-black">
                                Subtotal
                              </dt>
                              <dd className="text-base font-bold text-gray-900 dark:text-black">
                                ₦{cart.totalPrice}
                              </dd>
                            </dl>
                          </div>
                          <div>
                            {" "}
                            <p className="text-gray-400 text-[14px] font-light">
                              Tax included. <strong>Shipping</strong> calculated
                              at checkout.
                            </p>
                          </div>
                          <button
                            onClick={proceedToCheckout}
                            className="bg-black text-white w-full my-8 rounded justify-center flex items-center mx-auto py-2.5"
                          >
                            Proceed to Checkout
                          </button>

                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {" "}
                              or{" "}
                            </span>
                            <a
                              href="#"
                              title=""
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                            >
                              Continue Shopping
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 12H5m14 0-4 4m4-4-4-4"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // EMPTY CART DISPLAY
                <div className="flex justify-center flex-col py-0">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h1 className="text-[20px] font-bold font-style:italic">
                        Shopping Cart
                      </h1>
                    </div>
                    <RiCloseLargeLine
                      className="md:text-[25px] text-[20px] cursor-pointer"
                      onClick={handleCartClose}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-center uppercase text-gray-700">
                      Your bag is empty
                    </h1>
                  </div>
                  <div className="mx-auto">
                    <img
                      src={emprtybag1}
                      className=" md:w-96"
                      alt="empty-bag"
                    />
                    <p className="text-gray-500 font-bold text-center capitalize">
                      you haven't placed any order yet
                    </p>
                  </div>
                  <div className="flex items-center justify-center py-3">
                    <button
                      onClick={goToHome}
                      className="relative group cursor-pointer text-sky-50 overflow-hidden h-12 w-64 rounded-md bg-black flex justify-center items-center font-extrabold"
                    >
                      <p className="z-10 capitalize">shop now</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSide;
