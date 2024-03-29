import axios from 'axios';
import { useRef } from 'react';

async function GetUser(user) {
    // console.log(user.id);
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${user.id}/`);
        if (response && response.data) {

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

export default GetUser;
