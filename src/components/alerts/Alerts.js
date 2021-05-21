import React from 'react';
import SuccessSnackbar from "./SuccessSnackbar";
import ErrorSnackbar from "./ErrorSnackbar";
import WarningSnackbar from "./WarningSnackbar";

const Alerts = () => (
    <React.Fragment>
        <SuccessSnackbar/>
        <ErrorSnackbar/>
        <WarningSnackbar/>
    </React.Fragment>
);

export default Alerts;
