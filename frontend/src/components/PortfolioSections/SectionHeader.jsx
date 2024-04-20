import React from 'react'
import { Box, Typography } from '@mui/material'

const SectionHeader = ({ title, side, custom }) => {
    return (
        <Box className={`uppercase flex ${side ? ' mt-5 ' : 'justify-center  mt-20 '} mb-8`}>
            <Box className="w-fit flex flex-col gap-1">
                <Typography align='center' variant="h4" component="h2" sx={{ fontWeight: '800', color: custom?.primary_color ||''  }}>{title || "SectionHeader"}</Typography>
                <div className={` border-2 border-zinc-600  w-[50%] ${side ? '' : ' self-center'} `}></div>
                <div className={` border-2 border-zinc-600 w-full ${side ? '' : ' self-center'} `}></div>
                <div className={` border-2 border-zinc-600 w-[50%] ${side ? '' : 'self-center'} `}></div >
            </Box >
        </Box >
    )
}

export default SectionHeader
