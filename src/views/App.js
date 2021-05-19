import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SimpleBreadCrumbs from "../components/layout/SimpleBreadCrumbs";
import Router from "../router/router";


const App = () => (
    <BrowserRouter>
        <CssBaseline/>
        <div className="app">
            <Navbar/>
            <SimpleBreadCrumbs/>
            <Router/>
        </div>
    </BrowserRouter>
    );

export default App;
