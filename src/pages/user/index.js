import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoadingIndicator from "../../components/loading-indicator";

const ProfilePage = React.lazy(() => import(/* webpackChunkName: "Profile" */ './profile'));
const EditProfilePage = React.lazy(() => import(/* webpackChunkName: "EditProfile" */ './edit-profile'));

export default function AuthRoutes({match}) {
  return (
    <Suspense fallback={<LoadingIndicator/>}>
      <Switch>
        <Route exact path={`${match.path}/profile`} component={ProfilePage}/>
        <Route exact path={`${match.path}/edit-profile`} component={EditProfilePage}/>
        <Redirect exact from={`${match.path}`} to={`${match.path}/profile`}/>
      </Switch>
    </Suspense>
  )
}
