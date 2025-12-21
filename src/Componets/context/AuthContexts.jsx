import React from "react";
import { Provider } from "./Provider";

const AuthContexts = ({ children }) => {
  const user = {
    name: "Emon",
  };

  const authinfo = {
    user,
  };
  return <Provider value={authinfo}>{children}</Provider>;
};

export default AuthContexts;
