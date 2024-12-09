import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "./ftlLogo.jpg";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiAt } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";

const categoryMapping = {
  "top-sales": 1,
  "t-shirt": 3,
  "long-sleeve": 2,
  "ftl-hat": 6,
  "black-friday": 5,
};

const MobileNavBar = ({ closeMenuHandle, isOpen, setSelectedCategory }) => {
  const [showMenu, setShowMenu] = useState(false);

  const categories = [
    { id: 1, name: "Top Sales" },
    { id: 3, name: "T-Shirt" },
    { id: 2, name: "Long Sleeve" },
    { id: 6, name: "Hat" },
    { id: 5, name: "Black friday" },
  ];

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

  const handleLinkClick = (categoryName) => {
    // Match category name to the ID using the formatted string
    const categoryId =
      categoryMapping[categoryName.toLowerCase().replace(/\s+/g, "-")];
    setSelectedCategory(categoryId); // Update selected category
    closeMenuHandle(); // Close menu after clicking a category
  };

  return (
    <>
      {isOpen && (
        <div className="bg-black px-2 z-10 fixed bg-opacity-10 backdrop-blur-md h-screen top-0 left-0 w-full text-black">
          <div
            className={`bg-white md:w-[400px] 
              absolute 
               h-[95%]   w-[90%] rounded-md px-3 py-4 my-4 transition-transform duration-300 ease-in-out ${
                 showMenu
                   ? "transform translate-x-0"
                   : "transform -translate-x-full"
               }`}
          >
            <div className="flex flex-row w-full  p-2 justify-between items-center ">
              <h1>FEEL THE LIFESTYLE</h1>
              <RiCloseLargeLine
                className="md:text-[25px]  text-[20px] cursor-pointer"
                onClick={closeMenuHandle}
              />
            </div>
            <div className="flex justify-between items-center mt-4 flex-col p-2 ">
              <ul className="w-full space-y-2 font-light text-[15px] cursor-pointer">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center space-x-4 justify-between font-medium text-[14px]"
                  >
                    <Link
                      to={`/collections/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={() => handleLinkClick(category.name)}
                    >
                      <span>{category.name}</span>
                    </Link>{" "}
                    <span>
                      <FaAngleRight />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col my-2 font-extralight text-[13px] space-y-2 p-2">
              <div>
                <p className="flex items-center font-extralight">
                  <span>
                    <MdOutlinePhoneIphone />
                  </span>
                  : 123456788920
                </p>

                <p className="flex items-center">
                  <span>
                    <CiAt />
                  </span>{" "}
                  : ftlclothing@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-2">
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
