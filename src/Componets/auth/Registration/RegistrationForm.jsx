import React, { useState } from "react";
import Navvar from "../../Shared/Navvar";
import { NavLink } from "react-router";

const RegistrationForm = () => {
  const [showpassword, setShowpassword] = useState(false);
  return (
    <div>
      <Navvar />
      <div>
        <h1>Register</h1>
        <h6>
          Don't have an account?{" "}
          <NavLink to="/login" className="text-[#632ee3] text-xl">
            Login
          </NavLink>
        </h6>
      </div>
      <div>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="text" name="" id="" />
        <input
          type="password"
          name=""
          id=""
          placeholder="enter your password"
        />
        <button type="submit">Register</button>
      </div>
    </div>
  );
};

export default RegistrationForm;
