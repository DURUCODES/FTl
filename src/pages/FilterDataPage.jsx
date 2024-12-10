import React from "react";
import { useSelector } from "react-redux";
import opps1 from "../assets/images/opps.jpg";
import ProductPage from "./ProductPage";
import { useLocation } from "react-router-dom";

const FilterDataPage = ({}) => {
  const filterProducts = useSelector((state) => state.product.filteredData);
  const location = useLocation();
  const { openSearch, closeSearchHandle } = location.state || {};
  const searchAgain = () => {
    openSearch();
  };

  return (
    <div className="p-4">
      {filterProducts.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6 ">Your search</h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {filterProducts.map((item, index) => (
              <ProductPage key={index} product={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center flex items-center flex-col">
          <img src={opps1} />
          {/*    <button
            onClick={searchAgain} // Toggle the search bar when clicking
            className="bg-black p-3 text-white rounded cursor-pointer"
          >
            Search again
          </button> */}
        </div>
      )}
    </div>
  );
};

export default FilterDataPage;
