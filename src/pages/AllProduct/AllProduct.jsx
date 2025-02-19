import React from "react";
import ProductPage from "../ProductPage";

const AllProduct = () => {
  return (
    <div className="my-[]">
      <p>all product page here</p>

      {/*   <div className="flex flex-col items-center">
        <div className="flex flex-col  items-center px-0 mb-5 md:px-2 cursor-pointer">
          <ul className="flex flex-col cursor-pointer  text-sm">
            <li className=" md:px-4 mb-4 md:mb-0">Top sales</li>
            <li className=" md:px-4 mb-4 md:mb-0">New Arrivals</li>
            <li className=" md:px-4 mb-4 md:mb-0">Men</li>
            <li className=" md:px-4 mb-4 md:mb-0">Women</li>
            <li className=" md:px-4 mb-4 md:mb-0">Collection</li>
          </ul>
        </div>
      </div> */}
      <hr className=" mb-6 border-white w-full" />
      <div>
        <div className=" flex-col flex md:hidden items-start ">
          <button className="mb-3 font-bold ">Login</button>
          <button className="font-bold">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
