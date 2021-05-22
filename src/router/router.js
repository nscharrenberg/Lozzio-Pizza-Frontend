import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from "./";
import History from "../views/History/History";
import Home from "../views/Home/Home";
import Checkout from "../views/Order/Checkout";
import FindOrder from "../views/Order/FindOrder";

const Router = () => {
    return (
        <Switch>
            <Route path={routes.menuPath}
                   exact component={Home} />

            <Route path={routes.historyPath}
                   exact component={History} />

            <Route path={routes.checkoutPath}
                   exact component={Checkout} />
            <Route path={routes.orderIdPath}
                   component={FindOrder}/>
            <Route path={routes.orderPath}
                   exact component={FindOrder}/>

        </Switch>
    );
};

export default Router;
