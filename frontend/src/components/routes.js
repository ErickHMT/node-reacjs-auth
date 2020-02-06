import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "./RouteWithLayout";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import ResetPassword from "../pages/Auth/ResetPassword";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <RouteWithLayout
          path="/login"
          exact
          component={Login}
          layout={AuthLayout}
        />
        <RouteWithLayout
          path="/signup"
          exact
          component={SignUp}
          layout={AuthLayout}
        />
        <RouteWithLayout
          path="/reset-password"
          exact
          component={ResetPassword}
          layout={AuthLayout}
        />
        <RouteWithLayout
          path="*"
          component={() => <h1>Page not found</h1>}
          layout={FeedLayout}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
