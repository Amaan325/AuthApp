import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-2xl text-center my-3">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-[15px] text-white uppercase p-2 rounded-lg hover:bg-slate-800 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 items-center  my-3">
        <p className="text-[15px] max-2-">Have an account?</p>
        <NavLink to="/signin">
          <span className="text-[15px] text-blue-500 cursor-pointer">
            Sign In
          </span>
        </NavLink>
      </div>
      <p className="text-red-500 text-[16px] ">
        {error && "Something went wrong!!!"}
      </p>
    </div>
  );
};

export default SignUp;
