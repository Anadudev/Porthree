import React, { useState } from 'react';
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography } from '@mui/material'; // Import Typography
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import api from '../../apiConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api.apiHost}/auth_app/login/`, formData);

      if (response.status === 200) {
        // The login was successful
        const token = response.data.access; // The JWT token
        const user = response.data.user;
        console.log('Login successful, token saved');
        // Store the token in local storage or a cookie for future use
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(response);
        // Redirect the user to a protected page or the home page
        navigate(`/dashboard/${user.username}`);
      } else {
        setErrorMessage('Login failed. Please check username and password and try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please check username and password and try again.');
    }
  };

  return (
    <>
      <DrawerAppBar pages={NavLinks} />
      <Breadcrumb path={useLocation()} />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh" // Adjust the height as needed
          textAlign="center"
        >
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errorMessage && <p color='error'>{errorMessage}</p>}
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            {/* Add the "Sign Up" link */}
            <Typography component="div" variant="body2" style={{ marginTop: '10px' }}>
              Forgot your password? <Link to="/reset_password" style={{ color: 'blue' }}>Reset</Link>
            </Typography>
            {/* Add the "Sign Up" link */}
            <Typography component="div" variant="body2" style={{ marginTop: '10px' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'blue' }}>Sign Up</Link>
            </Typography>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
