import axios from 'axios';
import api from '../../apiConfig';


/**
 * Fetches user data from the backend API based on the provided user object.
 *
 * @param {Object} user - The user object to fetch data for.
 * @param {number} user.id - The ID of the user.
 * @returns {Promise<Object>} The fetched user data if successful, or an error response if unsuccessful.
 * @throws {Error} If there is an error while fetching the user data.
 */
async function GetUser(user) {
    // console.log(user);
    try {
        // Send GET request to the specified URL
        const response = await api.get(`api/users/${user.id}/`);

        // Check if response is successful and contains data
        if (response && response.status === 200 && response.data) {
            // Return fetched user data
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // If there is a response, return it
            return error.response
            // throw new Error("User not found");
        } else {
            // If there is no response, log the error and throw a new error
            console.error('Error fetching user data:', error);
            throw new Error("Failed to fetch user data");
        }
    }
    // Return loading state if response is not successful
    return { loading: true };
}


/**
 * Fetches paginated data from the backend API.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {number} amount - The number of items to fetch.
 * @returns {Promise<Array>} The fetched data if successful, or an error response if unsuccessful.
 * @throws {Error} If there is an error while fetching the data.
 */
export async function fetchPaginatedData(url, amount = 3) {
    // Initialize an array to store the fetched data.
    const results = [];

    // Initialize a counter for the current page.
    let currentPage = 1;

    // Initialize a counter for the total number of items fetched.
    let totalFetched = 0;

    try {
        // Loop until the specified amount of data is fetched.
        while (totalFetched <= amount) {
            // Send a GET request to the specified URL with the current page.
            const response = await api.get(`${url}?page=${currentPage}`);

            // Extract the data from the response.
            const data = response.data;

            // Extract the new data from the response.
            const newData = data.results;

            // Add the new data to the results array.
            results.push(...newData);

            // Increase the total number of items fetched by the number of new items.
            totalFetched += newData.length;

            // Increment the current page.
            currentPage++;

            // Break the loop if there is no next page or the total fetched is greater than or equal to the amount.
            if (!data.next || totalFetched >= amount) {
                break;
            }
        }
    } catch (error) {
        // Log the error and re-throw it.
        console.error('Error fetching data:', error);
        throw error;
    }

    // Return only the specified amount of data.
    return results.slice(0, amount);
}


/**
 * Fetches data from the backend API based on the provided URL.
 * @param {string} UrlLink - The URL to fetch data from.
 * @returns {Promise<Object>} The fetched data if successful, or an error response if unsuccessful.
 */
export async function GetRelation(UrlLink) {
    const loadStatus = { loading: true }
    try {
        // Send GET request to the specified URL
        const response = await api.get(UrlLink);
        // Check if response is successful and contains data
        if (response && response.status === 200 && response.data) {
            // Return fetched data
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // If there is a response, return it
            const e = error.response;
            throw new Response("Error: "+e.data.error,
                { status: e.status },
                { statusText: e.statusText },
            );
        } else {
            // If there is no response, log the error and throw a new error
            throw new Response("Failed to fetch data");
        }
    }

    // Return loading state if response is not successful
    return loadStatus;
}



/**
 * Fetches data from the backend API based on the provided endpoint.
 * @param {string} data - The endpoint to fetch data from.
 * @returns {Promise<Object>} The fetched data if successful, or an error response if unsuccessful.
 */
export async function GetDatas(data) {
    try {
        const response = await api.get(`api/${data}/`);
        if (response && response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response
            // throw new Error("User not found");
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
    return { loading: true };
}

/**
 * Filters a list of data items based on the user ID.
 * @param {number} id - The user ID to filter by.
 * @param {Array} dataList - The list of data items to filter.
 * @returns {Array} The filtered list of data items.
 */
const assembleData = async (id, dataList) => {
    const collection = [];
    // Use Promise.all to fetch all relations concurrently
    const relations = await Promise.all(dataList.map(async (data) => {
        const relate = await GetRelation(data.user);
        return { data: relate, item: data };
    }));

    // Filter the relations to find matches and extract the items
    for (const relation of relations) {
        if (relation.data.id === id) {
            collection.push(relation.item);
        }
    }

    return collection;
}

/**
 * Fetches specific user data from the backend API based on the provided endpoint and user ID.
 * @param {number} userId - The user ID to fetch data for.
 * @param {string} data - The endpoint to fetch data from.
 * @returns {Promise<Array>} The filtered list of data items if successful, or an error response if unsuccessful.
 */
export const getUserData = async (userId, data) => {
    try {
        const response = await api.get(`api/${data}/`);
        if (response && response.status === 200 && response.data) {
            const assembled = await assembleData(userId, response.data.results);
            // console.log(assembled);
            return assembled;
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            return error.response
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
    return { loading: true };
}

/**
 * Fetches a specific item from the backend API based on the provided endpoint and item ID.
 * @param {string} item - The endpoint to fetch the item from.
 * @param {number} id - The ID of the item to fetch.
 * @returns {Promise<Object>} The fetched item data if successful, or an error response if unsuccessful.
 */
export async function GetItem(item, id) {
    try {
        const response = await api.get(`api/${item}/${id}/`);
        if (response && response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
    return { loading: true };
}

/**
 * Checks if the user is authenticated by verifying the presence of a "user" and "access_token" in the local storage.
 *
 * @return {boolean} Returns true if the user is authenticated, false otherwise.
 */
export function isAuthenticated() {
    return localStorage.getItem("user") !== null && localStorage.getItem('access_token') !== null;
}

/**
 * Checks if the currently authenticated user is the same as the provided user.
 *
 * @param {Object} user - The user object to compare with the authenticated user.
 * @return {boolean} Returns true if the authenticated user is the same as the provided user, false otherwise.
 */
export function currAuthUser(user) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return isAuthenticated() && storedUser.username === user;
}

/**
 * Sends a POST request to the specified endpoint with the provided data.
 *
 * @param {string} endpoint - The URL of the endpoint to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @return {Promise<Object>} - A promise that resolves to the response data if the request is successful,
 *                            or throws an error if the request fails.
 */
export async function PostData(endpoint, data) {
    try {
        if (isAuthenticated()) {
            const response = await api.post(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error; // Optionally, you can handle the error or throw it to be handled by the calling function
    }
    return { loading: true };
}

/**
 * Updates data on the server.
 *
 * @param {string} endpoint - The URL of the endpoint to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @return {Promise<Object>} - A promise that resolves to the response data if the request is successful,
 *                            or throws an error if the request fails.
 */
export async function updateData(endpoint, data) {
    // Check if the user is authenticated
    if (isAuthenticated()) {
        try {
            // Send a PUT request to the server
            await api.put(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            // Log the error to the console
            console.error("Error updating comment:", error);
        }
    }
    // Return after the asynchronous request is complete
    return { loading: true };
}


/**
 * Delete data from the server
 *
 * @param {string} endpoint - The URL of the endpoint to send the request to.
 * @return {Promise} - A promise that resolves when the request is complete.
 *                     Rejects with an error if the request fails.
 */
export async function deleteData(endpoint) {
    try {
        // If the user is authenticated, send a DELETE request to the server
        // with the provided endpoint and necessary headers
        if (isAuthenticated()) {
            await api.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
    }
    catch (error) {
        // If the request fails, log the error to the console
        console.log(error);
    }
}
