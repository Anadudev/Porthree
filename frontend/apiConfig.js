/**
 * This module exports the base URL and an Axios instance.
 *
 * The base URL is the URL of the API server.
 * The Axios instance is configured to use the base URL.
 * It also sets a timeout of 1000ms.
 *
 * The Axios instance currently does not have any default headers.
 * If you want to add headers, uncomment the headers object.
 *
 * @module apiConfig
 */

import axios from "axios";

// The base URL of the API server.
const APIBaseURL = `https://porthreeapi.koyeb.app/`;
// const APIBaseURL = `http://localhost:8000/`;

// The access token from local storage.
// This is used to authenticate requests to the API server.
const token = localStorage.getItem('access_token');

// The Axios instance used to make requests to the API server.
// It is configured to use the base URL and a timeout of 1000ms.
// The headers object is commented out. Uncomment it to add headers.
const api = axios.create({
    baseURL: APIBaseURL,
    timeout: 9000,
    /*  headers: {
        'Authorization': `Bearer ${token}`,
        'X-Custom-Header': 'foobar',
        'Content-Type': 'multipart/form-data'
    } */
});

// Export the base URL.
export {APIBaseURL};

// Export the Axios instance.
export default api;
