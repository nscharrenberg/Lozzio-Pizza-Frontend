import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "../components/layout/Navbar";
import Router from "../router/router";


const App = () => (
    <BrowserRouter>
        <CssBaseline/>
        <div className="app">
            <Navbar/>
        </div>
        <Router/>
    </BrowserRouter>
    );

export default App;
