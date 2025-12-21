import React, { useState } from "react";
import { Menu, X, Github, House } from "lucide-react";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const Navvar = () => {
  const { user } = useAuth();
  console.log(user, "Form Navvar");
  const activeclass =
    "border-b-2 border-[#632ee3] bg-clip-text bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-purple-700 font-bold";
  const [toggle, settoggle] = useState(true);

  // Dynamic Nav items
  const navItems = [{ name: "Home", path: "/", icon: <House /> }];

  return (
    <nav className="p-5 bg-gray-50 shadow-md ">
      <div className="flex justify-between gap-5 items-center mt-3 text-xl font-bold ">
        {/* Start: Logo and Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <div className="md:hidden flex">
            <button onClick={() => settoggle(!toggle)}>
              {toggle ? <Menu /> : <X />}
            </button>
          </div>
          <NavLink className="flex gap-2 items-center" to="/">
            <img
              src=""
              alt="Hero-Icon"
              className="md:w-15 md:h-15 object-cover w-7 h-7"
            />
            <span className="md:text-2xl bg-clip-text bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-transparent">
              HERO.IO
            </span>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div
          className={`flex flex-col md:hidden mt-1 ml-1 absolute bg-gray-300 font-light text-xl p-5 rounded-xl transition-all duration-300 ${
            toggle ? "-top-80" : "top-22 -left-0 space-y-3"
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => (isActive ? activeclass : "")}
            >
              <span className="flex gap-1 items-center">
                {item.icon}
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Menu */}
        <div className="md:flex items-center gap-5 hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => (isActive ? activeclass : "")}
            >
              <span className="flex gap-1 justify-center items-center">
                {item.icon}
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* GitHub Button */}
        <div className="flex">
          <button className="btn text-white bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-xl py-6 px-5 md:p-7 md:w-40 hover:from-[#4b1fe0] hover:to-[#4b1fe0] ">
            <NavLink
              target="_blank"
              className="flex items-center gap-2"
              to="https://github.com/EmonHira135923"
            >
              <Github /> Contribute
            </NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navvar;
