import {getOrderApiService} from "../../services";
import * as Actions from './actions';
import * as AlertActions from '../alerts';
import getApiService from "../../services/apiService";

const getOrder = (id) => (dispatch) => {
    const orderService = getOrderApiService;

    return orderService.getOrder(id).then(order => {
        dispatch(Actions.setOrder(order));

        return order;
    })
};

const makeOrder = () => (dispatch, getState) => {
  const orderService = getOrderApiService();

  const { order } = getState().orders;

  return orderService.makeOrder(order).then(res => {
      const { order } = res;

      dispatch(Actions.makeOrder());
      dispatch(Actions.setOrder(order));

      dispatch(AlertActions.Actions.showSuccess("Order has been created."));

      return order;
  }).catch(err => {
      dispatch(AlertActions.Actions.showError("Unable to place order."));
  });
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

    const { order_id } = selected;

    const url = `${apiService.baseUrl}/order/cancel/${order_id}`;
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

const deliveryTime = () => (dispatch, getState) => {
    const orderService = getOrderApiService();

    const { selected } = getState().orders;

    return orderService.deliveryTime(selected.order_id).then(order => {
        dispatch(Actions.setOrder(order));
    });
};

const updateOrder = (order) => (dispatch) => {
  dispatch(Actions.updateOrder(order));
};

const clearCard = () => (dispatch) => {
    dispatch(Actions.clearCard());
};

export {
    getOrder,
    makeOrder,
    addToCard,
    cancelOrder,
    removeFromCard,
    deliveryTime,
    clearCard,
    updateOrder
};
