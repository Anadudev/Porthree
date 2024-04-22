import React, { useState, useEffect } from 'react'
import { Typography, Pagination, Stack, Paper } from '@mui/material';
import { GetRelation } from '../data/GetUser';

const HandlePagination = () => {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {


        async function fetchData() {
            setResult(await GetRelation(`http://localhost:8000/api/tools/?page=${page}`));
            if (result && result.results) {
                if (result.results.length > 1) {
                    setCount(Math.ceil(result.count / result.results.length));
                } else if (result.results.length == 1) { setCount(1); }
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, result.count, count])
    const handleChange = (event, value) => {
        setPage(value);
    };
    console.log(count);
    return result && result.results && result.results.length > 0 ? (
        <Stack spacing={2}>
            {result.results.map((data, id) => (
                <Paper key={id}>{data.tool}</Paper>
            ))}
            <Typography>Page: {page}</Typography>
            <Pagination
                count={count}
                variant="outlined"
                color="primary"
                page={page}
                onChange={handleChange}
            />
        </Stack>
    ) : (
        <Typography>No data available</Typography>
    );
}

export default HandlePagination;

