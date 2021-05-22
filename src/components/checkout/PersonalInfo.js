import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {OrderActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    form: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    root: {
        marginTop: theme.spacing(1),
    }
}));

export const PersonalInfo = ({updateOrder, order}) => {
    const classes = useStyles();

    const updateForm = (key, value) => {
        updateOrder({
          ...order,
          [key]: value,
      });
    };

    const updateAddress = (key, value) => {
      updateForm('delivery_address', {
          ...order.delivery_address,
          [key]: value,
      });
    };

    return (
        <Paper className={classes.root}>
            <div>
                <form className={classes.form} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item lg={12}>
                            <Typography variant={"h6"}>
                                Personal Information
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth disabled id="first_name" label="First Name" defaultValue="John" />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth disabled id="last_name" label="Last Name" defaultValue="Doe" />
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant={"h6"}>
                                Address
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth id="street" label="Street & House Number" value={order.delivery_address.street} onChange={(e) => updateAddress('street', e.target.value)} />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth id="city" label="City" value={order.delivery_address.city} onChange={(e) => updateAddress('city', e.target.value)} />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth id="zipcode" label="Zipcode" value={order.delivery_address.zipcode} onChange={(e) => updateAddress('zipcode', e.target.value)} />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth id="country" label="Country" value={order.delivery_address.country} onChange={(e) => updateAddress('country', e.target.value)} />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Paper>
    )
};

const mapStateToProps = ({ orders }) => ({
    order: orders.order,
});

const mapDispatchToProps = dispatch => {
    const { addToCard, removeFromCard, updateOrder } = OrderActions;

    return {
        dispatch,
        addToCard: (pizza) => dispatch(addToCard(pizza)),
        removeFromCard: (pizza) => dispatch(removeFromCard(pizza)),
        updateOrder: (order) => dispatch(updateOrder(order)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
