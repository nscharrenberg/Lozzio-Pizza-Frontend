import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {OrderActions, PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import ShoppingCart from "../../components/checkout/ShoppingCart";
import PizzaOverview from "../../components/pizzas/Overview";
import Container from "@material-ui/core/Container";

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

const Home = ({ getPizzas }) => {
    useEffect(() => {
        getPizzas();
    }, []);

    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant={"h5"}>
                Pizzas
            </Typography>

            <div className={classes.content} >
                <PizzaOverview/>
            </div>
        </Container>
    );
};

const mapStateToProps = ({ pizzas, orders }) => ({
    pizzas: pizzas.pizzas,
    loading: pizzas.loading,
    pizzasInCard: orders.pizzasInCard,
    order: orders.order,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
