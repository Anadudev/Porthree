import React, {useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { Button } from '@mui/material';

function Filter() {
    let [searchParams, setSearchParams] = useState([]);

    function handleParams() {
        // event.preventDefault();
        // let params = serializeFormQuery(event.target);
        setSearchParams(useSearchParams());
        console.log(Object.keys(searchParams));
        console.log(searchParams);
    }

    return (
        <div>
            <Button onClick={handleParams}>Filter</Button>
        </div>
    );
}

export default Filter
