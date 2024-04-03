import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const ToolsComponent = () => {
 const [tools, setTools] = useState([]); // State to store tools data
 const [isLoading, setIsLoading] = useState(false); // Flag for loading state
 const [error, setError] = useState(null); // State to store errors
 const [newTool, setNewTool] = useState(''); // State for new tool input

 // Retrieve the userId from local storage
 const userId = JSON.parse(localStorage.getItem('user')).id;
// Retrieve the access token from local storage
const token = localStorage.getItem('access_token');

 // Fetch tools data on component mount
 useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/tools/`);
        setTools(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
 }, [userId]); // Dependency array includes userId to refetch if it changes

 const handleAddTool = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {

      // Prepare the data for the POST request, specifying user
      const toolData = { tool: newTool, user: userId };


      // Send the POST request with the Authorization header
      const response = await axios.post(`http://localhost:8000/api/tools/`, toolData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Assuming the API expects JSON data
        },
      });

      setTools([...tools, response.data]); // Update state with new tool
      setNewTool(''); // Clear input
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
 };

 const handleDeleteTool = async (toolId) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {

      // Send the DELETE request with the Authorization header
      await axios.delete(`http://localhost:8000/api/tools/${toolId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTools(tools.filter(tool => tool.id !== toolId)); // Update state by removing deleted tool
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
        <Typography variant="body2">Loading tools...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <TextField
                label="New Tool"
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleAddTool}>
                Add Tool
              </Button>
              <List>
                {tools.map((tool) => (
                 <ListItem key={tool.id}>
                    <ListItemText primary={tool.tool} />
                    <Button variant="contained" color="error" onClick={() => handleDeleteTool(tool.id)}>
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

export default ToolsComponent;