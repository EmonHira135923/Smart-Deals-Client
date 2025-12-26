import React from "react";
import { NavLink } from "react-router";
import RecentProduct from "./RecentProduct";

const Banner = () => {
  return (
    <div>
      <div>
        <h1>
          Deal your <span className="text-purple-500">Products</span> in a{" "}
          <span className="text-purple-500">Smart</span> way !
        </h1>
        <p>
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>
        <div>
          <input
            type="search"
            name="search For Products, Categoriees..."
            id=""
          />
        </div>
        <div>
          <NavLink to={"/all-product"} className={"btn"}>
            Watch All Product
          </NavLink>
          <NavLink to={"/create-product"} className={"btn"}>
            Post An Product
          </NavLink>
        </div>
      </div>
      <RecentProduct />
    </div>
  );
};

export default Banner;
