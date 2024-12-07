import React from "react";

const EditProfile = () => {
  const edit = () => {
    e.preventDefault();
  };
  return (
    <div className="text-black">
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          edit(
            e.target.email.value,
            e.target.password.value,
            e.target.fullName.value
          );
        }}
      >
        <label className="font-bold text-[15px] font-mono my-2">Name</label>
        <input
          name="fullName"
          placeholder="Name"
          type="text"
          required
          className="py-2 bg-gray-50 outline-none md:w-[90%] px-4"
        />

        <label className="font-bold text-[15px] font-mono my-2">
          Email Address
        </label>
        <input
          name="email"
          placeholder="Email Address"
          type="email"
          required
          className="py-2 bg-gray-50 outline-none md:w-[90%] px-4"
        />

        <label className="font-bold text-[15px] font-mono my-2">Password</label>
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="py-2 bg-gray-50 outline-none md:w-[90%] px-4"
        />

        <button className="bg-blue-600 text-white p-4">Done</button>
      </form>
    </div>
  );
};

export default EditProfile;
