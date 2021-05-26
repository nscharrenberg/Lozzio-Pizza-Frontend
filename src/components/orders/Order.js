import React from 'react'
import { connect } from 'react-redux'
import {OrderActions} from "../../store";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    backdrop: {
        color: '#fff',
        position: "absolute",
        zIndex: theme.zIndex.drawer - 1,
        opacity: 0.5,
    },
    loading: {
        marginLeft: theme.spacing(4),
    },
    delivery: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2)
    },
    cancel: {
        marginLeft: theme.spacing(1)
    }
}));

export const Order = ({ order, cancel }) => {
    const classes = useStyles();

    return (
        <Paper>
            <div>
            {
                order !== undefined ? (
                    <div>
                        <Grid className={classes.container} container spacing={3}>
                            <Grid item lg={12}>
                                <Typography variant="h5">
                                    Order Details
                                </Typography>
                            </Grid>
                            <Grid item lg={6}>
                                <Grid container>
                                    <Grid item lg={12}>
                                        <Typography variant="h6">
                                            Personal Details
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Name: John Doe
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Customer: {order.customer_id}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Street: {order.delivery_address.street}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Street: {order.delivery_address.zipcode}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            City: {order.delivery_address.city}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Country: {order.delivery_address.country}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={6}>
                                <Grid container>
                                    <Grid item lg={12}>
                                        <Typography variant="h6">
                                            Delivery Details
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Paymenty Type: {order.payment_type}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="p">
                                            Takeaway: {order.takeaway ? 'Yes' : 'No'}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <Typography variant="p">
                                            Ordered At: {order.ordered_at ? moment(order.ordered_at).format('MMMM Do YYYY HH:mm') : '-'}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={12}>
                                        {
                                            moment(order.delivery_time).isBefore(new Date().setHours(new Date().getHours() + 3)) ? (
                                                <Typography variant="p">
                                                    Expected Delivery <b>{moment(order.delivery_time).fromNow()}</b>
                                                </Typography>
                                            ) : (
                                                <Typography variant="p">
                                                    Delivery Time was at: {order.delivery_time ? moment(order.delivery_time).format('MMMM Do YYYY HH:mm') : '-'}
                                                </Typography>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.container}>
                            <Typography variant="h5" className={classes.container}>
                                Pizza's
                            </Typography>
                            <TableContainer component={Paper}>
                                <div>
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
                                            {order.pizzas.map((pizza, index) => (
                                                <TableRow key={"pizzas-" + index}>
                                                    <TableCell component="th" scope="row">
                                                        {pizza.name}
                                                    </TableCell>
                                                    <TableCell align="right">{pizza.vegetarian ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{pizza.price.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TableContainer>
                        </div>
                        <Grid container className={classes.delivery}>
                            <Grid item lg={12}>
                                <Typography variant="h6" align="center">
                                    Order ID: {order.order_id}
                                </Typography>
                            </Grid>
                            <Grid item lg={12}>
                                {
                                    moment(order.delivery_time).isAfter(moment().add(-3, 'hours')) ? (
                                        <Typography variant="h5" align="center">
                                            Expected Delivery <b>{moment(order.delivery_time).fromNow()}</b>
                                        </Typography>
                                    ) : (
                                        <Typography variant="h5"  align="center">
                                            Delivery Time was at: {order.delivery_time ? moment(order.delivery_time).format('MMMM Do YYYY HH:mm') : '-'}
                                        </Typography>
                                    )
                                }
                            </Grid>
                            <Grid item lg={12}>
                                <Typography variant="h6" align="center">
                                    Order Status: {order.status}
                                </Typography>
                            </Grid>
                            <Grid item lg={12}>
                                <Button className={classes.cancel} variant="contained" color="secondary" onClick={cancel}>
                                    Cancel Order
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                ) : null
            }
            </div>
            <Backdrop className={classes.backdrop} open={order === undefined} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Paper>
    )
};

const mapStateToProps = ({ orders }) => ({
    order: orders.selected
});

const mapDispatchToProps = dispatch => {
    const { cancelOrder } = OrderActions;

    return {
        dispatch,
        cancel: () => dispatch(cancelOrder()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
