import React from 'react'
import SectionTitle from './SectionTitle'
import { Grid, Box, Typography, Paper, ButtonGroup, Button } from '@mui/material'
import HeroImage from '../../assets/HomeAssets/undraw_portfolio_website_re_jsdd.svg'


const About = () => {
  return (
    <React.Fragment>
      <SectionTitle title={'about'} caption={'about our platform'} />
      <Box sx={{ flexGrow: 1 }} px={{ xs: 0, sm: 7 }} className=' border-x-8'>
        <Grid pb={2} container px={2} spacing={3} height={{ xs: 'fit-content', lg: '37rem' }}>
          <Grid item xs>
            <Box className="flex justify-center align-middle h-full">
              <img src={HeroImage} alt="Hero illustration" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md marginTop={{xs:5, md:0}}>
            <Box className="flex justify-center align-middle h-full">
              <Box className="self-center h-fit">
                <Box className='mb-10' textAlign={{ xs: 'center', sm: 'right' }}>
                  <Typography component='h2' fontSize={20}>Porthree a is an end-to-end portfolio management platform designed to make online personal portfolio creation, management and engagement easier.</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default About