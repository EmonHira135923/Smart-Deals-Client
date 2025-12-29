import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Login from "../Pages/auth/Login.jsx";
import Registration from "../Pages/auth/Registration.jsx";
import Home from "../Pages/Home.jsx";
import CreateProducts from "../Pages/CreateProducts.jsx";
import MyBids from "../Pages/MyBids.jsx";
import AllProducts from "../Pages/AllProducts.jsx";
import MyProducts from "../Pages/MyProducts.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import PrivateRouter from "./PrivateRouter.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "/all-product", Component: AllProducts },
      {
        path: "/my-product",
        element: (
          <PrivateRouter>
            <MyProducts />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRouter>
            <MyBids />
          </PrivateRouter>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRouter>
            <CreateProducts />
          </PrivateRouter>
        ),
      },
    ],
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
