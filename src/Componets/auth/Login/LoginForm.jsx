import React, { useState } from "react";
import Navvar from "../../Shared/Navvar";
import { NavLink } from "react-router";

const LoginForm = () => {
  const [showpassword, setShowpassword] = useState(false);
  return (
    <div>
      <Navvar />
      <div>
        <h1>Login</h1>
        <h6>
          Don't have an account?{" "}
          <NavLink to="/reg" className="text-[#632ee3] text-xl">
            Register Now
          </NavLink>
        </h6>
      </div>
      <div>
        <input type="email" name="email" id="" />
        <input
          type="password"
          name=""
          id=""
          placeholder="enter your password"
        />
        <button type="submit">Log in</button>
      </div>
    </div>
  );
};

export default LoginForm;
