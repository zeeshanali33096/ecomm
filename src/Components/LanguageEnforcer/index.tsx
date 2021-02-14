import React from "react";
import { Redirect, Route, RouteProps, RouterProps } from "react-router-dom";
import { LanguageContext } from "../LanguageProvider";

const LanguageEnforcedRoute = ({ children, ...rest }: RouteProps) => {
  const currentLanguage = React.useContext(LanguageContext);
  console.log({ currentLanguage });
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentLanguage.id > -1 ? children : <Redirect to="/" />
      }
    />
  );
};

export default LanguageEnforcedRoute;
