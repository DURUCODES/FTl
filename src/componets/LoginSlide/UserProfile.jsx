import React, { useState } from "react";
import { useAuth } from "../../ContextAuth/ContextAuth"; // Importing context to access user data and token
import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AiOutlineHistory } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { useNavigate } from "react-router";
import { IoLogoWhatsapp } from "react-icons/io";

const UserProfile = ({ handleLoginClose }) => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    password: "", // You can use this to handle password change
  });

  // Handle logout
  const handleLogout = () => {
    logout(); // Log out the user and clear session data
  };

  // Handle Order History
  const historyOpen = () => {
    navigate("/order-history");
    handleLoginClose(false);
  };

  // Handle Send Message to WhatsApp
  const handleSendMessage = () => {
    const phoneNumber = "2347010725792"; // User's phone number
    const message = `Hello, I need assistance regarding my profile.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // Handle Edit Profile (Open Modal)
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming updateUserProfile is a function that updates the user's profile
    updateUserProfile(formData)
      .then(() => {
        setIsModalOpen(false);
        // Optionally, show a success message or reload user data
      })
      .catch((error) => {
        console.error("Error updating profile", error);
      });
  };

  return (
    <div>
      {/* Profile Information */}
      <div className="my-4 max-w-sm overflow-hidden text-black ">
        <div className="bg-white px-2 pt-2 border-b ">
          {/* Profile Picture */}
          <div className="relative w-[50px] h-[50px] rounded-full text-center bg-black flex items-center justify-center">
            <span className="text-white text-[30px] font-bold">
              {user?.fullName[0]}{" "}
              {/* Display first letter of user's full name */}
            </span>
          </div>

          {/* User Name and Email */}
          <h1 className="mt-2 text-xl font-bold text-gray-900">
            {user?.fullName} {/* Display full name */}
          </h1>
          <h3 className="font-lg text-semibold mb-2 text-gray-600">
            {user?.email} {/* Display user's email */}
          </h3>
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <div className="grid grid-cols-2 gap-4">
          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            <span className="text-[25px]">
              <CiEdit />
            </span>
            <p className="mt-2">Edit Profile</p>
          </button>

          {/* Order History Button */}
          <button
            onClick={historyOpen}
            className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            <span className="text-[25px]">
              <AiOutlineHistory />
            </span>
            <p className="mt-2">Order History</p>
          </button>

          {/* Send Message Button */}
          <button
            onClick={handleSendMessage}
            className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            <span className="text-[25px]">
              <BsSend />
            </span>
            <p className="mt-2">Send Message</p>
          </button>

          {/* Log out Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            <span className="text-[25px] text-red-600">
              <CiLogout />
            </span>
            <p className="mt-2">Log out</p>
          </button>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4  rounded-lg w-full md:w-[380px]">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
