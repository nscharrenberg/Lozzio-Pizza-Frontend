import Types from './types';

const initialState = {
    order: {
        customer_id: 69420,
        takeaway: false,
        payment_type: "cash",
        delivery_address: {
            street: "",
            city: "",
            country: "",
            zipcode: ""
        },
        note: "",
        pizzas: []
    },
    pizzasInCard: [],
    selected: undefined,
    loading: false,
    error: undefined,
    success: ''
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.GET_ORDER:
            return {
                ...state,
                selected: payload
            };
        case Types.ADD_TO_CARD:
            return {
                ...state,
                pizzasInCard: [...state.pizzasInCard, payload]
            };
        case Types.REMOVE_FROM_CARD:
            let found = 0;
            return {
                ...state,
                pizzasInCard: state.pizzasInCard.filter(pizza => {
                    if (found > 0) {
                        return true;
                    }

                    if ((pizza.pizza_id === payload.pizza_id) && found === 0) {
                        found++;
                        return false;
                    }

                    return true;
                })
            };
        case Types.MAKE_ORDER:
            return {
                ...state,
                order: initialState.order,
                pizzasInCard: [],
            };
        case Types.UPDATE_ORDER:
            return {
                ...state,
                order: payload,
            };
        case Types.CLEAR_CARD:
            return {
                ...state,
                pizzasInCard: [],
            };
        case Types.RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
