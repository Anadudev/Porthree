import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';


export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div>
      <Paper elevation={0} sx={{ height: '120px' }}></Paper>
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
    </div>
  );
}
