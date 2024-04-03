import axios from 'axios';

/**
 * Fetches user data from the backend API.
 * @param {Object} user - The user object containing the user's ID.
 * @returns {Promise<Object>} The user data if successful, or an error response if unsuccessful.
 */
async function GetUser(user) {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${user.id}/`);
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
}

/**
 * Fetches data from the backend API based on the provided endpoint.
 * @param {string} data - The endpoint to fetch data from.
 * @returns {Promise<Object>} The fetched data if successful, or an error response if unsuccessful.
 */
export async function GetDatas(data) {
    try {
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
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
}

/**
 * Filters a list of data items based on the user ID.
 * @param {number} id - The user ID to filter by.
 * @param {Array} dataList - The list of data items to filter.
 * @returns {Array} The filtered list of data items.
 */
const assembleData = (id, dataList) => {
    return dataList.filter(data => data.user === id);
}

/**
 * Fetches specific user data from the backend API based on the provided endpoint and user ID.
 * @param {number} userId - The user ID to fetch data for.
 * @param {string} data - The endpoint to fetch data from.
 * @returns {Promise<Array>} The filtered list of data items if successful, or an error response if unsuccessful.
 */
export const getUserData = async (userId, data) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
        if (response && response.status === 200 && response.data) {

            return assembleData(userId, response.data.results);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            return error.response
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
}

/**
 * Fetches a specific item from the backend API based on the provided endpoint and item ID.
 * @param {string} item - The endpoint to fetch the item from.
 * @param {number} id - The ID of the item to fetch.
 * @returns {Promise<Object>} The fetched item data if successful, or an error response if unsuccessful.
 */
export async function GetItem(item, id) {
    try {
        const response = await axios.get(`http://localhost:8000/api/${item}/${id}/`);
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
}


export default GetUser;
