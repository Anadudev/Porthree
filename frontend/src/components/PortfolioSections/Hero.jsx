import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CardMedia, Button, ButtonGroup, Link } from '@mui/material';
import BgImage from "/src/assets/image.jpg";


const Hero = ({props}) => {
  return (
    <Box component="section" sx={{ width: '100%' }} id='hero'>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }} textAlign={{ xs: "center", sm: "left", md: "left" }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        <Grid item xs={7} md={6}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: '900' }} >{props.first_name || 'props'} {props.last_name || ''}</Typography>
          <Typography variant="h1" component="h1" sx={{ fontWeight: '900', marginBottom: "30px" }}>{props.career || ''}</Typography>
          <Typography variant="p" mb={'20px'} component="p">{props.bio || ''}</Typography>
        </Grid>
        <Grid item xs={5} md={6}>
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "center"
          }} p={"10px"} className="h-full  md:w-full">
            <CardMedia component="img"  image={props.picture || ''} sx={{
              borderRadius: '10px',height:"30rem"
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
