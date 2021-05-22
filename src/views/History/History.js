import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {OrderActions, PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EcoIcon from '@material-ui/icons/Eco';
import { green } from '@material-ui/core/colors';
import Chip from "@material-ui/core/Chip";
import ShoppingCart from "../../components/checkout/ShoppingCart";
import PizzaOverview from "../../components/pizzas/Overview";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    pagination: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    media: {
        height: 140,
    },
    veggy: {
        marginLeft: "auto",
    },
    toppings: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    toppingHeader: {
        marginBottom: theme.spacing(1),
    },
    shoppingCart: {
        marginBottom: theme.spacing(2),
    }
}));

const History = ({ getPizzas, pizzas, addToCard, pizzasInCard }) => {
    useEffect(() => {
        getPizzas();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={"h5"}>
                Pizzas geki
            </Typography>

            <div className={classes.content} >
                <PizzaOverview/>
            </div>
        </div>
    );
};

const mapStateToProps = ({ pizzas, orders }) => ({
    pizzas: pizzas.pizzas,
    loading: pizzas.loading,
    pizzasInCard: orders.pizzasInCard,
});

const mapDispatchToProps = dispatch => {
    const { getPizzas } = PizzaActions;
    const { addToCard } = OrderActions;

    return {
        dispatch,
        getPizzas: () => dispatch(getPizzas()),
        addToCard: (pizza) => dispatch(addToCard(pizza))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
