import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {OrderActions, PizzaActions} from "../../store";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EcoIcon from "@material-ui/icons/Eco";
import {green} from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
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
    },
    backdrop: {
        color: '#fff',
        position: "absolute",
        zIndex: theme.zIndex.drawer - 1,
        opacity: 0.5,
    },
    loading: {
        marginLeft: theme.spacing(4),
    }
}));

export const Overview = ({ getPizzas, pizzas, addToCard, loading }) => {
    useEffect(() => {
        getPizzas();
    }, [getPizzas]);

    const classes = useStyles();

    const isVegetarion = (isVeggy) => {
        return isVeggy ? (<IconButton
            className={classes.veggy}
            aria-label="Vegetarion"
        >
            <EcoIcon style={{ color: green[500] }} />
        </IconButton>) : null;
    };

    const getToppings = (toppings, index) => {
        return toppings && toppings.map((topping, i) => <Chip key={"topping-keys-" + index + "-" + i} className={classes.toppings} color="secondary" size="small" label={topping} />)
    };

    return (
        <div style={{
            position: "relative" //don't forget this
        }}>
            <div>
                <Grid container spacing={3}>
                    {
                        pizzas && pizzas.map((pizza, index) => (
                            <Grid item key={"pizza-grid-" + index} lg={3} md={6} xs={12}>
                                <Card key={"pizza-card-" + index}>
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
                                            {getToppings(pizza.toppings, index)}
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions disableSpacing>
                                        <IconButton color="primary"  aria-label="add to shopping card" onClick={() => addToCard(pizza)}>
                                            <AddShoppingCartIcon />
                                        </IconButton>

                                        <Typography gutterBottom>
                                            &euro;{pizza.price.toFixed(2)}
                                        </Typography>

                                        {isVegetarion(pizza.vegetarian)}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
