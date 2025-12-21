import React from "react";
import AuthProvider from "../contexts/Provider";

const useAuth = () => {
  const authinfo = AuthProvider();
  return authinfo;
};

export default useAuth;
