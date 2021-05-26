import React from 'react'
import { connect } from 'react-redux'
import {AlertActions} from "../../store";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const SuccessSnackbar = ({ open, message, clear }) => {
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
            <Alert onClose={clear} severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
};

const mapStateToProps = ({ alerts }) => ({
    open: alerts.successOpen,
    message: alerts.successMessage,
});

const mapDispatchToProps = dispatch => {
    const { clearSuccess } = AlertActions;

    return {
        dispatch,
        clear: () => dispatch(clearSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessSnackbar);
