import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {OrderActions, PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Order from "../../components/orders/Order";
import {
    useHistory,
    useParams
} from "react-router-dom";
import {isNil} from "ramda";
import SearchIcon from '@material-ui/icons/Search';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import routes from "../../router/routes";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        marginTop: theme.spacing(2)
    },
}));

const Checkout = ({ order, getOrder, clearOrder }) => {
    const classes = useStyles();
    const [orderId, setOrderId] = useState("");

    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!isNil(id)) {
            getOrder(id);
        } else {
            clearOrder();
        }
    }, []);

    const refresh = () => {
        history.push(routes.orderPath + "/" + orderId);
        history.go();
    };

    return (
        <Container className={classes.root}>
            {
                order ? (<Order/>) : (
                    <div>
                        <Typography variant={"h5"}>
                            Find the status of your order!
                        </Typography>

                        <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Order By ID"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <IconButton className={classes.iconButton} aria-label="search" onClick={refresh}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    </div>
                )
            }
        </Container>
    );
};

const mapStateToProps = ({ pizzas, orders }) => ({
    order: orders.selected,
});

const mapDispatchToProps = dispatch => {
    const { getOrder, clearOrder } = OrderActions;

    return {
        dispatch,
        getOrder: (id) => dispatch(getOrder(id)),
        clearOrder: () => dispatch(clearOrder()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
