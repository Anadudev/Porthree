import axios from 'axios';

/**
 * Fetches user data from the backend API.
 * @param {Object} user - The user object containing the user's ID.
 * @returns {Promise<Object>} The user data if successful, or an error response if unsuccessful.
 */
async function GetUser(user) {
    // console.log(user);
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
    return { loading: true };
}

export async function fetchPaginatedData(url, amount = 3) {
    const results = [];
    let currentPage = 1;
    let totalFetched = 0;

    try {
        while (totalFetched <= amount) {
            const response = await axios.get(`${url}?page=${currentPage}`);
            const data = response.data;
            const newData = data.results;

            results.push(...newData);
            totalFetched += newData.length;
            currentPage++;

            if (!data.next || totalFetched >= amount) {
                break;
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    // console.log(results);
    return results.slice(0, amount); // Return only the specified amount of data
}


export async function GetRelation(UrlLink) {
    try {
        const response = await axios.get(UrlLink);
        if (response && response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response
            // throw new Error("User not found");
        } else {
            console.log(error);
            throw new Error("Failed to fetch user data");
        }
    }
    return { loading: true };
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
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
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
    return { loading: true };
}

export default GetUser;
