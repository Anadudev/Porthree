import React from 'react';
import { Box, Grid, Typography, CardMedia, Button, ButtonGroup, Link } from '@mui/material';
import BgImage from "/src/assets/image.jpg";

const Hero = () => {
  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        <Grid item xs={7} md={6}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: '900', marginBottom: "30px" }}>Anadu Godwin</Typography>
          <Typography variant="h1" component="h1" sx={{ fontWeight: '900', marginBottom: "30px" }}>Software engineer</Typography>
          <Typography variant="p" component="p" sx={{ fontWeight: '500' }}>Django's authentication system is session-based. User sessions are typically stored in cookies on the user's browser or in the database backend configured for your Django project.
            The user model itself resides in the database and represents a user account, not their current login state.</Typography>
        </Grid>
        <Grid item xs={5} md={6}>
          <Box sx={{
            '--Grid-borderWidth': '5px',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            borderRadius: '10px',
          }} p={"10px"}>
            <CardMedia component="img" height="194" image={BgImage} sx={{
              borderRadius: '10px',
            }} />
          </Box>
        </Grid>
      </Grid>
      <Box>
        <ButtonGroup variant="text" aria-label="Basic button group " color="primary">
          <Button component={Link} to='#about' color="primary">About</Button>
          <Button component={Link} to='#' color="primary">Experience</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Hero;
