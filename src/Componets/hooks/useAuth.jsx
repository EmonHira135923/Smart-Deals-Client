import React, { use } from "react";
import { Provider } from "../context/Provider";
const useAuth = () => {
  const authinfo = use(Provider);
  return authinfo;
};

export default useAuth;
