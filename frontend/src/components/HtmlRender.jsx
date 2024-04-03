import React from 'react';
import { Typography } from '@mui/material';

const HTMLRenderer = ({ htmlContent }) => {
  return (
    <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HTMLRenderer;
