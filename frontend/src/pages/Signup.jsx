import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../components/Nav';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../apiConfig';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '' // Add username field
  });
  const [emptyFields, setEmptyFields] = useState({}); // State to track empty fields
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Use navigate for navigation
  const signupRef = useRef(null); // Create a ref for the signup container

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Update emptyFields state based on the input change
    setEmptyFields(prev => ({ ...prev, [name]: value.trim() === '' }));
  };

  const scrollToSignup = () => {
    signupRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSignUp = async () => {
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(emptyFields).some(isEmpty => isEmpty);
    if (isAnyFieldEmpty) {
      alert("Please fill in all required fields.");
      return; // Prevent the sign-up logic from running
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Prepare data for submission
    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      username: formData.username // Include username in the data
    };

    try {
      // Send POST request to signup API endpoint
      const apiUrl = `${api.apiHost}/auth_app/signup/`
      const response = await axios.post(apiUrl, userData);
      console.log(response.data);
      const success_message = `Account successfully created ${response.data.username}`;
      setSuccessMessage(success_message);

      // After successful signup, redirect to login page
      // Uncomment the following line and replace '/login' with your actual login route
      // history.push('/login');
    } catch (error) {
      const failure_message = `For some reason your account was not created please try again`;
      setSuccessMessage(failure_message);
      console.error("Error signing up:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      {successMessage && ( // Conditionally render success message
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh" // Adjust the height as needed
          textAlign="center"
          borderBottom="20px"
        >
          <p>{successMessage}</p>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Go to login
          </Button> <br></br>
          <Button variant="contained" color="primary" onClick={scrollToSignup}>
            Sign up
          </Button>
        </Box>
      )}
      <Container >
        <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              ref={signupRef}
              name="username" // Add username TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.username} // Highlight if empty
              helperText={emptyFields.username && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.email} // Highlight if empty
              helperText={emptyFields.email && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.firstName} // Highlight if empty
              helperText={emptyFields.firstName && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.lastName} // Highlight if empty
              helperText={emptyFields.lastName && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.password} // Highlight if empty
              helperText={emptyFields.password && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required // Mark as required
              error={emptyFields.confirmPassword} // Highlight if empty
              helperText={emptyFields.confirmPassword && "This field is required"} // Show helper text if empty
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
