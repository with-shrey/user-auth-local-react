import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoadingIndicator from "../../components/loading-indicator";

const SignupPage = React.lazy(() => import(/* webpackChunkName: "Signup" */ './signup'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "Login" */ './login'));

export default function AuthRoutes({match}) {
  return (
    <Suspense fallback={<LoadingIndicator/>}>
      <Switch>
        <Route exact path={`${match.path}/signup`} component={SignupPage}/>
        <Route exact path={`${match.path}/login`} component={LoginPage}/>
        <Redirect exact from={`${match.path}`} to={`${match.path}/login`}/>
      </Switch>
    </Suspense>
  )
}
