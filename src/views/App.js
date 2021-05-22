import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../components/layout/Navbar";
import Router from "../router/router";
import Alerts from "../components/alerts/Alerts";


const App = () => (
    <BrowserRouter>
        <CssBaseline/>
        <div className="app">
            <Navbar/>
            <Router/>
            <Alerts/>
        </div>

    </BrowserRouter>
    );

export default App;
