import React from "react";
import {Redirect, Route} from "react-router-dom";
import Storage from "../utils/storage";

const UnAuthenticatedOnlyRoute = ({component: Component, authUser, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !Storage.getAuthUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user',
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default UnAuthenticatedOnlyRoute;
