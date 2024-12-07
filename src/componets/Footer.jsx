import React from "react";
import { motion } from "framer-motion";
import paystackImg from "../assets/images/paystack.png";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white pt-5 pb-2  md:px-4 overflow-hidden border-black border-[1px]">
      <div className="bg-white text-black flex flex-col">
        <div className="flex flex-col md:flex-row px-0 md:px-[30px] justify-between mb-5 border-b-[1px] border-black text-black">
          {/* Contact Section */}
          <motion.div
            className="p-4 flex flex-col md:w-[25%] w-full md:border-r-[1px] border-black md:border-b-0 border-b-2 overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", bounce: 0.5, duration: 2 },
            }}
            viewport={{ once: true }}
          >
            <motion.h4
              className="font-bold mb-2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", bounce: 0.5, duration: 2 },
              }}
              viewport={{ once: true }}
            >
              Contact
            </motion.h4>
            <motion.p
              className="mb-2 text-[14px] text-gray-700 underline"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
            >
              Ago Palace, Tinubu, Lagos, Startime Estate, Isolo
            </motion.p>
            <motion.p
              className="mb-2 text-[14px] text-gray-700 hover:underline"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.4,
                },
              }}
              viewport={{ once: true }}
            >
              Operating hours: Monday – Saturday (10am - 10pm)
            </motion.p>
            <motion.p
              className="mb-2 text-[14px] text-gray-700 hover:underline"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.6,
                },
              }}
              viewport={{ once: true }}
            >
              Sunday (12pm - 10pm)
            </motion.p>
            <motion.p
              className="mb-2 text-[14px] text-gray-700 hover:underline"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.8,
                },
              }}
              viewport={{ once: true }}
            >
              08169084535
            </motion.p>
          </motion.div>

          {/* Shop Here Section */}
          <motion.div
            className="p-4 flex flex-col md:w-[25%] w-full md:border-r-[1px] border-black md:border-b-0 border-b-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", bounce: 0.5, duration: 2 },
            }}
            viewport={{ once: true }}
          >
            <motion.h4
              className="font-bold mb-2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", bounce: 0.5, duration: 2 },
              }}
              viewport={{ once: true }}
            >
              Shop Here
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
            >
              <motion.li className="mb-2 text-[14px] text-gray-700 hover:underline">
                All Items
              </motion.li>
              <motion.li className="mb-2 text-[14px] text-gray-700 hover:underline">
                Men
              </motion.li>
              <motion.li className="mb-2 text-[14px] text-gray-700 hover:underline">
                Women
              </motion.li>
              <motion.li className="mb-2 text-[14px] text-gray-700 hover:underline">
                Collections
              </motion.li>
              <motion.li className="mb-2 text-[14px] text-gray-700 hover:underline">
                Accessories
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            className="p-4 flex flex-col md:w-[25%] w-full md:border-r-[1px] border-black md:border-b-0 border-b-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", bounce: 0.5, duration: 2 },
            }}
            viewport={{ once: true }}
          >
            <motion.h4
              className="font-bold mb-2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", bounce: 0.5, duration: 2 },
              }}
              viewport={{ once: true }}
            >
              Follow Us
            </motion.h4>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
            >
              <FaInstagram size={24} />
              <FaXTwitter size={24} />
              <FaPinterestP size={24} />
              <CiFacebook size={24} />
              <FaWhatsapp size={24} />
            </motion.div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            className="p-4 flex flex-col md:w-[25%] w-full"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", bounce: 0.5, duration: 2 },
            }}
            viewport={{ once: true }}
          >
            <motion.p
              className="font-bold mb-4"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", bounce: 0.5, duration: 2 },
              }}
              viewport={{ once: true }}
            >
              Get Discount off your Next Order
            </motion.p>
            <motion.form
              className="flex-col flex"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0.5,
                  duration: 2,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
            >
              <motion.input
                type="text"
                placeholder="Name"
                className="border-b-[1px] border-black py-2 mb-4 focus:outline-none bg-transparent text-black"
              />
              <motion.input
                type="email"
                placeholder="Email Address"
                className="border-b-[1px] border-black py-2 mb-4 focus:outline-none bg-transparent text-black"
              />
              <motion.button
                type="submit"
                className="bg-black text-white py-2 px-4 mt-2"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Paystack Image Section */}
        <motion.div
          className="w-full flex my-4"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { type: "spring", bounce: 0.5, duration: 2 },
          }}
          viewport={{ once: true }}
        >
          <img src={paystackImg} alt="Paystack Logo" className="h-12" />
        </motion.div>

        <div className=" py-4 text-gray-700 text-sm">
          &copy; 2024 Your Company. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
