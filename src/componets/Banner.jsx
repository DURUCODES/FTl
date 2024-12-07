import React from "react";
import bannerImg3 from "../assets/images/p3.jpg";
import bannerimg2 from "../assets/images/Tops/hhh.jpg";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center  ">
      <div className="w-full">
        <img src={bannerimg2} className="w-full md:h-screen" />
      </div>
    </div>
  );
};

export default Banner;
