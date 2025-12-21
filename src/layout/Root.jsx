import React from "react";
import Footer from "../Componets/Shared/Footer.jsx";
import { Outlet } from "react-router";
import Navvar from "../Componets/Shared/Navvar.jsx";

const Root = () => {
  return (
    <div>
      <Navvar />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
