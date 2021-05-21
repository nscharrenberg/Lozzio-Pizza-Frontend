import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {OrderActions} from "../../store";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

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
    }
}));

export const Order = ({ order, cancel }) => {
    const classes = useStyles();

    return (
        <Paper>
            {
                order !== undefined ? (<Grid className={classes.container} container spacing={3}>
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
                                        Expected Delivery {moment(order.delivery_time).fromNow()}
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
                </Grid>) : null
            }
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
