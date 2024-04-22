import React from 'react';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

const UserProfileAvatar = ({ imageUrl }) => {
  return (
    <Avatar
      alt="User Avatar" src={imageUrl}
      sx={{ width: 100, height: 100, margin: '0 auto' }}>
      {imageUrl ? null : <PersonIcon sx={{ fontSize: 60, color: 'gray' }} />}
    </Avatar>
  );
};

export default UserProfileAvatar;
