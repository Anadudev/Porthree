import React from 'react';
import { Grid, TextField } from '@mui/material';

function ImageUploadandPreview({ newProject, setNewProject, editingProject, nature }) {

  const firsTU = () => nature[0].toUpperCase() + nature.slice(1); // make first letter of nature upppercase
  let imagePrev = null;

 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (nature === "post") {
        setNewProject({ ...newProject, post_image: file });
    } else {
        setNewProject({ ...newProject, image: file });
    }
 };

 if (nature === 'post') {
    imagePrev = newProject.post_image;
 } else {
    imagePrev = newProject.image;
 }

 return (
    <Grid item xs={12}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {imagePrev && (
          <img
            src={typeof imagePrev === 'string' ? imagePrev : URL.createObjectURL(imagePrev)}
            alt="Preview"
            style={{ marginRight: '10px', height: '100px', width: '200px', borderRadius: '15px 20px 18px 5px' }}
          />
        )}
        <TextField
          name="image"
          type="file"
          onChange={handleImageChange}
          inputProps={{ accept: 'image/*' }}
          InputLabelProps={{
            shrink: true, // Ensure the label is always in the shrunk state
          }}
          label={editingProject ? `Change ${firsTU()} Image` : `Choose ${firsTU()} Image`}
          style={{ marginTop: '10px' }}
          fullWidth
        />
      </div>
    </Grid>
 );
}

export default ImageUploadandPreview;
