import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, Avatar } from '@mui/material';
import Logout from './Logout';
import axios from 'axios';
import PhoneNumberInputWithLocation from '../PnoneNumberInput';

const UserComponent = () => {
 const [user, setUser] = useState({}); // State to store user data
 const [isEdit, setIsEdit] = useState(false); // Flag for edit mode
 const [isLoading, setIsLoading] = useState(false); // Flag for loading state
 const [error, setError] = useState(null); // State to store errors

 const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming userId is stored in localStorage
  
 // Fetch user data on component mount
 useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
        setUser(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
 }, [userId]); // Dependency array to trigger refetch on userId change

 // CRUD operations (edit only)
 const handleEdit = () => setIsEdit(true);
 const handleCancelEdit = () => setIsEdit(false);

 const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
 };

 const handleSave = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Retrieve the access token from local storage
      const token = localStorage.getItem('access_token');

      // Include the token in the request headers
      const response = await axios.put(`http://localhost:8000/api/users/${userId}/`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data); // Update state with updated user data
      setIsEdit(false); // Exit edit mode
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
 };

 return (
    <div>
      {error ? (
        <Typography variant="error">{error.message}</Typography>
      ) : isLoading ? (
        <Typography variant="body2">Loading user data...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Avatar
                alt="Profile Picture"
                src={user.picture || 'https://via.placeholder.com/150'} // Dummy image URL
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />
              {isEdit ? (
                <>
                   <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Picture"
                        name="picture"
                        value={user.picture || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Middle Name"
                        name="middle_name"
                        value={user.middle_name || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <PhoneNumberInputWithLocation value={user.phone || ''} onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Career"
                        name="career"
                        value={user.career || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Bio"
                        name="bio"
                        value={user.bio || ''}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Location"
                        name="location"
                        value={user.location || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="About"
                        name="about"
                        value={user.about || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Primary Color"
                        name="primary_color"
                        value={user.primary_color || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Secondary Color"
                        name="secondary_color"
                        value={user.secondary_color || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Resume"
                        name="resume"
                        value={user.resume || ''}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                 <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                 </Button>
                 <Button variant="contained" onClick={handleCancelEdit}>
                    Cancel
                 </Button>
                </>
              ) : (
                <>
                 <Typography variant="body1">Username:</Typography>
                 <Typography variant="body2">{user.username}</Typography>
                 <Typography variant="body1">First Name:</Typography>
                 <Typography variant="body2">{user.first_name}</Typography>
                 <Typography variant="body1">Last Name:</Typography>
                 <Typography variant="body2">{user.last_name}</Typography>
                 <Typography variant="body1">Email:</Typography>
                 <Typography variant="body2">{user.email}</Typography>
                 <Typography variant="body1">Bio:</Typography>
                 <Typography variant="body2">{user.bio || 'No bio provided'}</Typography>
                 <Typography variant="body1">Location:</Typography>
                 <Typography variant="body2">{user.location || 'No location provided'}</Typography>
                 <Button variant="contained" onClick={handleEdit}>
                    Edit Profile
                 </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Logout />
          </Grid>
        </>
      )}
    </div>
 );
};

export default UserComponent;
