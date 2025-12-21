import React from "react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { NavLink } from "react-router";
const Footer = () => {
  return (
    <footer className="max-w-[1400px] mx-auto bg-[#001931] p-6 md:p-12 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl bg-clip-text bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-transparent font-bold">
            HERO.IO
          </span>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="mb-2 md:mb-3 text-center text-lg md:text-xl font-bold md:text-right">
            Social Icon
          </p>
          <div className="flex gap-4 mt-2">
            <NavLink to={`https://x.com/hira_bd`} target="_blank">
              <Twitter className="hover:text-purple-600 " />
            </NavLink>
            <NavLink to={`https://www.facebook.com/Emon1359`} target="_blank">
              <Facebook className="hover:text-purple-600 " />
            </NavLink>
            <NavLink
              to={`https://www.linkedin.com/in/emon135923/`}
              target="_blank"
            >
              <Linkedin className="hover:text-purple-600 " />
            </NavLink>
          </div>
        </div>
      </div>
      <hr className="mt-5 text-gray-500" />
      <div className="mt-6 md:mt-10 flex items-center justify-center text-sm md:text-xl">
        <p>Copyright © 2025 - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
