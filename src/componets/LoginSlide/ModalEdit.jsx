import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { TfiClose } from "react-icons/tfi";
import { MdOutlineDone } from "react-icons/md";
import { useAuth } from "../../ContextAuth/ContextAuth";
import axios from "axios";

const ModalEdit = () => {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //// FUNCTION TO UPDATE PROFILE ////

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Call API to update user information
    axios
      .put("https://ftl-server.onrender.com/api//auth/profile", {
        fullName,
        email,
        password,
      })
      .then((response) => {
        const updatedUserData = { fullName, email };

        // Update user in context after successful update
        login(response.data.token, updatedUserData);
        closeModal();
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  };

  ///TO CLOSE MODAL ////
  const closeEditModal = () => {
    const modal = document.getElementById("my_modal_3"); // Get the modal element
    modal.close(); // Close the modal
  };

  return (
    <dialog id="my_modal_3" className="modal rounded shadow ">
      <div className=" p-4 ">
        <h3 className="font-bold text-lg my-2">Edit Profile</h3>

        <form className="flex flex-col w-full" onSubmit={handleUpdateProfile}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="grow"
              name="email"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              name="fullName"
              placeholder="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="flex flex-row mt-6   justify-between">
            <button className="bg-blue-600 text-white py-2 px-4 flex items-center rounded">
              Submit {/* <MdOutlineDone className="font-bold text-[20px]" /> */}
            </button>
            <button
              type="button"
              onClick={closeEditModal}
              className="bg-black text-white py-2 px-4 flex items-center rounded"
            >
              {" "}
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalEdit;
