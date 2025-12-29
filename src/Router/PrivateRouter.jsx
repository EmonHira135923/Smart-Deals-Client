import React from "react";
import useAuth from "../Componets/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Loading state
  if (loading) {
    return <span className="loading loading-ball loading-xl"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default PrivateRouter;
