import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {OrderActions, PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import ShoppingCart from "../../components/checkout/ShoppingCart";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import PersonalInfo from "../../components/checkout/PersonalInfo";
import DeliveryInfo from "../../components/checkout/DeliveryInfo";
import Alert from '@material-ui/lab/Alert';
import {isEmpty, isNil} from "ramda";
import Order from "../../components/orders/Order";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
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
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const getSteps = () => {
    return [
        `Order Details`,
        `Personal Details`,
        `Delivery Details`,
    ];
};

const getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
            return <ShoppingCart />;
        case 1:
            return <PersonalInfo />;
        case 2:
            return <DeliveryInfo />;
        default:
            return "Unknown step";
    }
};

const Checkout = ({ getPizzas, order, pizzasInCard, makeOrder, updateOrder }) => {
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        getPizzas();
    }, []);

    const classes = useStyles();

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const isNilOrEmpty = (value) => {
        return !!(isNil(value) || isEmpty(value));
    }

    const valid = () => {
        if( isNilOrEmpty(order.customer_id) ||
            isNilOrEmpty(order.payment_type) ||
            isNilOrEmpty(order.delivery_address.street) ||
            isNilOrEmpty(order.delivery_address.city) ||
            isNilOrEmpty(order.delivery_address.zipcode) ||
            isNilOrEmpty(order.delivery_address.country) ||
            isNilOrEmpty(pizzasInCard)) {
            return false;
        }

        return true;
    };

    const postOrder = () => {
        updateOrder({
            ...order,
            pizzas: pizzasInCard.map(pizza => pizza.pizza_id)
        });

        makeOrder();

        handleNext();
    };

    return (
        <Container className={classes.root}>
            <Typography variant={"h5"}>
                Checkout
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div className={classes.instructions}>
                        <Order/>
                    </div>
                ) : (
                    <div>
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <div>
                            {activeStep === steps.length-1 && !valid() ? (<Alert className={classes.toppingHeader} severity="warning">Please ensure you're ordering at least one pizza, and have your personal details filled in!</Alert>) : null}
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            {activeStep === steps.length-1 ? (
                                <Button disabled={!valid()} variant="contained" color="primary" onClick={postOrder}>
                                    Finish
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                )}
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
    const { addToCard, makeOrder, updateOrder } = OrderActions;

    return {
        dispatch,
        getPizzas: () => dispatch(getPizzas()),
        addToCard: (pizza) => dispatch(addToCard(pizza)),
        makeOrder: () => dispatch(makeOrder()),
        updateOrder: (order) => dispatch(updateOrder(order)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
