import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="bg-slate-200 ">
        <div className="flex justify-between max-w-6xl items-center p-3 mx-auto">
          <NavLink to="/">
            <h1 className="font-bold text-xl">Auth</h1>
          </NavLink>
          <ul className="flex gap-6 text-[17px]">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
            <NavLink to="/signin">
              <li>Sign In</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
