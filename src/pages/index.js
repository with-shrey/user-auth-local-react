import React from "react";
import {Redirect, Switch} from "react-router-dom";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import AuthenticatedRoute from "../components/authenticated-route";
import UnAuthenticatedOnlyRoute from "../components/unauthenticated-only-route";

export default function Pages() {
  return (
    <Switch>
      <UnAuthenticatedOnlyRoute path="/auth" component={AuthRoutes}/>
      <AuthenticatedRoute path="/user" component={UserRoutes}/>
      <Redirect exact from={'/'} to="/user"/>
    </Switch>
  )
}
