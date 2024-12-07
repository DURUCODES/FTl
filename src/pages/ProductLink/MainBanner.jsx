import React from "react";
import ftl from "./bbl.jpg";

const MainBanner = () => {
  return (
    <div className="w-full  overflow-hidden">
      <img src={ftl} alt="Banner" className="w-full h-[600px] object-cover" />
    </div>
  );
};

export default MainBanner;
