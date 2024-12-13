import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import opps1 from "../assets/images/opps.jpg";
import ProductPage from "./ProductPage";
import { useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners"; // Import RingLoader

const FilterDataPage = () => {
  const filterProducts = useSelector((state) => state.product.filteredData);
  const location = useLocation();
  const { openSearch, closeSearchHandle } = location.state || {};
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Simulate a loading state for filtered data (you can replace this with your actual fetching logic)
    if (filterProducts.length > 0) {
      setLoading(false); // Set loading to false once the data is available
    }
  }, [filterProducts]);

  const searchAgain = () => {
    openSearch();
  };

  return (
    <div className="p-4">
      {/* Show RingLoader while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <RingLoader size={80} color="black" loading={loading} />
        </div>
      ) : (
        <>
          {filterProducts.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6">Your search</h2>
              <div className="grid grid-cols-2 md:grid-cols-4">
                {filterProducts.map((item, index) => (
                  <ProductPage key={index} product={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center flex items-center flex-col">
              <img src={opps1} alt="No results" />
              <button
                onClick={searchAgain} // Toggle the search bar when clicking
                className="bg-black p-3 text-white rounded cursor-pointer"
              >
                Search again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterDataPage;
