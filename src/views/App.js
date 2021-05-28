import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../components/layout/Navbar";
import Router from "../router/router";
import Alerts from "../components/alerts/Alerts";
import ChangeApi from "../components/api/ChangeApi";
import ErrorBoundary from "../utils/ErrorBoundary";



const App = () => (
    <BrowserRouter>
        <CssBaseline/>
            <div className="app">
                <Navbar/>
                <ErrorBoundary>
                <Router/>
                <Alerts/>
                </ErrorBoundary>
                <ChangeApi/>
            </div>
    </BrowserRouter>
)

export default App;
