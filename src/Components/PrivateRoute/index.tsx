import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const { user } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: location.pathname } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
