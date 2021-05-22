import Types from './types';

const setOrder = (order) => ({
    type: Types.GET_ORDER,
    payload: order
});

const makeOrder = () => ({
    type: Types.MAKE_ORDER,
});

const addToCard = (pizza) => ({
    type: Types.ADD_TO_CARD,
    payload: pizza
});

const removeFromCard = (pizza) => ({
    type: Types.REMOVE_FROM_CARD,
    payload: pizza
});

const clearCard = () => ({
    type: Types.CLEAR_CARD,
});

const reset = () => ({
    type: Types.RESET
});

const updateOrder = (order) => ({
    type: Types.UPDATE_ORDER,
    payload: order,
});

const clearOrder = () => ({
    type: Types.CLEAR_ORDER,
});

export {
    setOrder,
    makeOrder,
    addToCard,
    removeFromCard,
    clearCard,
    reset,
    updateOrder,
    clearOrder,
};
