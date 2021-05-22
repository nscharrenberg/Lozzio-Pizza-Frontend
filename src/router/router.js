import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from "./";
import History from "../views/History/History";
import Home from "../views/Home/Home";
import Checkout from "../views/Order/Checkout";
import SearchOrder from "../views/Order/SearchOrder";
import GetOrder from "../views/Order/GetOrder";
import ChangeApi from "../views/Api/ChangeApi";

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
                   component={GetOrder}/>
            <Route path={routes.orderPath}
                   exact component={SearchOrder}/>
            <Route path={routes.apiPath}
                   exact component={ChangeApi}/>

        </Switch>
    );
};

export default Router;
