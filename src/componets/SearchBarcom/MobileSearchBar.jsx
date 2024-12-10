import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import FilterDataPage from "../../pages/FilterDataPage";

const MobileSearchBar = ({ closeSearchHandle, openSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = useSelector((state) => state.product.filteredData);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    closeSearchHandle();
    navigate("/search");
  };

  useEffect(() => {
    if (openSearch) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timer);
    }
  }, [openSearch]);

  return (
    <>
      {openSearch && (
        <div className="bg-black fixed z-10 bg-opacity-10 backdrop-blur-md h-screen top-0 right-0 w-full">
          <div
            className={`bg-white md:w-[400px] 
              
                             absolute mt-4
               h-[95%]   w-[90%] rounded-md right-2 p-2 
              
              
              
              px-3 py-4 transition-transform duration-300 ease-in-out ${
                showMenu
                  ? "transform translate-x-50"
                  : "transform -translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-[18px]">Search</h1>
              <RiCloseLargeLine
                className="md:text-[25px] text-[20px] cursor-pointer"
                onClick={closeSearchHandle}
              />
            </div>
            <div className="flex items-center w-full bg-gray-50 border  border-black py-2">
              <input
                className="border-none w-[280px] md:w-[330px] py-2 px-3 bg-transparent outline-none placeholder:text-xs"
                placeholder="Search Our Store..."
                value={search}
                onChange={handleSearchInputChange}
              />
              <span className="cursor-pointer font-[30px]">
                <CiSearch onClick={handleSearch} />{" "}
              </span>
            </div>
            {filteredData.length > 0 && (
              <div className="mt-5">
                <h2 className="font-semibold text-lg">Search Results:</h2>
                <ul className="mt-3">
                  {filteredData.map((product) => (
                    <li key={product.id} className="py-2">
                      <span>{product.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSearchBar;
