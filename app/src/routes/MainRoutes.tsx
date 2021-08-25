import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router";
import GreenSweater from "../pages/GreenSweater";
import HomePage from "../pages/HomePage";

interface MainRoutesProps { };

const MainRoutes: FunctionComponent<MainRoutesProps> = () => (
    <Switch>
        {/* routes */}
        <Route path="/greensweater" component={GreenSweater} />
        {/* other routes */}
        <Route path="/home" component={HomePage} />

        {/* redirects */}
        <Redirect to="/home" />
    </Switch>
);

export default MainRoutes;
