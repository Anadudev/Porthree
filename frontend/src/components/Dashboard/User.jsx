import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';

import Logout from './Logout';
import axios from 'axios';
import PhoneNumberInputWithLocation from '../PnoneNumberInput';
import UserProfileAvatar from './ProfilePicturePlaceholder';
import UserProfileDisplay from '../UserProfileDisplay';
import api from '../../../apiConfig';

const UserComponent = () => {
  const [user, setUser] = useState(new FormData()); // State to store user data
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
    // Create a copy of the user object
    const updatedUser = { ...user };

    // Check if files are present and handle accordingly
    if (event.target.files && event.target.files.length > 0) {
      updatedUser[event.target.name] = event.target.files[0];
    } else {
      updatedUser[event.target.name] = event.target.value;
    }
    // Update the state using functional updates
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    // console.log(updatedUser);
  };

  async function fetchPaginatedData(amount = 10) {
    const results = [];
    let currentPage = 1;
    let totalFetched = 0;

    try {
      while (totalFetched < amount) {
        const response = await fetch(`http://localhost:8000/api/users/4/posts/?page=${currentPage}`);
        const data = await response.json();
        const newData = data.results;

        results.push(...newData);
        totalFetched += newData.length;
        currentPage++;

        if (!data.next || totalFetched >= amount) {
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

    return results.slice(0, amount); // Return only the specified amount of data
  }

  // Usage example
  fetchPaginatedData(20)
    .then(results => {
      // Process the fetched results
      // console.log(results); 
    })
    .catch(error => {
      console.error('Error:', error);
    });


  const handleSave = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    // console.log(user)
    try {
      // Retrieve the access token from local storage
      const token = localStorage.getItem('access_token');

      // ensure only a file is sent
      if (!(user.picture instanceof File)) {
        delete user.picture
      }
      // console.log(user)
      const response = await axios.put(`http://localhost:8000/api/users/${userId}/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      // console.log(response.data);
      setUser(response.data); // Update state with updated user data
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsEdit(false); // Exit edit mode
    } catch (error) {
      setError(error);
      // console.log(error)
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

              <UserProfileAvatar imageUrl={user.picture} />

              {isEdit ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} >
                      <input
                        accept="image/*"
                        id="profile-picture"
                        name="picture"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                      />
                      <label htmlFor="profile-picture">
                        <Button variant="contained" component="span">
                          Upload/Change Profile Picture
                        </Button>
                      </label>
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
                        value={user.middle_name}
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
                      <PhoneNumberInputWithLocation value={user.phone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Career"
                        name="career"
                        value={user.career}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Bio"
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Location" bbffgh


                        name="location"
                        value={user.location}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="About"
                        name="about"
                        value={user.about}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Primary Color"
                        name="primary_color"
                        type='color'
                        value={user.primary_color || '#008000'}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Secondary Color"
                        name="secondary_color"
                        type='color'
                        value={user.secondary_color || '#660099'}
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
                  <UserProfileDisplay user={user} />
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
