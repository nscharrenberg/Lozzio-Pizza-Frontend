import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {AlertActions} from "../../store";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export const WarningSnackbar = ({ open, message, clear }) => {
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
            <Alert onClose={clear} severity="warning">
                {message}
            </Alert>
        </Snackbar>
    )
};

const mapStateToProps = ({ alerts }) => ({
    open: alerts.warningOpen,
    message: alerts.warningMessage,
});

const mapDispatchToProps = dispatch => {
    const { clearWarning } = AlertActions;

    return {
        dispatch,
        clear: () => dispatch(clearWarning()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WarningSnackbar);
