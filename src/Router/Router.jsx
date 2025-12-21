import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Login from "../Pages/auth/Login.jsx";
import Registration from "../Pages/auth/Registration.jsx";
import Home from "../Pages/Home.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/reg",
    Component: Registration,
  },
]);

export default Router;
