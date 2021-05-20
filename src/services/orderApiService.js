import getApiService from "./apiService";

const getOrderApiService = () => {
    const apiService = getApiService();
    const baseUrl = apiService.baseUrl;

    const getOrder = async (id) => {
        const url = `${baseUrl}/order/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to get order";

            if (response.stats === 404) {
                message = "Order could not be found";
            }

            throw new Error(message);
        }

        return response.json();
    };

    const makeOrder = async (body) => {
        const url = `${baseUrl}/order`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to place order";
            if (response.status === 400) {
                message = "The format of the object is not valid";
            }

            throw new Error(message);
        }

        return response.json();
    };

    const cancelOrder = async(id) => {
        const url = `${baseUrl}/order/cancel/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to cancel order";
            if (response.status === 412) {
                message = "unable to cancel your order after 5 minutes have elapsed.";
            } else if (response.status === 422) {
                message = "Unable to cancel an already canceled or delivered order";
            } else if (response.stats === 404) {
                message = "Order could not be found";
            }

            throw new Error(message);
        }

        return response.json();
    };

    const deliveryTime = async (id) => {
        const url = `${baseUrl}/order/deliverytime/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await apiService.request(url, options);

        if (!response.ok) {
            let message = "Unable to get order";

            if (response.status === 404) {
                const message = "Order could not be found";

                throw new Error(message);
            }
        }

        return response.json();
    };

    return {
        getOrder,
        makeOrder,
        cancelOrder,
        deliveryTime,
    };
};

export default getOrderApiService;
