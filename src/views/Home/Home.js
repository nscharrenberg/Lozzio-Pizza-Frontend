import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from "@material-ui/core/IconButton";
import EcoIcon from '@material-ui/icons/Eco';
import { green } from '@material-ui/core/colors';
import Chip from "@material-ui/core/Chip";

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
    }
}));

const Home = ({ getPizzas, pizzas }) => {
    useEffect(() => {
        getPizzas();
    }, []);

    const classes = useStyles();

    const isVegetarion = (isVeggy) => {
        return isVeggy ? (<IconButton
            className={classes.veggy}
            aria-label="Vegetarion"
        >
            <EcoIcon style={{ color: green[500] }} />
        </IconButton>) : null;
    };

    const getToppings = (toppings) => {
      return toppings && toppings.map(topping => <Chip className={classes.toppings} color="secondary" size="small" label={topping} />)
    };

    return (
        <div className={classes.root}>
            <Typography variant={"h5"}>
                Pizzas
            </Typography>

            <div className={classes.content}>
                <Grid container spacing={3}>
                    {
                        pizzas && pizzas.map(pizza => (
                            <Grid item key={pizza.pizza_id} lg={2} md={3} xs={6}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia className={classes.media}
                                                   image={"https://www.protislank.nl/slank/wp-content/uploads/2020/09/Proteinerijke-pizza-margarita-1-500x375.png"}
                                                   title={pizza.name} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {pizza.name}
                                            </Typography>
                                            <Typography className={classes.toppingHeader} variant="body2" color="textSecondary" component="h6">
                                                Toppings
                                            </Typography>
                                            {getToppings(pizza.toppings)}
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions disableSpacing>
                                        <IconButton color="primary"  aria-label="add to shopping card">
                                            <AddShoppingCartIcon />
                                        </IconButton>

                                        <Typography gutterBottom variant="h6" component="h6">
                                           &euro;{pizza.price}
                                        </Typography>

                                        {isVegetarion(pizza.vegetarian)}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );
};

const mapStateToProps = ({ pizzas }) => ({
    pizzas: pizzas.pizzas,
    loading: pizzas.loading
});

const mapDispatchToProps = dispatch => {
    const { getPizzas } = PizzaActions;

    return {
        dispatch,
        getPizzas: () => dispatch(getPizzas())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
