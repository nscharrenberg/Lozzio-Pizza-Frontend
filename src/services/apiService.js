
const getApiService = () => {
    const baseUrl = "https://lozzio-pizza.herokuapp.com/api/v1";
    const request = async (url, options) => {
        const response = await fetch(url, options);

        return response;
    };

    return {
        baseUrl,
        request,
    }
};

export default getApiService;
