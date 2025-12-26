import React from "react";
import { auth } from "../utils/Firebase.init";

const Createproduct = () => {
  const handleformcreateproduct = (e) => {
    e.preventDefault();
  };
  console.log(auth);
  return (
    <div>
      <form onSubmit={handleformcreateproduct}>
        <label htmlFor="">title</label>
        <input type="text" name="" id="" />
      </form>
    </div>
  );
};

export default Createproduct;
