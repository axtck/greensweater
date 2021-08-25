import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router";
import GreenSweater from "../pages/GreenSweater";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserSettings from "../pages/UserSettings";

interface MainRoutesProps { };

const MainRoutes: FunctionComponent<MainRoutesProps> = () => (
    <Switch>
        {/* routes */}

        {/* main */}
        <Route path="/greensweater" component={GreenSweater} />
        <Route path="/settings/user/:userName" component={UserSettings} />


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
