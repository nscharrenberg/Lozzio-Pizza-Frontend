import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, useHistory } from 'react-router-dom';
import Navbar from "../components/layout/Navbar";
import Router from "../router/router";
import Alerts from "../components/alerts/Alerts";
import ChangeApi from "../components/api/ChangeApi";



const App = () => (
    <BrowserRouter>
        <CssBaseline/>
        <div className="app">
            <Navbar/>
            <Router/>
            <Alerts/>
            <ChangeApi/>
        </div>

    </BrowserRouter>
)

export default App;
