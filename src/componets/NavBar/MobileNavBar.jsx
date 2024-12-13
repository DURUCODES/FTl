import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiAt } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { RingLoader } from "react-spinners";
import { IoLogoWhatsapp } from "react-icons/io";

// Categories with the path to route to
const Categories = [
  { name: "T-shirt", path: "/collections/T-shirt" },
  { name: "Tracksuit", path: "/track-suit" },
  { name: "Long Sleeve", path: "/collections/long-sleeve" },
  { name: "Socks", path: "/collection/socks" },
  { name: "Hat", path: "/collections/hat" },
];

const MobileNavBar = ({ closeMenuHandle, isOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const navigate = useNavigate();
  const location = useLocation(); // Track current route location

  // WhatsApp message pre-fill
  const messageFtl = "Please, I need your assistance on ";
  const phoneNumber = "2347010725792"; // Ensure this is the correct phone number format with country code
  const encodedMessage = encodeURIComponent(messageFtl);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Handle side menu visibility
  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
    } else {
      // Delay the state change to allow for slide-out effect
      const timer = setTimeout(() => setShowMenu(false), 500); // Match duration with CSS transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (loading) {
      // Simulate loading delay when route is changing
      const timer = setTimeout(() => setLoading(false), 1000); // Adjust this time to simulate loading
      return () => clearTimeout(timer);
    }
  }, [location]); // Listen to route changes

  const handleCategoryClick = (path) => {
    setLoading(true); // Start loading when a category is clicked
    navigate(path); // Navigate to the category's path
  };

  return (
    <>
      {isOpen && (
        <div className="bg-black px-2 z-10 fixed bg-opacity-10 backdrop-blur-md h-screen top-0 left-0 w-full text-black">
          <div
            className={`bg-white md:w-[400px] 
              absolute 
               h-[95%] w-[90%] rounded-md px-3 py-4 my-4 transition-transform  duration-300 ease-in-out ${
                 showMenu
                   ? "transform translate-x-0"
                   : "transform -translate-x-full"
               }`}
          >
            <div className="flex flex-row w-full p-2 justify-between items-center">
              <h1>Menu</h1>
              <RiCloseLargeLine
                className="md:text-[25px] text-[20px] cursor-pointer"
                onClick={closeMenuHandle}
              />
            </div>
            <div className="flex justify-between items-center mt-4 flex-col p-2">
              <ul className="w-full space-y-2 font-light text-[15px] cursor-pointer">
                {Categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between font-medium text-[14px] cursor-pointer"
                  >
                    {/* Show Spinner when loading */}
                    {loading && selectedCategory === category.name ? (
                      <div className="flex items-center justify-between w-full">
                        <span>{category.name}</span>
                        <RingLoader
                          size={20}
                          color={"#36D7B7"}
                          loading={loading}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-between w-full"
                        onClick={() => {
                          setSelectedCategory(category.name);
                          handleCategoryClick(category.path); // Navigate and trigger loading spinner
                          closeMenuHandle();
                        }}
                      >
                        <span>{category.name}</span>
                        <FaAngleRight />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col my-2 font-extralight text-[14px] space-y-2 p-2">
              <div>
                <p className="flex items-center font-extralight mb-2">
                  <span>
                    <MdOutlinePhoneIphone />
                  </span>
                  : +2347010725792
                </p>

                <p className="flex items-center">
                  <span>
                    <CiAt />
                  </span>{" "}
                  : ftljagor32@gmail.com
                </p>
              </div>
              <div className="flex items-center text-[24px] space-x-2">
                <span>
                  <a
                    href={whatsappURL} // Updated WhatsApp URL
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </span>
                <span>
                  <PiInstagramLogoThin />
                </span>
                <span>
                  <CiFacebook />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavBar;
