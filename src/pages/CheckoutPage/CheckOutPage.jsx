import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import PaystackPop from "@paystack/inline-js";
import amenx from "../CheckoutPage/images/amex.png";
import visa from "../CheckoutPage/images/visa.png";
import verve from "../CheckoutPage/images/verve.png";
import master from "../CheckoutPage/images/master.svg";
import mtn from "../CheckoutPage/images/mtn.svg";
import ama from "../CheckoutPage/images/atm.png";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../CheckoutPage/images/Flogo.jpg";

const CheckoutPage = () => {
  const location = useLocation(); // Use location hook to get passed state
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // default to 'delivery'

  // Initialize billing and shipping information with default values or passed state
  const [billingInfo, setBillingInfo] = useState({
    fullName: location.state?.billingInfo?.fullName || "",
    phoneNumber: location.state?.billingInfo?.phoneNumber || "",
    email: location.state?.billingInfo?.email || "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    Firstname: location.state?.shippingInfo?.Firstname || "",
    Lastname: location.state?.shippingInfo?.Lastname || "",
    email: location.state?.shippingInfo?.email || "",
    address: location.state?.shippingInfo?.address || "",
    company: location.state?.shippingInfo?.company || "",
    apartment: location.state?.shippingInfo?.apartment || "",
    phone: location.state?.shippingInfo?.phone || "",
    city: location.state?.shippingInfo?.city || "",
    zip: location.state?.shippingInfo?.zip || "",
    state: location.state?.shippingInfo?.state || "", // New state field
  });

  const [paymentMethod, setPaymentMethod] = useState(
    location.state?.paymentMethod || "Paystack"
  );

  const [errors, setErrors] = useState({});

  // Delivery fee constant
  const deliveryFee = 10000; // $10,000 delivery fee for delivery orders

  const apiKey = "pk_test_180c82d9fc2ccc057a89d1f74b5c68391950fda5";

  // Calculate total order price including delivery fee
  const calculateTotalPrice = () => {
    const cartTotal = cart.totalPrice || 0;
    return deliveryMethod === "delivery" ? cartTotal + deliveryFee : cartTotal;
  };

  // Validate form data
  const validateForm = () => {
    const validationErrors = {};

    // Shipping Info Validation
    if (deliveryMethod === "delivery") {
      if (!shippingInfo.Firstname)
        validationErrors.Firstname = "First name is required";
      if (!shippingInfo.email) validationErrors.email = "Email is required";
      if (!shippingInfo.Lastname)
        validationErrors.Lastname = "Last name is required";
      if (!shippingInfo.address)
        validationErrors.address = "Address is required";
      if (!shippingInfo.city) validationErrors.city = "City is required";
      if (!shippingInfo.zip) validationErrors.zip = "Zip code is required";
      if (!shippingInfo.state) validationErrors.state = "State is required"; // Validate state

      // Optional: Validate zip code format if needed
      if (!shippingInfo.zip) {
        validationErrors.zip = "Zip code format is invalid"; // Basic US zip code validation
      }

      // Optional: Validate phone number format if needed
      if (!shippingInfo.phone) {
        validationErrors.phone = "Phone number must be 10 digits"; // Phone number validation
      }
    }

    // Billing Info Validation
    if (!billingInfo.fullName) {
      validationErrors.fullName = "Full name is required";
    }
    if (!billingInfo.email) {
      validationErrors.billingEmail = "Email is required";
    }
    if (!billingInfo.phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    }

    return validationErrors;
  };

  // Handle form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Remove error if field is filled
        return newErrors;
      });
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
    if (value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Remove error if field is filled
        return newErrors;
      });
    }
  };

  // Handle order and payment submission
  const handleOrder = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Don't proceed if validation fails
    }

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: apiKey, // Use your actual Paystack public key
      email: shippingInfo.email,
      amount: calculateTotalPrice() * 100, // Convert to kobo
      currency: "NGN",
      onSuccess: (transaction) => {
        const transactionDetails = {
          reference: transaction.reference, // Transaction reference number
          status: transaction.status, // Transaction status (e.g., 'success')
          transactionData: transaction, // Full transaction object (optional)
        };

        // Create order details including billing and shipping info
        const orderDetails = {
          billingInfo,
          shippingInfo,
          paymentMethod,
          cart,
          ...transactionDetails,
        };

        // Navigate to the order-confirmation page with order details
        navigate("/order-confirmation", { state: orderDetails });
      },
      onCancel: () => {
        console.log("Transaction was cancelled.");
      },
    });
  };
  return (
    <div className="  text-black ">
      <div className=" ">
        <div className="flex justify-between py-2 px-10 items-center">
          <Link to="/">
            {" "}
            <img src={logo} className="w-[200px] h-[100px]" />
          </Link>
          <h3 className="text-xl font-semibold">CHECKOUT</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:space-x-4 md:border-t-[2px]">
          <div className="md:w-1/2 md:border-r-[2px] md:py-4 py-4 md:px-2  md:px-18 h-[100%]">
            {/* Billing Info Section */}
            {/* BILLING CONTACT  */}
            <div className="p-2 border-black border-[0px]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-1">Contact</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 rounded w-full bg-white border-[1px] px-4 text-black placeholder:text-[10px]"
                    placeholder="Enter your email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Delivery Method Section */}
            <div className="p-2 mb-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold mb-2">Delivery</h3>
              </div>

              <div className="">
                {/* Delivery Option */}
                <div
                  className={`flex items-center border rounded-t p-3 justify-between px-4 hover:border-black ${
                    deliveryMethod === "delivery"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="relative flex items-center">
                    {/* Hidden radio button */}
                    <input
                      type="radio"
                      id="delivery"
                      name="deliveryMethod"
                      className="absolute opacity-0 cursor-pointer"
                      checked={deliveryMethod === "delivery"}
                      onChange={() => setDeliveryMethod("delivery")}
                    />
                    {/* Custom radio button (checkmark) */}
                    <div
                      className={`w-4 h-4 mr-2 rounded-full border-2 transition-colors duration-200 ease-in-out ${
                        deliveryMethod === "delivery"
                          ? "bg-black border-black"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "delivery" && (
                        <div className="w-[7px] h-[7px] bg-white rounded-full mx-auto mt-[3px]"></div>
                      )}
                    </div>
                    {/* Label */}
                    <span className="text-[14px]">Delivery</span>
                    <span>
                      <TbTruckDelivery />
                    </span>
                  </div>
                </div>

                {/* Pickup Option */}
                <div
                  className={`flex items-center border rounded-b p-3 justify-between px-4 hover:border-black ${
                    deliveryMethod === "pickup"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <div className="relative flex items-center">
                    {/* Hidden radio button */}
                    <input
                      type="radio"
                      id="pickup"
                      name="deliveryMethod"
                      className="absolute opacity-0 cursor-pointer"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                    />
                    {/* Custom radio button (checkmark) */}
                    <div
                      className={`w-4 h-4 mr-2 rounded-full border-2 transition-colors duration-200 ease-in-out ${
                        deliveryMethod === "pickup"
                          ? "bg-black border-black"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "pickup" && (
                        <div className="w-[7px] h-[7px] bg-white rounded-full mx-auto mt-[3px]"></div>
                      )}
                    </div>
                    {/* Label */}
                    <span className="text-[14px]">Pick Up in Store</span>
                    <span>
                      <FaPersonWalkingLuggage />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info Section (Conditional Rendering) */}
            {deliveryMethod === "delivery" && (
              <div className=" p-2 ">
                <div className={`space-y-4`}>
                  <div className=" flex flex-col w-full items-start px-3 py-1 border rounded bg-white border-gray-200 hover:border-black focus:outline-none focus:border-black">
                    <label className="text-gray-500 text-[12px] mb-1">
                      Country/Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="flex justify-between w-full  hover:border-black focus:outline-none focus:border-transparent  text-[14px]"
                    >
                      {["Nigeria"].map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>

                    {errors.country && (
                      <p className="text-red-500 text-[10px]">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* NAME AND ETAILLS */}

                  <div className="space-y-3">
                    {/* Name Info */}
                    <div className="flex flex-col md:flex-row md:space-x-4 w-full space-y-3 md:space-y-0">
                      <div className="w-full">
                        <input
                          name="Firstname" // <-- Added name attribute
                          value={shippingInfo.Firstname}
                          onChange={handleShippingChange}
                          placeholder="First name"
                          className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                        />
                        {errors.Firstname && (
                          <p className="text-red-500 text-[10px] mt-2">
                            {errors.Firstname}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <input
                          name="Lastname" // <-- Added name attribute
                          value={shippingInfo.Lastname}
                          onChange={handleShippingChange}
                          placeholder="Last name"
                          className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                        />
                        {errors.Lastname && (
                          <p className="text-red-500 text-[10px] mt-2">
                            {errors.Lastname}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rest of the fields */}
                    <div>
                      <input
                        name="company" // <-- Added name attribute
                        value={shippingInfo.company}
                        onChange={handleShippingChange}
                        placeholder="Company (optional)"
                        className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-[10px] mt-2">
                          {errors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        name="address" // <-- Added name attribute
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        placeholder="Address"
                        className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                      />
                    </div>

                    <div>
                      <input
                        name="apartment" // <-- Added name attribute
                        value={shippingInfo.apartment}
                        onChange={handleShippingChange}
                        placeholder="Apartment ,suite ,etc. (optional)"
                        className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 w-full">
                      <div className="w-full md:w-1/3">
                        <input
                          name="city" // <-- Added name attribute
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          placeholder="City"
                          className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-[10px] mt-2">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="w-full md:w-1/3">
                        <input
                          name="state" // <-- Added name attribute
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          placeholder="State"
                          className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-[10px] mt-2">
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div className="w-full md:w-1/3">
                        <input
                          name="zip" // <-- Added name attribute
                          value={shippingInfo.zip}
                          onChange={handleShippingChange}
                          placeholder="Postal code (optional)"
                          className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                        />
                        {errors.zip && (
                          <p className="text-red-500 text-[10px] mt-2">
                            {errors.zip}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        name="phone" // <-- Added name attribute
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        placeholder="Phone"
                        className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] mt-2">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pickup Store Information (When Pickup is selected) */}
            {deliveryMethod === "pickup" && (
              <div className=" p-2 mb-0">
                <div className="  p-2 rounded mb-0 border-black border-[1px]">
                  <h3 className="text-[18px] font-semibold mb-2">
                    Store Location
                  </h3>
                  <p className="text-sm underline">
                    Ago Best Time, Isolo, Lagos State
                  </p>
                  <p className="text-xs text-red-500 mt-2">
                    We only have one store here in Nigeria.
                  </p>
                </div>
              </div>
            )}
            {/* BILLING INFO */}
            <div className="p-2">
              <div className="billing-info-section space-y-4">
                <h2 className="text-lg font-semibold ">Billing Information</h2>
                <input
                  type="text"
                  name="fullName"
                  value={billingInfo.fullName}
                  onChange={handleBillingChange}
                  placeholder="Full Name"
                  className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-2">{errors.fullName}</p>
                )}
                <input
                  type="email"
                  name="email"
                  value={billingInfo.email}
                  onChange={handleBillingChange}
                  placeholder="Email"
                  className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                />
                {errors.billingEmail && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.billingEmail}
                  </p>
                )}
                <input
                  type="text"
                  name="phoneNumber"
                  value={billingInfo.phoneNumber}
                  onChange={handleBillingChange}
                  placeholder="Phone Number"
                  className="rounded p-4 border-[0.5px] border-black w-full placeholder:text-[12px] hover:border-black focus:outline-black"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            {/* Payment Info Section */}
            <div className=" p-2 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">Payment </h3>
              </div>

              <div className={`space-y-4`}>
                {/* Main Payment Options */}
                <div>
                  {/* Paystack Payment Option */}
                  <div
                    className={`flex items-center border rounded-t p-3 justify-between px-4 hover:border-black ${
                      paymentMethod === "Paystack"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="relative flex items-center">
                      {/* Hidden radio button */}
                      <input
                        type="radio"
                        id="paystack"
                        name="paymentMethod"
                        className="absolute opacity-0 cursor-pointer"
                        checked={paymentMethod === "Paystack"}
                        onChange={() => setPaymentMethod("Paystack")}
                      />
                      {/* Custom radio button (checkmark) */}
                      <div
                        className={`w-4 h-4 mr-2 rounded-full border-2 transition-colors duration-200 ease-in-out ${
                          paymentMethod === "Paystack"
                            ? "bg-black border-black"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      >
                        {paymentMethod === "Paystack" && (
                          <div className="w-[7px] h-[7px] bg-white rounded-full mx-auto mt-[3px]"></div>
                        )}
                      </div>
                      {/* Label */}
                      <span>Paystack</span>
                    </div>
                    <div className="flex space-x-2 ">
                      <img src={master} className="w-10" />
                      <img src={visa} className="w-10" />
                      <img src={amenx} className="w-10 object-contain" />
                      <img src={mtn} className="w-10 object-contain" />
                      <img src={verve} className="w-10 object-contain" />
                    </div>
                  </div>

                  {/* Conditional rendering based on Paystack selection */}
                  {paymentMethod === "Paystack" && (
                    <div className="border p-8 flex items-center flex-col text-center">
                      <img src={ama} className="w-[120px] my-4 md:w-[200px]" />
                      <p className="text-[14px]">
                        After clicking “Pay now”, you will be redirected to{" "}
                        <br />
                        Paystack to complete your purchase securely.
                      </p>
                    </div>
                  )}

                  {/* Bank Transfer Payment Option */}
                  <div
                    className={`flex items-center border rounded-b p-3 justify-between px-4 hover:border-black ${
                      paymentMethod === "Bank Transfer"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="relative flex items-center">
                      {/* Hidden radio button */}
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="paymentMethod"
                        className="absolute opacity-0 cursor-pointer"
                        checked={paymentMethod === "Bank Transfer"}
                        onChange={() => setPaymentMethod("Bank Transfer")}
                      />
                      {/* Custom radio button (checkmark) */}
                      <div
                        className={`w-4 h-4 mr-2 rounded-full border-2 transition-colors duration-200 ease-in-out ${
                          paymentMethod === "Bank Transfer"
                            ? "bg-black border-black"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      >
                        {paymentMethod === "Bank Transfer" && (
                          <div className="w-[7px] h-[7px] bg-white rounded-full mx-auto mt-[3px]"></div>
                        )}
                      </div>
                      {/* Label */}
                      <span>Bank Transfer</span>
                    </div>
                  </div>
                </div>

                {/* Conditional Rendering for Bank Transfer */}
                {paymentMethod === "Bank Transfer" && (
                  <div className="bg-gray-100 p-4 mb-4">
                    <h3 className="text-xl font-semibold mb-4">
                      Bank Transfer Details
                    </h3>
                    <p className="text-sm mb-4">
                      Please note that our conversion rate is 1,700 NGN to $1,
                      and we will confirm all payments before processing your
                      order.
                    </p>
                    <p className="font-semibold mb-4">
                      Make a bank transfer in Nigerian Naira (NGN) of the
                      required amount to the following account:
                    </p>

                    <div className="space-y-2 mb-4">
                      <p className="font-semibold">Account Name:</p>
                      <p>FTL CLOTHING LUXURY</p>

                      <p className="font-semibold">Account Number:</p>
                      <p>8169084534</p>

                      <p className="font-semibold">Bank Name:</p>
                      <p>OPAY</p>
                    </div>

                    <p className="text-sm mb-4">
                      Kindly contact <strong>+234(0) 816 908 4535</strong> with
                      your detailed proof of payment confirmation. Please note
                      that we confirm all payments before processing orders.
                    </p>

                    <p className="text-sm">Thank you for your cooperation.</p>
                  </div>
                )}
              </div>

              <div className="">
                <button
                  onClick={handleOrder}
                  disabled={Object.keys(errors).length > 0}
                  className="relative group cursor-pointer text-sky-50 mx-auto overflow-hidden h-16 w-full  rounded-md bg-black my-4 flex justify-center items-center font-extrabold"
                >
                  <p className="capitalize">
                    {paymentMethod === "Bank Transfer"
                      ? "Complete Order"
                      : "Pay Now"}
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="  max-h-[full] w-full md:w-1/2 md:py-4   md:px-8">
            <div className="text-white p-6 rounded-lg  ">
              <h3 className="text-lg font-semibold mb-4 text-black">
                Order Summary
              </h3>
              <div className="space-y-4 ">
                {cart.product.map((product, index) => (
                  <div key={index} className="flex ">
                    <div>
                      <img
                        src={product.image}
                        className="w-[100px] h-[100px] object-contain rounded"
                      />
                      <div className="w-[25px] text-center bg-gray-900 rounded-full absolute ml-[60px] -mt-[100px]">
                        <p className="text-white ">{product.quantity}</p>
                      </div>
                    </div>

                    <div className="ml-4 w-full ">
                      <div className="flex  justify-between items-center">
                        <h3 className="text-md font-[200px] capitalize text-black">
                          {product.name}
                        </h3>
                        <p className="text-black">₦ {product.price} </p>
                      </div>
                      <div className="flex text-gray-500 space-x-2 ">
                        <p className="text-[14px] font-light">{product.size}</p>
                        <span>/</span>
                        <p className="text-[14px] font-light">
                          {" "}
                          {product.color}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" my-8 p-4 w-full flex space-x-2">
                <input
                  disabled
                  placeholder="Discount code or gift card"
                  className="w-full py-4 border rounded px-4 placeholder:text-[12px] outline-black"
                />
                <button className=" hover:bg-black focus:bg-black px-6 rounded bg-gray-500 cursor-pointer">
                  Apply
                </button>
              </div>

              <div className="mt-4  pt-4 space-y-2">
                <div className="flex justify-between w-full">
                  <span className="text-black">
                    Subtotal:({cart.totalQuantity}) items
                  </span>
                  <span className="text-black">₦ {cart.totalPrice}</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between text-black">
                    <span>Shipping</span>
                    <span className="font-light">₦{deliveryFee}</span>
                  </div>
                )}

                {/* Order Total */}
                <div className="flex justify-between text-black">
                  <span>Total Price:</span>

                  <span className="font-light">
                    <span className="mx-2 text-gray-400">NGN</span>₦
                    {calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
