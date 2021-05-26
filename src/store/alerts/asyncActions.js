import * as Actions from './actions';

const showSuccess = (message) => (dispatch) => {
  dispatch(Actions.success(message));
};

const showError = (message) => (dispatch) => {
    dispatch(Actions.error(message));
};

const showWarning = (message) => (dispatch) => {
    dispatch(Actions.warning(message));
};

const clearSuccess = () => (dispatch) => {
    dispatch(Actions.clearSuccess());
};

const clearError = () => (dispatch) => {
    dispatch(Actions.clearError());
};

const clearWarning = () => (dispatch) => {
    dispatch(Actions.clearWarning());
};

export {
    showSuccess,
    showError,
    showWarning,
    clearError,
    clearWarning,
    clearSuccess
};
