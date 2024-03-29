import axios from 'axios';
import { useRef } from 'react';

async function GetUser(user) {
    // console.log(user.id);
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${user.id}/`);
        if (response && response.status === 200 && response.data) {

            const result = response.data;
            // console.log(result);
            return result;
        }
        // console.log(response);
        // console.log(user);
    } catch (error) {
        // console.error(error);
        if (error.res.status === 404) {
            throw new Response("Not Found", { status: 404 });
        }
        return error;
    }
}

const assembleData = (id, dataList) => {
    const assembly = []
    dataList.map((data) => {
        if (data.user === id) {
            assembly.push(data)
        }
    });
    return assembly;
    // console.log(assembly);
}

export const getUserData = async (userId, data) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/${data}/`);
        if (response && response.status === 200 && response.data) {

            const result = response.data.results;
            const data = assembleData(userId, result);
            return data;
            // console.log(result);
            // return result;
        }
        // console.log(response);
        // console.log(user);
    } catch (error) {
        // console.error(error);
        /*  if (error.res.status === 404) {
                throw new Response("Not Found", { status: 404 });
         } */
        // return error;
    }
}
export default GetUser;
