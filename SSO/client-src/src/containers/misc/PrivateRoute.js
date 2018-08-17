import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, isAuthenticated, isExpired, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (
        isExpired ? (<Redirect
            to={{
              pathname: "/expired",
              state: { from: props.location, loginUrl: props.loginUrl, logoutUrl: props.logoutUrl }
            }}
          />) : 
        isAuthenticated
        ? <Component {...props} />
        : (<Redirect
            to={{
              pathname: "/",
              state: { from: props.location, loginUrl: props.loginUrl, logoutUrl: props.logoutUrl }
            }}
          />))}
  />
);

export default PrivateRoute;
