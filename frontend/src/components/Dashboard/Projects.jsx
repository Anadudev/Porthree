import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    content: '',
    demo: '',
    video: '',
    publish: false, // New field for publish status
  });
  const [editingProject, setEditingProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = JSON.parse(localStorage.getItem('user')).id;
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/projects/`);
        setProjects(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleAddProject = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projectData = { ...newProject, user: userId };
      const response = await axios.post(`http://localhost:8000/api/projects/`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setProjects([...projects, response.data]);
      setNewProject({ title: '', content: '', demo: '', video: '', publish: false }); // Reset publish status
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({ ...project }); // Set the project details
    setOpenDialog(true);
  };

  const handleUpdateProject = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projectData = { ...newProject, user: userId };

      const response = await axios.put(`http://localhost:8000/api/projects/${editingProject.id}/`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setProjects(projects.map(project => project.id === editingProject.id ? response.data : project));
      setEditingProject(null);
      setNewProject({ title: '', content: '', demo: '', video: '', publish: false }); // Reset publish status
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      handleUpdateProject();
    } else {
      handleAddProject();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProject({ title: '', content: '', demo: '', video: '', publish: false }); // Reset publish status
    setEditingProject(null);
  };

  return (
    <div>
      {error ? (
        <Typography variant="error">{error.message}</Typography>
      ) : isLoading ? (
        <Typography variant="body2">Loading projects...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Add Project
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Title"
                          name="title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Content"
                          name="content"
                          value={newProject.content}
                          onChange={(e) => setNewProject({ ...newProject, content: e.target.value })}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Demo URL"
                          name="demo"
                          value={newProject.demo}
                          onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Video URL"
                          name="video"
                          value={newProject.video}
                          onChange={(e) => setNewProject({ ...newProject, video: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={newProject.publish}
                              onChange={(e) => setNewProject({ ...newProject, publish: e.target.checked })}
                              name="publish"
                              color="primary"
                            />
                          }
                          label="Publish"
                        />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary">
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
              <List>
                {projects.map((project) => (
                  <ListItem key={project.id}>
                    <ListItemText primary={project.title} secondary={project.content} />
                    <Button variant="contained" color="secondary" onClick={() => handleEditProject(project)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteProject(project.id)}>
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

export default ProjectsComponent;
