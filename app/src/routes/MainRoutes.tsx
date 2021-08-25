import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router";
import GreenSweater from "../pages/GreenSweater";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

interface MainRoutesProps { };

const MainRoutes: FunctionComponent<MainRoutesProps> = () => (
    <Switch>
        {/* routes */}

        {/* main */}
        <Route path="/greensweater" component={GreenSweater} />

        {/* login / signup */}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />

        {/* other routes */}
        <Route path="/home" component={HomePage} />

        {/* redirects */}
        <Redirect to="/home" />
    </Switch>
);

export default MainRoutes;
