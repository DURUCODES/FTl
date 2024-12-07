import React, { useState, useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
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

  const handleScroll = () => {
    // Change the background color and text color based on scroll position
    if (window.scrollY > 0) {
      setBgColor("bg-black"); // Change to black when scrolled
      setTextColor("text-white"); // Change text to white
      setLogoImage(logo2); // Change logo to logo2 when scrolled
    } else {
      setBgColor("bg-white"); // Change back to white when at the top
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

  return (
    <div
      className={`flex justify-between items-center w-full z-10 md:px-2 h-[70px] md:h-[80px] transition-all duration-300 ${bgColor} ${textColor}`}
    >
      <div className="flex items-center md:space-x-8">
        <BiMenuAltLeft
          className={`text-[35px] cursor-pointer ${textColor}`}
          onClick={openMenuHandle}
        />

        <BsPersonCircle
          className={`md:text-[30px] text-[20px] cursor-pointer ${textColor}`}
          onClick={handleLoginOpen}
        />
      </div>

      <div className="w-[500px] h-[200px]">
        <Link to="/">
          <img
            src={logoImage} // Conditionally render the logo
            alt="Logo"
            className="object-contain w-full h-full transition-all duration-300" // Added transition for smooth logo change
          />
        </Link>
      </div>

      <div className="flex md:space-x-4 space-x-2 items-center">
        <span>
          <IoLogoWhatsapp
            className={`md:text-[30px] text-[18px] cursor-pointer hidden md:block ${textColor}`}
          />
        </span>
        <span>
          <CiSearch
            className={`md:text-[30px] text-[28px] cursor-pointer ${textColor}`}
            onClick={openSearchHandle}
          />
        </span>
        <span className="flex items-center">
          <GiShoppingCart
            className={`md:text-[30px] text-[28px] cursor-pointer ${textColor}`}
            onClick={handleCartOpen}
          />

          {totalQuantity.length > 0 && (
            <span className="text-red-500 font-bold text-xl ">
              {totalQuantity.length}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default DesktopNavBar;
