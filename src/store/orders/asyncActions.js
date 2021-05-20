import {getOrderApiService} from "../../services";
import * as Actions from './actions';

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
  })
};

const addToCard = (pizza) => (dispatch) => {
    dispatch(Actions.addToCard(pizza));
};

const removeFromCard = (pizza) => (dispatch) => {
    dispatch(Actions.removeFromCard(pizza));
};

const cancelOrder = () => (dispatch, getState) => {
    const orderService = getOrderApiService();

    const { selected } = getState().orders;

    return orderService.cancelOrder(selected.order_id).then(order => {
        dispatch(Actions.setOrder(order));
    });
};

const deliveryTime = () => (dispatch, getState) => {
    const orderService = getOrderApiService();

    const { selected } = getState().orders;

    return orderService.deliveryTime(selected.order_id).then(order => {
        dispatch(Actions.setOrder(order));
    });
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
    clearCard
};
