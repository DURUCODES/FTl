import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
const Whatsapp = () => {
  // Define the phone number and optional message
  const phoneNumber = "07010725792"; // Replace with the actual phone number (with country code)
  const message = "Hello, I need more information about your products."; // Optional message to pre-fill

  // Create the WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className=" hidden ">
      <a
        href={whatsappURL}
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // For security reasons
        /*   className="bg-green-500 text-white  rounded shadow-lg hover:bg-green-600 transition" */
      >
        <IoLogoWhatsapp className="text-green-500 " />
      </a>
      {/*       <p className="text-[50px]  shadow-xl rounded-full "></p> */}
    </div>
  );
};

export default Whatsapp;
