import React from 'react';
import { Grid, Paper, Box, Typography, Button, ButtonGroup, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroImage from '../../assets/HomeAssets/undraw_working_remotely_re_6b3a.svg'

const Hero = () => {
    return (
        <Box sx={{ flexGrow: 1 }} mb={10} pt={{xs:0, md:5}} px={{xs:0, sm:7}}>
            <Grid pb={2} container component={Paper} px={2} elevation={6} spacing={3} height={{xs:'fit-content', lg:'37rem'}}>
                <Grid item xs>
                    <Box className="flex justify-center align-middle h-full">
                        <Box className="self-center h-fit">
                            <Box className='mb-10' textAlign={{xs:'center',sm:'left'}}>
                                <Typography fontWeight={900} mb={3} className="uppercase">Portfolio managing platform.</Typography>
                                <Typography fontWeight={900} mb={3}  variant='h2' component={'h1'} className="uppercase">Getting an online personal portfolio just got easier.</Typography>
                                <Typography component='h2' fontSize={20}>Porthree a is an end-to-end portfolio management platform designed to make online personal portfolio creation, management and engagement easier.</Typography>
                            </Box>
                            <Box mt={7} >
                                <ButtonGroup variant="text" aria-label="Basic button group">
                                    <Button>Visit portfolio</Button>
                                    <Button>Create portfolio</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md lg={5}>
                    <Box className="flex justify-center align-middle h-full">
                        <img src={HeroImage} alt="Hero illustration" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Hero;