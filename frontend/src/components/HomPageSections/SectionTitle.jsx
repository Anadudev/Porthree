import React from 'react';
import { Typography, Box } from '@mui/material';
const SectionTitle = ({ title, caption }) => {
    return (
        <Box mb={9} mt={10}>
            <Typography fontWeight={900} color={'primary'} className='capitalize text-center'> p<sup>3</sup> {title || ''}</Typography>
            <Typography fontSize={20} mb={2} className='capitalize text-center'>{caption || ''}</Typography>
            <hr />
        </Box>
    )
}

export default SectionTitle;