import React from "react";
import { Route, Navigate } from "react-router-dom";

// ...rest = berisikan path & exact
const PrivateRoute = ({ component: Component, socket, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest} // path = "...." exact
      render={(props) =>
        // <Component {...props} /> = <BasicHome />
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
