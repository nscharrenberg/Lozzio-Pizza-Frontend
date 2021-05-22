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

const GetOrder = ({ order, getOrder, clearOrder }) => {
    const classes = useStyles();

    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!isNil(id)) {
            getOrder(id);
        } else {
            clearOrder();
            history.push(routes.orderPath);
        }
    }, []);

    return (
        <Container className={classes.root}>
            {
                order ? (<Order/>) : null
            }
        </Container>
    );
};

const mapStateToProps = ({ orders }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(GetOrder);
