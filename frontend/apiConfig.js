// Define the API host with a fallback value
const apiHost = "http://localhost:8000"; // to rectify : process.env.REACT_APP_API_HOST || "http://localhost:8000";

// Define the api object
const api = {
    apiHost,
};

// Export the api object
export default api;
