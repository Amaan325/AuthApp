import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto max-w-lg ">
      <h1 className="font-semibold text-center text-3xl mt-9 my-4 ">Profile</h1>
      <form className="flex flex-col gap-2">
        <img
          className="w-20 h-20 rounded-full self-center mb-3 cursor-pointer"
          src={currentUser.profilePicture}
        ></img>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="text"
          name="username"
          placeholder="Username"
        ></input>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="email"
          name="email"
          placeholder="Email"
        ></input>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="password"
          name="password"
          placeholder="Password"
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase">Update</button>
      </form>
      <div className="mt-3 flex justify-between">
        <span className="text-red-600 font-normal">Delete Account</span>
        <span className="text-red-600 font-normal">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
