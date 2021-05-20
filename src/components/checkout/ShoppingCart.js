import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {OrderActions} from "../../store";
import TableFooter from '@material-ui/core/TableFooter';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    price: {
        marginTop: theme.spacing(1),
        width: "100%",
    },
}));

export const ShoppingCart = ({pizzasInCard, removeFromCard, addToCard}) => {
    const classes = useStyles();

    const groupBy = keys => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = keys.map(key => obj[key]).join('-');
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    const groupByPizzaId = groupBy(['pizza_id']);

    const calculatePrice = () => {
      let total = 0;

      pizzasInCard.forEach(pizza => {
          total += pizza.price;
      });

      return total.toFixed(2);
    };

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Vegetarian</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(groupByPizzaId(pizzasInCard)).map((entry, index) => (
                            <TableRow key={"checkout-pizzas-" + entry[0]}>
                                <TableCell component="th" scope="row">
                                    {entry[1][0].name}
                                </TableCell>
                                <TableCell align="right">{entry[1][0].vegetarian ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{entry[1][0].price.toFixed(2)}</TableCell>
                                <TableCell align="right">{entry[1].length}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary"  aria-label="Add to Cart" onClick={() => addToCard(entry[1][0])}>
                                        <AddCircleIcon />
                                    </IconButton>
                                    <IconButton color="secondary"  aria-label="Remove from Cart" onClick={() => removeFromCard(entry[1][0])}>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant={"h6"} align="right" className={classes.price}>
                Price: {calculatePrice()}
            </Typography>
        </div>
    )
};

const mapStateToProps = ({ pizzas, orders }) => ({
    loading: pizzas.loading,
    pizzasInCard: orders.pizzasInCard,
});

const mapDispatchToProps = dispatch => {
    const { addToCard, removeFromCard } = OrderActions;

    return {
        dispatch,
        addToCard: (pizza) => dispatch(addToCard(pizza)),
        removeFromCard: (pizza) => dispatch(removeFromCard(pizza)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
