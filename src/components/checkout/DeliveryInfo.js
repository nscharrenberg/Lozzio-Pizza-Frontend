import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {OrderActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles(theme => ({
    form: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    payment: {
        width: "100%"
    }
}));

export const DeliveryInfo = ({updateOrder, order}) => {
    const classes = useStyles();

    const updateForm = (key, value) => {
        updateOrder({
          ...order,
          [key]: value,
      });
    };

    return (
        <Paper>
            <div>
                <form className={classes.form} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item lg={12}>
                            <Typography variant={"h6"}>
                                Delivery
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField fullWidth select  label="Payment Method" value={order.payment_type}
                                       onChange={(e) => updateForm('payment_type', e.target.value)}>
                                <MenuItem value="cash">Cash</MenuItem>
                                <MenuItem value="pin">Pin</MenuItem>
                                <MenuItem value="visa">VISA</MenuItem>
                                <MenuItem value="paypal">Paypal</MenuItem>
                                <MenuItem value="ideal">iDeal</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item lg={6}>
                            <FormControlLabel
                                control={<Switch checked={order.takeaway} onChange={(e) => updateForm('takeaway', !order.takeaway)} name="takeaway" />}
                                label="Takeaway"
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="note"
                                label="Note"
                                fullWidth
                                multiline
                                rowsMax={4}
                                value={order.note}
                                onChange={(e) => updateForm('note', e.target.value)}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo);
