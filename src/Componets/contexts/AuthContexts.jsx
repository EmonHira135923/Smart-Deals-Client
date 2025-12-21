import React from "react";
import AuthProvider from "./Provider";

const AuthContexts = ({ children }) => {
  const setup = {
    name: "hello setup from authcontexts",
  };
  const authinfo = {
    setup,
  };
  return <AuthProvider value={authinfo}>{children}</AuthProvider>;
};

export default AuthContexts;
