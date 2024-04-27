import React from 'react';
import {
  Paper, BottomNavigation, Typography,
  BottomNavigationAction
} from '@mui/material';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Paper elevation={0} sx={{ height: '120px' }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px' }} elevation={3}>
        <BottomNavigation>
          <Typography
            noWrap
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
            }}
            className='text-center'
          >Porthree copyright {year} </Typography>
          <BottomNavigationAction />
        </BottomNavigation>
      </Paper>
    </Paper>
  );
}
