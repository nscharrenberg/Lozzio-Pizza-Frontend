import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {AlertActions} from "../../store";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const ErrorSnackbar = ({ open, message, clear }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={() => clear()}
        >
            <Alert onClose={clear} severity="error">
                {message}
            </Alert>
        </Snackbar>
    )
};

const mapStateToProps = ({ alerts }) => ({
    open: alerts.errorOpen,
    message: alerts.errorMessage,
});

const mapDispatchToProps = dispatch => {
    const { clearError } = AlertActions;

    return {
        dispatch,
        clear: () => dispatch(clearError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
