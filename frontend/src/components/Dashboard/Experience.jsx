import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const ExperienceComponent = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    start_date: '',
    end_date: null,
    detail: '',
  });
  const [editingExperience, setEditingExperience] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = JSON.parse(localStorage.getItem('user')).id;
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchExperiences = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/experiences/`);
        setExperiences(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, [userId]);

  const handleAddExperience = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const experienceData = { ...newExperience, user: userId };
      const response = await axios.post(`http://localhost:8000/api/experiences/`, experienceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setExperiences([...experiences, response.data]);
      setNewExperience({ company: '', position: '', start_date: '', end_date: null, detail: '' });
      setOpenDialog(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/api/experiences/${experienceId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExperiences(experiences.filter(experience => experience.id !== experienceId));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setNewExperience(experience);
    setOpenDialog(true);
  };

  const handleUpdateExperience = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const experienceData = { ...newExperience, user: userId };

      const response = await axios.put(`http://localhost:8000/api/experiences/${editingExperience.id}/`, experienceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setExperiences(experiences.map(experience => experience.id === editingExperience.id ? response.data : experience));
      setEditingExperience(null);
      setNewExperience({ company: '', position: '', start_date: '', end_date: null, detail: '' });
      setOpenDialog(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExperience) {
      handleUpdateExperience();
    } else {
      handleAddExperience();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewExperience({ company: '', position: '', start_date: '', end_date: '', detail: '' });
    setEditingExperience(null);
  };

  return (
    <div>
      {error ? (
        <Typography variant="error">{error.message}</Typography>
      ) : isLoading ? (
        <Typography variant="body2">Loading experiences...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Add Experience
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editingExperience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Company"
                          name="company"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Position"
                          name="position"
                          value={newExperience.position}
                          onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Start Date"
                          type="date"
                          name="start_date"
                          value={newExperience.start_date}
                          onChange={(e) => setNewExperience({ ...newExperience, start_date: e.target.value })}
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
                          value={newExperience.end_date || null}
                          onChange={(e) => setNewExperience({ ...newExperience, end_date: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Detail"
                          name="detail"
                          value={newExperience.detail}
                          onChange={(e) => setNewExperience({ ...newExperience, detail: e.target.value })}
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
                        {editingExperience ? 'Update Experience' : 'Add Experience'}
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
              <List>
                {experiences.map((experience, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${experience.company} - ${experience.position}`} secondary={experience.detail} />
                    <Button variant="contained" color="secondary" onClick={() => handleEditExperience(experience)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteExperience(experience.id)}>
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

export default ExperienceComponent;
