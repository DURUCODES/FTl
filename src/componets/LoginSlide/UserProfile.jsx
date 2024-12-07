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
      <div class="my-4 max-w-sm overflow-hidden text-black ">
        <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div class="relative mx-auto w-36 rounded-full">
            <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              class="mx-auto h-auto w-full rounded-full"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <h1 class="my-1 text-center text-xl font-bold  text-gray-900">
            {user?.fullName}
          </h1>
          <h3 class="font-lg text-semibold text-center my-2  text-gray-600">
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
      <div></div>
    </div>
  );
};

export default UserProfile;
