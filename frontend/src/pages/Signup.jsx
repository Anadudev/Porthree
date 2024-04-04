import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import api from '../../apiConfig';
import { NavLinks } from '../data/NavLinks';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import PageTitle from './PageTitle';

const Signup = () => {
  PageTitle("SignUp");
  const navigate = useNavigate();
  const signupRef = useRef(null);
  const [success, setSuccess] = useState('');

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
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(10, 'Password must be at least 10 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers').required('Username is required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await axios.post(`${api.apiHost}/auth_app/signup/`, values);
        const success_message = `Account successfully created ${response.data.username}`;
        setSuccess(<Alert severity="success">{success_message}.</Alert>);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage = error.response.data;
          Object.entries(errorMessage).forEach(([key, value]) => {
            setErrors({ [key]: value[0] })
          });
        }
      }
    }
  });

  return (
    <div>
      <DrawerAppBar pages={NavLinks} />
      <div className='p-[50px]'>
        <Breadcrumb path={useLocation()} />
        <Container>
          {success}
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('first_name')}
                  label="first_name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.first_name && formik.errors.first_name}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('last_name')}
                  label="last_name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.last_name && formik.errors.last_name}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('username')}
                  ref={signupRef}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.username && formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...formik.getFieldProps('email')}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps('password')}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps('confirmPassword')}
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
