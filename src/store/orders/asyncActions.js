import * as Actions from './actions';
import * as AlertActions from '../alerts';
import getApiService from "../../services/apiService";

const getOrder = (id) => (dispatch, getState) => {
    const apiService = getApiService();

    const { apis } = getState();

    const url = `${apis.baseUrl}/order/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    apiService.request(url, options).then(response => {
        if (!response.ok) {
            let message = "Unable to get order";

            if (response.stats === 404) {
                message = "Order could not be found";
            }

            throw new Error(message);
        }

        response.json().then(order => {
            dispatch(Actions.setOrder(order));

            return order;
        });
    });
};

const makeOrder = () => (dispatch, getState) => {
  const apiService = getApiService();

  const { order } = getState().orders;
  const { apis } = getState();

    const url = `${apis.baseUrl}/order`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
    };

    apiService.request(url, options).then(response => {
        if (!response.ok) {
            let message = "Unable to place order";
            if (response.status === 400) {
                message = "The format of the object is not valid";
            }

            dispatch(AlertActions.Actions.showError(message));
        }

        return response.json().then(res => {
            const { order } = res;

            dispatch(Actions.makeOrder());
            dispatch(Actions.setOrder(order));

            dispatch(AlertActions.Actions.showSuccess("Order has been created."));

            return order;
        });
    })
};

const addToCard = (pizza) => (dispatch) => {
    dispatch(Actions.addToCard(pizza));
};

const removeFromCard = (pizza) => (dispatch) => {
    dispatch(Actions.removeFromCard(pizza));
};

const cancelOrder = () => (dispatch, getState) => {
    const apiService = getApiService();

    const { selected } = getState().orders;
    const { apis } = getState();

    const { order_id } = selected;

    const url = `${apis.baseUrl}/order/cancel/${order_id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    apiService.request(url, options).then(response => {
        if (!response.ok) {
            let message = "Unable to cancel order";
            if (response.status === 412) {
                message = "unable to cancel your order after 5 minutes have elapsed.";
            } else if (response.status === 422) {
                message = "Unable to cancel an already canceled or delivered order";
            } else if (response.stats === 404) {
                message = "Order could not be found";
            }

            dispatch(AlertActions.Actions.showError(message));
            return;
        }

        response.json().then(order => {
            dispatch(Actions.setOrder(order));

            dispatch(AlertActions.Actions.showSuccess("Order has been cancelled."));
        });
    });
};

const updateOrder = (order) => (dispatch) => {
  dispatch(Actions.updateOrder(order));
};

const clearCard = () => (dispatch) => {
    dispatch(Actions.clearCard());
};

const clearOrder = () => (dispatch) => {
    dispatch(Actions.clearOrder());
};

export {
    getOrder,
    makeOrder,
    addToCard,
    cancelOrder,
    removeFromCard,
    clearCard,
    updateOrder,
    clearOrder
};
