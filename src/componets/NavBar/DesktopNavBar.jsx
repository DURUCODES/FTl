import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import logo from "./ftlLogo.jpg"; // Default logo
import logo2 from "./ftl2.jpg"; // Logo for scroll position

const DesktopNavBar = ({
  openMenuHandle,
  openSearchHandle,
  handleCartOpen,
  handleLoginOpen,
}) => {
  const totalQuantity = useSelector((state) => state.cart.product);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [textColor, setTextColor] = useState("text-black");
  const [logoImage, setLogoImage] = useState(logo); // State to control logo image

  // Get the current location (route)
  const location = useLocation();

  const handleScroll = () => {
    // Change the background color and text color based on scroll position
    if (window.scrollY > 0) {
      setBgColor("bg-black"); // Change to black when scrolled
      setTextColor("text-white"); // Change text to white
    } else {
      setBgColor("bg-transparent"); // Change back to transparent when at the top
      setTextColor("text-black"); // Change text back to black
      setLogoImage(logo); // Change logo back to default when at top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Conditionally add 'fixed' class if we're on the homepage
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`flex justify-between items-center z-10 px-2 h-[54px] md:h-[90px] transition-all duration-300 
        w-[98%] mx-auto ${
          isHomePage ? "fixed top-4" : ""
        }  transform rounded-xl border-white border-[1px] 
        hover:bg-white hover:text-black text-black ${bgColor} ${textColor}`}
    >
      <div className="flex items-center md:space-x-8">
        <CiMenuFries
          className="text-[35px] cursor-pointer mr-2"
          onClick={openMenuHandle}
        />

        <BsPersonCircle
          className="md:text-[30px] text-[20px] cursor-pointer"
          onClick={handleLoginOpen}
        />
      </div>

      {/* Logo and tagline section */}
      <div className="text-center">
        <Link to="/">
          <h1 className="md:text-[40px] text-[15px] font-semibold">
            FEEL THE LIFESTYLE
          </h1>
        </Link>
      </div>

      <div className="flex md:space-x-4 space-x-2 items-center">
        <span>
          <IoLogoWhatsapp className="md:text-[30px] text-[18px] cursor-pointer hidden md:block" />
        </span>
        <span>
          <CiSearch
            className="md:text-[30px] text-[28px] cursor-pointer"
            onClick={openSearchHandle}
          />
        </span>
        <span className="flex items-center">
          <CiShoppingCart
            className="md:text-[30px] text-[28px] cursor-pointer"
            onClick={handleCartOpen}
          />

          {totalQuantity.length > 0 && (
            <span className="font-bold text-xl">{totalQuantity.length}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default DesktopNavBar;
