import React from 'react';
import { Typography, Box } from '@mui/material';
const SectionTitle = ({ title, caption }) => {
    return (
        <React.Fragment>
            <hr />
        <Box mb={9} mt={10}>
            <Typography fontWeight={900} component={'h2'} variant='h5' color={'primary'} className='capitalize text-center'> p<sup>3</sup> {title || ''}</Typography>
            <Typography variant={'h5'} mb={2} className='capitalize text-center'>{caption || ''}</Typography>
        </Box>
        </React.Fragment>
    )
}

export default SectionTitle;