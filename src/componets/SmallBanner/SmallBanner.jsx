import React from "react";
import image1 from "./ii.jpg";
import image2 from "./ops.jpg";

const SmallBanner = () => {
  return (
    <div className="p-4 px-2">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left Image Container */}
        <div className="relative border-black border-[1px] w-full md:w-[50%] md:h-[600px] h-[400px]">
          <img src={image1} className="w-full h-full object-fit" alt="Image" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50 p-4">
            Fashion meets Passion
          </p>
        </div>

        {/* Right Image Container */}
        <div className="relative border-black border-[1px] w-full md:w-[50%] md:h-[600px] h-[400px]">
          <img src={image2} className="w-full h-full object-fit" alt="Image" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50 p-4">
            Fasion is a way of life
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmallBanner;
