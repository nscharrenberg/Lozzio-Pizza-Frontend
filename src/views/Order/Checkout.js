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
    },
    shoppingCart: {
        marginBottom: theme.spacing(2),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const getSteps = () => {
    return [
        `Select the pizza's you'd like to order`,
        `Enter your personal details`,
        `Select your payment method`,
    ];
};

const getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0:
            return <ShoppingCart/>;
        case 1:
            return "Enter your personal details";
        case 2:
            return "Select your payment method";
        default:
            return "Unknown step";
    }
};

const Checkout = ({ getPizzas }) => {
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
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
