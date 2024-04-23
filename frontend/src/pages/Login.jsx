import React, { useState } from 'react';
import ResponsiveAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material'; // Import Typography
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import api from '../../apiConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageTitle from './PageTitle';
import GetUser from '../data/GetUser';

const Login = () => {
  const navigate = useNavigate();
  PageTitle("Login");
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers').required('Username is required'),
      password: Yup.string().min(10, 'Password must be at least 12 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      // e.preventDefault();

      try {
        const response = await axios.post(`${api.apiHost}/auth_app/login/`, values);
        if (response.status === 200) {
          // The login was successful
          const token = response.data.access; // The JWT token
          const user = await GetUser(response.data.user);
          // Store the token in local storage or a cookie for future use
          if (!user.loading) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Redirect the user to a protected page or the home page
            navigate(`/dashboard/${user.username}`);
          }
        } else {
          // setErrorMessage('Login failed. Please check username and password and try again.');
        }
      } catch (error) {
        setErrorMessage(<Alert severity="error">{error.response.data.detail}.</Alert>);
        // setErrorMessage('Login failed. Please check username and password and try again.');
      }
    }
  });

  return (
    <div onClick={() => (setErrorMessage(''))} >
      <ResponsiveAppBar pages={NavLinks} />
      <div className='p-[50px]'>
        <Breadcrumb path={useLocation()} />
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            textAlign="center"
          >
            <h2>Login</h2>
            {errorMessage}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                {...formik.getFieldProps('username')}
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={formik.touched.username && formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                {...formik.getFieldProps('password')}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              {/* {errorMessage && <p>{errorMessage}</p>} */}
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
              {/* Add the "password reset" link */}
              <Typography component="div" variant="body2" style={{ marginTop: '10px' }}>
                Forgot your password? <Link to="/password_reset" style={{ color: 'blue' }}>Reset</Link>
              </Typography>
              {/* Add the "Sign Up" link */}
              <Typography component="div" variant="body2" style={{ marginTop: '10px' }}>
                Don&apos;t  have an account? <Link to="/signup" style={{ color: 'blue' }}>Sign Up</Link>
              </Typography>
            </form>
          </Box>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
