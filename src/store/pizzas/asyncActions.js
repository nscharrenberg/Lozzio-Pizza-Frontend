import { getPizzaApiService } from "../../services";
import * as Actions from './actions';

const getPizzas = () => (dispatch) => {
  const pizzaService = getPizzaApiService();

  return pizzaService.getPizzas().then(pizzas => {
      dispatch(Actions.setPizzas(pizzas));

      return pizzas;
  });
};

const getPizza = (id) => (dispatch) => {
    const pizzaService = getPizzaApiService;

    return pizzaService.getPizza(id).then(pizza => {
        dispatch(Actions.setPizza(pizza));

        return pizza;
    })
};

export {
    getPizzas,
    getPizza,
};
