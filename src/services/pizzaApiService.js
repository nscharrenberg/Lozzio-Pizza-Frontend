import getApiService from "./apiService";

const getPizzaApiService = () => {
    const apiService = getApiService();
    const baseUrl = apiService.baseUrl;

    const getPizzas = async () => {
      const url = `${baseUrl}/pizza`;

      const options = {
          method: 'GET'
      };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to get pizzas";

            throw new Error(message);
        }

        return response.json();
    };

    const getPizza = async (id) => {
        const url = `${baseUrl}/pizza/${id}`;
        const options = {
            method: 'GET'
        };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to get Pizza";

            if (response.stats === 404) {
                message = "Pizza could not be found";
            }

            throw new Error(message);
        }

        return response.json();
    };

    return {
        getPizzas,
        getPizza,
    };
};

export default getPizzaApiService;
