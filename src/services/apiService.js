
const getApiService = () => {
    const baseUrl = "https://lozzio-pizza.herokuapp.com/api/v1";
    const request = async (url, options) => {
        return await fetch(url, options);
    };

    return {
        baseUrl,
        request,
    }
};

export default getApiService;
