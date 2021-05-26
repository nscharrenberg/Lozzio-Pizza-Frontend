import * as Actions from './actions';
import getApiService from "../../services/apiService";

const getPizzas = () => (dispatch, getState) => {
  const apiService = getApiService();

  const { apis } = getState();

  dispatch(Actions.setLoading(true));

    const url = `${apis.baseUrl}/pizza`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    apiService.request(url, options).then(response => {
        if (!response.ok) {
            let message = "Unable to get pizzas";

            throw new Error(message);
        }

        return response.json().then(pizzas => {
            dispatch(Actions.setPizzas(pizzas));
            dispatch(Actions.setLoading(false));
            return pizzas;
        });
    });
};

const getPizza = (id) => (dispatch, getState) => {
    const apiService = getApiService();

    const { apis } = getState();

    const url = `${apis.baseUrl}/pizza/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    apiService.request(url, options).then(response => {
        if (!response.ok) {
            let message = "Unable to get Pizza";

            if (response.stats === 404) {
                message = "Pizza could not be found";
            }

            throw new Error(message);
        }

        return response.json().then(pizza => {
            dispatch(Actions.setPizza(pizza));

            return pizza;
        });
    });
};

export {
    getPizzas,
    getPizza,
};
