import Types from './types';

const success = (message) => ({
    type: Types.SUCCESS,
    payload: message
});

const error = (message) => ({
    type: Types.ERROR,
    payload: message
});

const warning = (message) => ({
    type: Types.WARNING,
    payload: message
});

const clearSuccess = () => ({
    type: Types.CLEAR_SUCCESS
});

const clearError = () => ({
    type: Types.CLEAR_ERROR
});

const clearWarning = () => ({
    type: Types.CLEAR_WARNING
});

export {
    success,
    error,
    warning,
    clearError,
    clearSuccess,
    clearWarning,
};
