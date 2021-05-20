import React from 'react';
import { Switch, Route } from 'react-router-dom';
import History from "../views/History/History";
import Home from "../views/Home/Home";
import { routes } from "./";
import Checkout from "../views/Order/Checkout";

const Router = () => {
    return (
        <Switch>
            <Route path={routes.menuPath}
                   exact component={Home} />

            <Route path={routes.historyPath}
                   exact component={History} />

            <Route path={routes.checkoutPath}
                   exact component={Checkout} />
        </Switch>
    );
};

export default Router;
