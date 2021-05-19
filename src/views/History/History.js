import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import {
    Link as RouterLink,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

const History = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <LocalPizzaIcon className={classes.icon} />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Lozzio Pizza - Order History
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/" className={classes.button}>Menu</Button>
                    <Button variant="contained" color="secondary" component={RouterLink} to="/history" className={classes.button}>Order History</Button>
                    {/*<Button variant="contained" color="secondary" component={RouterLink} to="/checkout" className={classes.button}>Checkout</Button>*/}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default History;
