import React, { useState } from "react";
import { PiLockKeyLight } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { TfiTrash } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/CartSlice";
import { useAuth } from "../../ContextAuth/ContextAuth";
import api from "../../libs/axiosInstance";
import { RingLoader } from "react-spinners"; // Import the RingLoader component

const CartforCheckout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const createOrder = async () => {
    const orderItems = cart.product.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    console.log("Order items being sent:", orderItems);

    try {
      const response = await api.post(
        "/orders/create",
        { orderItems: orderItems },
        { withCredentials: true }
      );
      console.log("Order created successfully:", response.data);
      const orderId = response.data.id;
      setOrderId(orderId);
      return { success: true, orderId };
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  const proceedToCheckout = async () => {
    if (!isAuthenticated) {
      handleCartClose();
      handleLoginOpen(); // Open the login slide
      return;
    }

    setIsLoading(true); // Set loading state to true when button is clicked

    const res = await createOrder(); // Create order before navigating

    if (res.success) {
      navigate("/checkout", {
        state: { orderId: res.orderId }, // Pass the order ID here
      });
    }

    setIsLoading(false); // Reset loading state
    handleCartClose();
  };

  const goToHome = () => {
    handleCartClose();
  };

  return (
    <div className=" ">
      {cart.product.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between md:px-20 px-4 mt-4 md:mx-auto ">
          <div className="md:w-1/2 ">
            <p className="font-medium text-[22px]">
              Shopping Cart{" "}
              <span className="text-gray-500"> ({cart.totalQuantity})</span>
            </p>
            {cart.product.map((product) => (
              <div className="flex md:flex-row justify-between w-full my-6 items-center space-x-4 ">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      className="h-[120px] w-[120px]"
                      src={product.image}
                      alt="product image"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-406 my-2">
                      {product.name}
                    </p>
                    <p>{product.description}</p>
                    <div className="flex items-center text-[14px] text-gray-400 space-x-1 capitalize my-1">
                      <p>{product.size}</p>
                      <span>/</span>
                      <p>{product.color}</p>
                    </div>
                    <div className=" flex items-center">
                      <div className="border-black border w-[80px] text-center space-x-4 mr-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          +
                        </button>
                      </div>
                      <span
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <TfiTrash />
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p>₦{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="my-5 bg-white">
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-white text-black sm:p-6">
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
                          ({cart.totalQuantity})
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
                    <p className="text-gray-400 text-[14px] font-light">
                      Tax included. <strong>Shipping</strong> calculated at
                      checkout.
                    </p>
                  </div>
                  <button
                    onClick={proceedToCheckout}
                    className="bg-black text-white w-full my-8 rounded justify-center flex items-center mx-auto py-2.5"
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? (
                      <RingLoader
                        color="#ffffff"
                        loading={isLoading}
                        size={24}
                      />
                    ) : (
                      <span className="text-[20px] mx-2">
                        <PiLockKeyLight />
                      </span>
                    )}
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
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
        <div className="flex justify-center flex-col p-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-[20px] font-bold font-style:italic">
                Shopping Cart
              </h1>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl text-center uppercase text-gray-700">
              Your bag is empty
            </h1>
          </div>
          <div className="mx-auto">
            <img src={emprtybag1} className=" md:w-96" alt="empty-bag" />
            <p className="text-gray-500 font-bold text-center capitalize">
              you haven't placed any order yet
            </p>
          </div>
          <div className="flex items-center justify-center py-3">
            <button
              onClick={() => goToHome("/")}
              className="relative group cursor-pointer text-sky-50 overflow-hidden h-12 w-64 rounded-md bg-black flex justify-center items-center font-extrabold"
            >
              <p className="z-10 capitalize">shop now</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartforCheckout;
