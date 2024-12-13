import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { PiArrowBendUpLeftThin } from "react-icons/pi";

const Accordion = () => {
  // State to manage which section is open
  const [openSection, setOpenSection] = useState(1);

  // Toggle the visibility of a section
  const toggleSection = (sectionNumber) => {
    setOpenSection(openSection === sectionNumber ? null : sectionNumber);
  };

  return (
    <div id="accordion-open" data-accordion="open">
      {/* Police Section */}
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border-b-0 border-gray-200 rounded-t-xl focus:ring-4  dark:border-gray-700  gap-3"
          onClick={() => toggleSection(1)}
          aria-expanded={openSection === 1}
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">
            <PiArrowBendUpLeftThin className="w-5 h-5 me-2" />
            Policy
          </span>
          <IoAddOutline
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ${
              openSection === 1 ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        id="accordion-open-body-1"
        className={`transition-all duration-500 ${
          openSection === 1 ? "" : "hidden"
        }`}
        aria-labelledby="accordion-open-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 ">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Information regarding police services, regulations, and support for
            law enforcement.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Learn more about police services and community engagement programs
            that improve safety.
          </p>
        </div>
      </div>

      {/* Delivery Time Section */}
      <h2 id="accordion-open-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          onClick={() => toggleSection(2)}
          aria-expanded={openSection === 2}
          aria-controls="accordion-open-body-2"
        >
          <span className="flex items-center">
            <TbTruckDelivery className="w-5 h-5 me-2" />
            Delivery Time
          </span>
          <IoAddOutline
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ${
              openSection === 2 ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        id="accordion-open-body-2"
        className={`transition-all duration-500 ${
          openSection === 2 ? "" : "hidden"
        }`}
        aria-labelledby="accordion-open-heading-2"
      >
        <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Delivery times for various services and products, ensuring timely
            arrival.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Find out more about our reliable delivery service, timelines, and
            tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
