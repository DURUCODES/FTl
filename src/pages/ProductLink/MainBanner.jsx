import React from "react";
import banner from "./ftl2.JPG";

const MainBanner = () => {
  return (
    <div className="overflow-hidden h-screen">
      <img src={banner} alt="Banner" className="w-full h-full cover" />
    </div>
  );
};

export default MainBanner;
