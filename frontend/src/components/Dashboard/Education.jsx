import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const EducationsComponent = () => {
 const [educations, setEducations] = useState([]); // State to store educations data
 const [isLoading, setIsLoading] = useState(false); // Flag for loading state
 const [error, setError] = useState(null); // State to store errors
 const [newEducation, setNewEducation] = useState({
    institute: '',
    degree: '',
    start_date: '',
    end_date: '',
    detail: '',
 }); // State for new education input
 const [editingEducation, setEditingEducation] = useState(null); // State to track the education being edited

 // Retrieve the userId from local storage
 const userId = JSON.parse(localStorage.getItem('user')).id;
 // Retrieve the access token from local storage
 const token = localStorage.getItem('access_token');

 // Fetch educations data on component mount
 useEffect(() => {
    const fetchEducations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/educations/`);
        setEducations(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
 }, [userId]); // Dependency array includes userId to refetch if it changes

 const handleAddEducation = async () => {
  setIsLoading(true);
  setError(null); // Clear previous errors
  try {
    // Prepare the data for the POST request, specifying user
    const educationData = { ...newEducation, user: userId };

    // Send the POST request with the Authorization header
    const response = await axios.post(`http://localhost:8000/api/educations/`, educationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the API expects JSON data
      },
    });
    console.log(response)

    setEducations([...educations, response.data]); // Update state with new education
    setNewEducation({ institute: '', degree: '', start_date: '', end_date: '', detail: '' }); // Clear input
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

const handleDeleteEducation = async (educationId) => {
  setIsLoading(true);
  setError(null); // Clear previous errors
  try {
    // Send the DELETE request with the Authorization header
    await axios.delete(`http://localhost:8000/api/educations/${educationId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEducations(educations.filter(education => education.id !== educationId)); // Update state by removing deleted education
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

 const handleEditEducation = (education) => {
    setEditingEducation(education);
    setNewEducation(education);
 };

 const handleUpdateEducation = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Prepare the data for the PUT request, specifying user
      const educationData = { ...newEducation, user: userId };

      // Send the PUT request with the Authorization header
      const response = await axios.put(`http://localhost:8000/api/educations/${editingEducation.id}/`, educationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Assuming the API expects JSON data
        },
      });

      // Update the state with the updated education
      setEducations(educations.map(education => education.id === editingEducation.id ? response.data : education));
      setEditingEducation(null); // Clear the editing state
      setNewEducation({ institute: '', degree: '', start_date: '', end_date: '', detail: '' }); // Clear input
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
        <Typography variant="body2">Loading educations...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              {/* Form for adding or editing an education */}
              <form>
                <TextField
                  label="Institute"
                  name="institute"
                  value={newEducation.institute}
                  onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                  required
                  fullWidth
                />
                <TextField
                  label="Degree"
                  name="degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  required
                  fullWidth
                />
                <TextField
                  label="Start Date"
                  type="date"
                  name="start_date"
                  value={newEducation.start_date}
                  onChange={(e) => setNewEducation({ ...newEducation, start_date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                />
                <TextField
                  label="End Date"
                  type="date"
                  name="end_date"
                  value={newEducation.end_date}
                  onChange={(e) => setNewEducation({ ...newEducation, end_date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Detail"
                  name="detail"
                  value={newEducation.detail}
                  onChange={(e) => setNewEducation({ ...newEducation, detail: e.target.value })}
                  required
                  fullWidth
                />
                {/* Other fields for degree, start_date, end_date, detail */}
              <Button variant="contained" color="primary" onClick={editingEducation ? handleUpdateEducation : handleAddEducation}>
                {editingEducation ? 'Update Education' : 'Add Education'}
              </Button>
            </form>
              <List>
                {educations.map((education) => (
                 <ListItem key={education.id}>
                    <ListItemText primary={`${education.institute} - ${education.degree}`} secondary={education.detail} />
                    <Button variant="contained" color="secondary" onClick={() => handleEditEducation(education)}>
                      Edit
                    </Button><br/>
                    <Button variant="contained" color="error" onClick={() => handleDeleteEducation(education.id)}>
                      Delete
                    </Button>
                 </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </div>
 );
};

export default EducationsComponent;
