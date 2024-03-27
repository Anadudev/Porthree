import React from 'react'
import { Box, Typography } from '@mui/material'

const SectionHeader = ({ title }) => {
    return (
        <Box className="uppercase">
            <Typography align='center'>{title || "SectionHeader"}</Typography>
            </Box>
    )
}

export default SectionHeader
