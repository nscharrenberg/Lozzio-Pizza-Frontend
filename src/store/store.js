import {applyMiddleware, combineReducers, createStore} from "redux";
import {Reducer as pizzas} from "./pizzas";
import {Reducer as orders} from './orders';
import {Reducer as alerts} from './alerts';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
    combineReducers({
        pizzas,
        orders,
        alerts,
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
