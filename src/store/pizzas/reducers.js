import Types from './types';

const initialState = {
    pizzas: [],
    selectedPizza: undefined,
    loading: false,
    error: undefined,
    success: ''
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.SET_PIZZAS:
            return {
                ...state,
                pizzas: payload
            };
        case Types.SET_PIZZA:
            return {
                ...state,
                selectedPizza: payload
            };
        case Types.RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
