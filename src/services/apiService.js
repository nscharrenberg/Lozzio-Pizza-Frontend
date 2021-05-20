
const getApiService = () => {
    const baseUrl = "http://localhost:8080/api/v1";
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
