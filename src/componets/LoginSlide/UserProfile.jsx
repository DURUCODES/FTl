import React, { useState } from "react";
import { useAuth } from "../../ContextAuth/ContextAuth";
import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import ModalEdit from "./ModalEdit";

const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const openEditModal = () => {
    const modal = document.getElementById("my_modal_3"); // Get the modal element
    modal.showModal(); // Show the modal
  };

  return (
    <div>
      <div className="my-4 max-w-sm overflow-hidden text-black ">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          {/* Profile Picture */}
          <div className="relative mx-auto w-[100px] h-[100px] rounded-full text-center bg-black flex items-center justify-center">
            {/* Large Initial */}
            <span className="text-white text-[80px] font-bold">
              {user?.fullName[0]}
            </span>
          </div>

          {/* User Name */}
          <h1 className="my-1 text-center text-xl font-bold text-gray-900">
            {user?.fullName}
          </h1>
          <h3 className="font-lg text-semibold text-center my-2 text-gray-600">
            {user?.email}
          </h3>

          <div className="py-2 flex items-center justify-center space-x-4">
            <button
              onClick={openEditModal}
              className="bg-black hover:bg-gray-800 text-white p-2 rounded flex items-center"
            >
              Edit Pro...
              <CiEdit />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-800 text-white p-2 rounded flex items-center"
            >
              Log Out <CiLogout />
            </button>

            <ModalEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
