import Types from './types';

const setPizzas = (pizzas) => ({
    type: Types.SET_PIZZAS,
    payload: pizzas
});

const setPizza = (pizza) => ({
    type: Types.SET_PIZZA,
    payload: pizza
});

const reset = () => ({
    type: Types.RESET
});

export {
    setPizza,
    setPizzas,
    reset,
};
