import React from "react";
import { NavLink } from "react-router";

const RecentProduct = () => {
  return (
    <div>
      <div>
        <h1>Recent Product</h1>
      </div>
      <div>
        {/* Details Here. */}
        <div>
          <div>
            <img src="" alt="" />
            <h1>title</h1>
            <p>price</p>
            <button>View Details</button>
          </div>
        </div>
        <NavLink to="/all-product">Show All</NavLink>
      </div>
    </div>
  );
};

export default RecentProduct;
