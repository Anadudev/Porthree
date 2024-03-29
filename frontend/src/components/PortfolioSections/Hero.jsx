import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CardMedia, Button, ButtonGroup, Link } from '@mui/material';
import BgImage from "/src/assets/image.jpg";
import GetUser from '../../data/GetUser';
import { useLoaderData } from 'react-router-dom';

const Hero = () => {
  const id = useLoaderData();
  const [user, setUser] = useState([]); // State to store fetched user

  // Fetch data on component mount (or when needed)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await GetUser(id); // Call the GetUser function
        setUser(fetchedUser);
        // console.log(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle errors appropriately, e.g., display an error message
      }
    };
    fetchData(); // Execute the data fetching logic
  }, [id]);

  // console.log(user)
  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        <Grid item xs={7} md={6}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: '900', marginBottom: "30px" }}>{user.first_name|| 'User'} {user.last_name|| 'User'}</Typography>
          <Typography variant="h1" component="h1" sx={{ fontWeight: '900', marginBottom: "30px" }}>{user.career || 'career'}</Typography>
          <Typography variant="p" component="p">{user.bio || 'bio'}</Typography>
        </Grid>
        <Grid item xs={5} md={6}>
          <Box sx={{
            '--Grid-borderWidth': '5px',
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
          <Button component={Link} to='#skills' color="primary">Skills</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Hero;
