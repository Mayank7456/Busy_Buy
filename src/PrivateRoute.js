import React from "react";
import { Navigate } from "react-router-dom";
import { useValue } from "./contextAPI/context";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useValue();

  React.useEffect(() => {
    if (!userLoggedIn) {
      toast.warn("Please SignIn");
    }
  }, [userLoggedIn]);

  if (!userLoggedIn) {
    return <Navigate to="/Busy_Buy" />;
  }

  return children;
};

export default PrivateRoute;
