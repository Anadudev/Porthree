import React from 'react';
import {
  Box, Grid, Typography,
  CardMedia, Button, ButtonGroup
} from '@mui/material';


/**
 * Renders the hero section of a portfolio page.
 *
 * @function Hero
 * @param {Object} props - The properties object containing the user's details.
 * @param {string} props.first_name - The user's first name.
 * @param {string} props.last_name - The user's last name.
 * @param {string} props.career - The user's career title or profession.
 * @param {string} props.bio - A brief description or bio of the user.
 * @param {string} props.picture - The URL or path to the user's profile picture.
 * @returns {JSX.Element} The JSX element representing the hero section of the portfolio page.
 */
const Hero = ({ props }) => {
  return (
    <Box component="section" sx={{ width: '100%' }} id='hero'>
      <Grid pb={2} container px={2} spacing={3} height={{ xs: 'fit-content', lg: '37rem' }}>
        <Grid item xs>
          <Box className="flex justify-center align-middle h-full">
            <Box className="self-center h-fit">
              <Box className='mb-10' textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: '900' }} >{props.first_name || 'props'} {props.last_name || ''}</Typography>
                <Typography variant="h2" component="h1" sx={{ fontWeight: '900', marginBottom: "30px" }}>{props.career || ''}</Typography>
                <Typography variant="p" mb={'20px'} component="p" className='text-2xl italic'>{props.bio || ''}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md lg={6}>
          <Box className="flex justify-center align-middle h-full">
            <CardMedia component="img" image={props.picture || ''} sx={{
              borderRadius: '10px', height: `${props.picture ? "30rem" : ''}`
            }} />
          </Box>
        </Grid>
      </Grid>
      <Box>
        <ButtonGroup variant="text" aria-label="Basic button group " color="primary">
          <Button Link href='#about' color="primary">Download Resume</Button>
          <Button Link href='#skills' color="primary">Skills</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Hero;
