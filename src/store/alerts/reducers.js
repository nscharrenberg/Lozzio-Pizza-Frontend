import Types from './types';

const initialState = {
    successOpen: false,
    successMessage: "asdfadf",
    errorOpen: false,
    errorMessage: "Something went wrong",
    warningOpen: false,
    warningMessage: ""
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.SUCCESS:
            return {
                ...state,
                successOpen: true,
                successMessage: payload
            };
        case Types.ERROR:
            return {
                ...state,
                errorOpen: true,
                errorMessage: payload
            };
        case Types.WARNING:
            return {
                ...state,
                warningOpen: true,
                warningMessage: payload
            };
        case Types.CLEAR_SUCCESS:
            return {
                ...state,
                successOpen: false,
            };
        case Types.CLEAR_WARNING:
            return {
                ...state,
                warningOpen: false,
            };
        case Types.CLEAR_ERROR:
            return {
                ...state,
                errorOpen: false,
            };
        default:
            return state;
    }
};

export default reducer;
