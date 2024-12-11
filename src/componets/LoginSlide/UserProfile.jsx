import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextAuth/ContextAuth"; // Importing context to access user data and token
import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AiOutlineHistory } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { useNavigate } from "react-router";

const UserProfile = ({ handleLoginClose }) => {
  /// handleLoginClose comes from the LoginSlide so not to Forget
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout(); // Log out the user and clear session data
  };

  //Handle to history
  const historyOpen = () => {
    navigate("/order-history");
    handleLoginClose(false);
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
          <button className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white">
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
          <button className="flex flex-col justify-center items-center border-black border-[1px] px-4 w-full bg-transparent text-black rounded py-4 text-center hover:bg-black hover:text-white active:bg-black active:text-white">
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
    </div>
  );
};

export default UserProfile;
