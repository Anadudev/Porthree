import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Button,
  TextField, List, ListItem,
  ListItemText, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import api from '../../../apiConfig';
import axios from 'axios';

const EducationsComponent = () => {
  const [educations, setEducations] = useState([]); // State to store educations data
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // State to store errors
  const [newEducation, setNewEducation] = useState({
    institute: '',
    degree: '',
    start_date: '',
    end_date: null,
    detail: '',
  }); // State for new education input
  const [editingEducation, setEditingEducation] = useState(null); // State to track the education being edited
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  // Retrieve the userId from local storage
  const userId = JSON.parse(localStorage.getItem('user'));
  // Retrieve the access token from local storage
  const token = localStorage.getItem('access_token');

  // Fetch educations data on component mount
  useEffect(() => {
    const fetchEducations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId.id}/educations/`);
        setEducations(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, [userId.id]); // Dependency array includes userId to refetch if it changes

  const handleAddEducation = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Prepare the data for the POST request, specifying user
      const educationData = { ...newEducation, user: userId.url };
      // console.log(educationData)
      // Send the POST request with the Authorization header
      const response = await axios.post(`http://localhost:8000/api/educations/`, educationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Assuming the API expects JSON data
        },
      });

      setEducations([...educations, response.data]); // Update state with new education
      setNewEducation({ institute: '', degree: '', start_date: '', end_date: null, detail: '' }); // Clear input
      setOpenDialog(false); // Close dialog after adding education
    } catch (error) {
      // console.log(error)
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
    setOpenDialog(true); // Open dialog for editing education
  };

  const handleUpdateEducation = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Prepare the data for the PUT request, specifying user
      const educationData = { ...newEducation, user: userId.url };

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
      setNewEducation({ institute: '', degree: '', start_date: '', end_date: null, detail: '' }); // Clear input
      setOpenDialog(false); // Close dialog after updating education
    } catch (error) {
      // console.log(error)
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (editingEducation) {
      handleUpdateEducation();
    } else {
      handleAddEducation();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEducation({ institute: '', degree: '', start_date: '', end_date: '', detail: '' }); // Clear input on dialog close
    setEditingEducation(null); // Clear editing state on dialog close
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
              {/* Button to open dialog for adding new education */}
              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Add Education
              </Button>
              {/* Dialog for adding/editing education */}
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editingEducation ? 'Edit Education' : 'Add Education'}</DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Institute"
                          name="institute"
                          value={newEducation.institute}
                          onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Degree"
                          name="degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="End Date"
                          type="date"
                          name="end_date"
                          value={newEducation.end_date || null}
                          onChange={(e) => setNewEducation({ ...newEducation, end_date: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Detail"
                          name="detail"
                          value={newEducation.detail}
                          onChange={(e) => setNewEducation({ ...newEducation, detail: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary">
                        {editingEducation ? 'Update Education' : 'Add Education'}
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
              {/* List of educations */}
              <List>
                {educations.map((education, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${education.institute} - ${education.degree}`} secondary={education.detail} />
                    {/* Buttons for editing and deleting educations */}
                    <Button variant="contained" color="secondary" onClick={() => handleEditEducation(education)}>
                      Edit
                    </Button><br />
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
