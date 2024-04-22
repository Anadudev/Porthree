import React, { useState } from 'react';
import { IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ProfilePicture = ({ onFileSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle the upload logic here
    onFileSelect(selectedFile); // Pass selected file to parent
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Avatar>
          <PhotoCameraIcon />
        </Avatar>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePicture;
