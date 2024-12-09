import React from "react";
import ftl from "./mes.jpg";

const MainBanner = () => {
  return (
    <div className="overflow-hidden h-screen">
      <img src={ftl} alt="Banner" className="w-full h-full object-fit" />
    </div>
  );
};

export default MainBanner;
