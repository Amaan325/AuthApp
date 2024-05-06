import React from "react";
import {NavLink} from "react-router-dom"

const SignUp = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl text-center my-3">SignUp</h1>
      <form className="flex flex-col gap-3 max-w-lg mx-auto">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
        ></input>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
        ></input>
        <button className="bg-slate-700 text-[15px] text-white uppercase p-2 rounded-lg hover:bg-slate-800">
          Signup
        </button>
      </form>
      <div className="flex gap-1 max-w-lg mx-auto my-3">
        <p className="text-[15px] max-2-">Have an account?</p>
        <NavLink to="/signin">
        <span className="text-[15px] text-blue-500 cursor-pointer">Sign In</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
