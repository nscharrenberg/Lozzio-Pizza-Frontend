import {applyMiddleware, combineReducers, createStore} from "redux";
import {Reducer as pizzas} from "./pizzas";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
    combineReducers({
        pizzas,
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
