import * as Actions from './actions';

const changeUrl = (url) => (dispatch) => {
  dispatch(Actions.changeUrl(url));
};

const reset = () => (dispatch) => {
    dispatch(Actions.reset());
};

export {
    changeUrl,
    reset
};
