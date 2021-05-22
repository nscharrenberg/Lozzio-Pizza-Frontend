import Types from './types';

const changeUrl = (url) => ({
    type: Types.CHANGE_URL,
    payload: url
});

const reset = () => ({
    type: Types.RESET_URL
});


export {
    changeUrl,
    reset,
};
