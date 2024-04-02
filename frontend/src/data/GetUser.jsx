import axios from 'axios';

async function GetUser(user) {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${user.id}/`);
        if (response && response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // console.log(error.response)
            return error.response
            // throw new Error("User not found");
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
}

export async function GetDatas(data) {
    try {
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
        if (response && response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // console.log(error.response)
            return error.response
            // throw new Error("User not found");
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
}

const assembleData = (id, dataList) => {
    return dataList.filter(data => data.user === id);
}

export const getUserData = async (userId, data) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
        if (response && response.status === 200 && response.data) {

            return assembleData(userId, response.data.results);
            // console.log(result);
            // return result;
        }
        // console.log(response);
        // console.log(user);
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            return error.response
            // throw new Error("User not found");
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
}

export async function GetItem(item, id) {
    try {
        const response = await axios.get(`http://localhost:8000/api/${item}/${id}/`);
        if (response && response.status === 200 && response.data) {
            // console.log(response.data)
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // console.log(error.response)
            return error.response
            // throw new Error("User not found");
        } else {
            throw new Error("Failed to fetch user data");
        }
    }
}


export default GetUser;
