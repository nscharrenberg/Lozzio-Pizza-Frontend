import React from 'react';
import { Switch, Route } from 'react-router-dom';
import History from "../views/History/History";
import { routes } from './';
import Home from "../views/Home/Home";

const Router = () => {
    return (
        <Switch>
            <Route path={routes.menuPath}
                   exact
                   render={() => (<Home/>)} />
            <Route path={routes.historyPath}
                   exact
                   render={() => (<History/>)} />
        </Switch>
    );
};

export default Router;
