import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { motion } from "framer-motion";
const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="transition-all translate-0 duration-300">
      {isVisible && (
        <div className="bg-black">
          <motion.button
            className="bg-black shadow-2xl shadow-black rounded-b-2xl rounded-s-3xl p-4 z-10"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              color: "white",
              border: "none",
              padding: "18px",
            }}
            animate={{
              y: ["0px", "-20px", "0px"], // Animate between 0px and -20px for up and down movement
            }}
            transition={{
              repeat: Infinity, // Repeat the animation indefinitely
              repeatType: "loop", // Loop the animation
              duration: 1, // Duration for one cycle of the animation
              ease: "easeInOut", // Easing for a smooth bounce effect
            }}
          >
            <FaAngleUp />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Scroll;
