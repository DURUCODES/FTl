import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { clearCart } from "../../redux/CartSlice";
import email from "./email.png";
import address from "./address.png";
import phone from "./phone.png";
import person from "./person.png";

const OrderComfirmationPage = () => {
  const location = useLocation();
  const { billingInfo, shippingInfo, paymentMethod, cart, reference, status } =
    location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const continueShopping = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <h2 className="text-3xl font-semibold text-center my-4 text-black">
          Thank You for Shopping with us
        </h2>

        {/* Order Confirmation Details */}
        <div className="bg-white p-6 rounded-lg  space-y-6">
          {/* Billing Information */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              Billing Information
            </h3>
            <div className="space-y-1">
              <p className="text-lg text-gray-700 flex items-center  ">
                <img src={person} className="w-[30px] h-[25px]" />
                <span className="mr-1 font-extrabold">:</span>
                <span className="font-semibold">{billingInfo.fullName}</span>
              </p>
              <p className="text-lg text-gray-700 flex items-center py-2">
                <img src={email} className="w-[30px] h-[25px]" />{" "}
                <span className="mr-1">:</span>
                <span className="font-semibold">{billingInfo.email}</span>
              </p>
              <p className="text-lg text-gray-700 flex items-center">
                <img src={phone} className="w-[30px] h-[25px]" />
                <span className="mr-1">:</span>
                <span className="font-semibold">{billingInfo.phoneNumber}</span>
              </p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              Shipping Information
            </h3>
            <div className="space-y-1 ">
              <p className="text-lg text-gray-700 flex items-center">
                <img src={address} className="w-[30px] h-[25px]" />{" "}
                <span className="mr-1">:</span>
                <span className="font-semibold">
                  {shippingInfo.address} {shippingInfo.city}{" "}
                  {shippingInfo.state} ({shippingInfo.zip})
                </span>
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              Payment Method
            </h3>
            <p className="text-lg text-gray-700">{paymentMethod}</p>
            <p>
              Ref: <strong>{reference}</strong>
            </p>
            <p>
              status: <strong>{status}</strong>
            </p>
          </div>

          {/* Order Items */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              Order Items
            </h3>
            <div className="space-y-2">
              {cart.product.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-lg text-gray-700">
                    {product.name} <span className="mr-2">:</span>
                    <span className="font-semibold">₦{product.price}</span> x ({" "}
                    {product.quantity})
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-800">Total Price:</span>
                  <span className="text-gray-600">
                    ₦{cart.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Further Action Button */}
        <div className="mt-8 flex justify-around">
          <button
            onClick={continueShopping}
            className="bg-black text-white px-4 py-3 w-full rounded-md font-semibold hover:bg-transparent hover:text-black hover:border-[1px] hover:border-black transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComfirmationPage;
