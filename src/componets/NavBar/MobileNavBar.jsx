import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "./ftlLogo.jpg";

const categoryMapping = {
  "top-sales": 1,
  "t-shirt": 3,
  "long-sleeve": 2,
  "ftl-hat": 6,
  "black-friday": 8,
};

const MobileNavBar = ({ closeMenuHandle, isOpen, setSelectedCategory }) => {
  const [showMenu, setShowMenu] = useState(false);

  const categories = [
    { id: 1, name: "Top Sales" },
    { id: 3, name: "T-Shirt" },
    { id: 2, name: "Long Sleeve" },
    { id: 6, name: "hat" },
    { id: 8, name: "Black friday" },
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
        <div className="bg-black z-10 fixed bg-opacity-10 backdrop-blur-md h-screen top-0 left-0 w-full text-black">
          <div
            className={`bg-white md:w-[400px] top-0 h-screen w-[250px] px-3 py-4 transition-transform duration-300 ease-in-out ${
              showMenu
                ? "transform translate-x-0"
                : "transform -translate-x-full"
            }`}
          >
            <div className="flex flex-row w-full h-[100px]  justify-between items-center mb-10 p-4">
              <img src={logo} className="w-[40%] " />
              <RiCloseLargeLine
                className="md:text-[25px]  text-[20px] cursor-pointer"
                onClick={closeMenuHandle}
              />
            </div>
            <div className="flex justify-between items-center mt-2 flex-col">
              <ul className="w-full space-y-4 font-light text-[15px] cursor-pointer">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      to={`/collections/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={() => handleLinkClick(category.name)}
                    >
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavBar;
