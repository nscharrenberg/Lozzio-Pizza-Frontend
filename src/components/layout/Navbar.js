import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import routes from "../../router/routes";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Navbar = ({loading, pizzasInCard}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <LocalPizzaIcon className={classes.icon} />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Lozzio Pizza
                    </Typography>

                    <Button component={Link} to={routes.menuPath} color="inherit">Menu</Button>
                    <Button component={Link} to={routes.historyPath} color="inherit">Order History</Button>
                    <IconButton component={Link} to={routes.checkoutPath} color="inherit" aria-label="cart">
                        <Badge badgeContent={pizzasInCard.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
};

const mapStateToProps = ({ pizzas, orders }) => ({
   loading: pizzas.loading,
   pizzasInCard: orders.pizzasInCard,
});

export default connect(mapStateToProps)(Navbar);
