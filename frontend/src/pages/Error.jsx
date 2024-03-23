import React from 'react';
import { useRouteError } from "react-router-dom";


const Error = () => {
    const error = useRouteError();

    return (
        <div>Ernest caused a <b className='text-blue'>{error.statusText ||  error.message}</b> error</div>
    )
}

export default Error;
