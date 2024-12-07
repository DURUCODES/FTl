import React from "react";
import ftl2 from "./aa.jpg";
import { WiDirectionRight } from "react-icons/wi";
import { motion } from "framer-motion";

const HomeBanner2 = () => {
  return (
    <motion.div className="md:px-32">
      <div className="flex flex-col md:flex-row justify-between items-center bg-black md:h-[500px]">
        {/* Animated Text */}
        <motion.div
          className="bg-black w-full md:w-[50%] px-4 flex flex-col justify-center items-center space-y-6 text-center md:text-left my-6"
          initial={{ opacity: 0, y: -10 }} // Start off-screen (top)
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible position
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <h2 className="text-white md:text-[40px] text-[28px] font-semibold">
            ELEVATE YOUR <br />
            <span className="text-indigo-600">STYLE</span>
            <br />
            EMBRACE THE <br />
            <span className="text-indigo-600">URBAN CULTURE</span>
          </h2>
          <p className="text-white md:text-lg text-base">
            Discover the latest trends that define the streets. Be bold, be you.
          </p>

          {/* Centered Button */}
          <button className="flex items-center justify-center bg-indigo-600 text-white font-semibold h-[50px] w-[150px] md:w-[180px] md:py-3 md:px-6 rounded-md hover:bg-indigo-700 transition duration-300">
            Shop Now
            <span className="ml-2">
              <WiDirectionRight />
            </span>
          </button>
        </motion.div>

        {/* Animated Image */}
        <motion.div
          className="md:h-[500px] w-full"
          initial={{ opacity: 0, y: 10 }} // Start off-screen (bottom)
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible position
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <img
            src={ftl2}
            alt="Urban culture banner"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeBanner2;
