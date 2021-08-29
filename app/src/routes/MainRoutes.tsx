import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router";
import GreenSweater from "../pages/GreenSweater";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import UserSettingsPage from "../pages/UserSettingsPage";

interface MainRoutesProps { };

const MainRoutes: FunctionComponent<MainRoutesProps> = () => (
    <Switch>
        {/* routes */}

        {/* main */}
        <Route path="/greensweater" component={GreenSweater} />
        <Route path="/settings/user/:username" component={UserSettingsPage} />


        {/* login / signup */}
        <Route path="/login" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />

        {/* other routes */}
        <Route path="/home" component={HomePage} />

        {/* redirects */}
        <Redirect to="/home" />
    </Switch>
);

export default MainRoutes;
