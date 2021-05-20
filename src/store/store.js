import {applyMiddleware, combineReducers, createStore} from "redux";
import {Reducer as pizzas} from "./pizzas";
import {Reducer as orders} from './orders';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
    combineReducers({
        pizzas,
        orders,
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
