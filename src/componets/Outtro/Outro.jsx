import React from "react";
import { PiChatsTeardropThin } from "react-icons/pi";
import { GiShoppingCart } from "react-icons/gi";
import { IoBoatOutline } from "react-icons/io5";
import { GoCheckCircle } from "react-icons/go";
import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider settings with responsive configuration
const sliderSettings = {
  infinite: true, // Infinite loop
  speed: 500, // Transition speed
  slidesToShow: 4, // Show one slide at a time on mobile
  slidesToScroll: 4, // Scroll one slide at a time
  centerMode: false, // Disable center mode
  dots: false, // Show dots on mobile by default
  responsive: [
    {
      breakpoint: 768, // For mobile screens (max width 768px)
      settings: {
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        dots: true, // Enable dots
      },
    },
    {
      breakpoint: 1024, // For tablets and larger screens (width between 768px and 1024px)
      settings: {
        slidesToShow: 2, // Show two slides at a time
        slidesToScroll: 1, // Scroll one slide at a time
        dots: false, // Disable dots
      },
    },
    {
      breakpoint: 1280, // For large screens (larger than 1024px)
      settings: {
        slidesToShow: 4, // Show all four items at once
        slidesToScroll: 1, // Scroll one slide at a time
        dots: false, // Disable dots
      },
    },
  ],
};

const Outro = () => {
  return (
    <div className="outro-container p-6 mb-4 text-black text-center border-b-[0.2px] border-t-[0.2px] border-black">
      <Slider {...sliderSettings}>
        <div className="outro-item text-center flex-none w-64 p-4 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4 flex justify-center items-center">
            <GoCheckCircle />
          </span>
          <p className="font-semibold">Secured payment</p>
          <p>Enjoy peace of mind with our secured payment options!</p>
        </div>

        <div className="outro-item text-center flex-none w-64 p-4 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4 flex justify-center items-center">
            <IoBoatOutline />
          </span>
          <p className="font-semibold">Shipping</p>
          <p>
            Get your order fast with our
            <br /> speedy shipping options!
          </p>
        </div>

        <div className="outro-item text-center flex-none w-64 p-4 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4 flex justify-center items-center">
            <PiChatsTeardropThin />
          </span>
          <p className="font-semibold">Live chat</p>
          <p>
            Need help? Our live chat is
            <br /> here for instant support!
          </p>
        </div>

        <div className="outro-item text-center flex-none w-64 p-4 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4 flex justify-center items-center">
            <GiShoppingCart />
          </span>
          <p className="font-semibold">Checkout</p>
          <p>
            Easy checkout – complete
            <br /> your order in seconds!
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default Outro;
