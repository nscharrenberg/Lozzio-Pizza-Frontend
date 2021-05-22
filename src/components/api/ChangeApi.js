import React from 'react';
import {  useHistory } from 'react-router-dom';
import Fab from "@material-ui/core/Fab";
import HttpIcon from '@material-ui/icons/Http';
import {makeStyles} from "@material-ui/core/styles";
import routes from "../../router/routes";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(4),
    },
}));

const ChangeApi = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Fab aria-label={"Change Api"} color="primary" className={classes.fab} onClick={() => {
            history.push(routes.apiPath);
        }}>
            <HttpIcon/>
        </Fab>
    );
};

export default ChangeApi;
