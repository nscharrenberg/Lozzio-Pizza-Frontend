import Types from './types';

const initialState = {
    baseUrl: "https://lozzio-pizza.herokuapp.com/api/v1"
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.CHANGE_URL:
            return {
                ...state,
                baseUrl: payload
            };
        case Types.RESET_URL:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
