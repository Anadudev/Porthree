import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';


export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px' }} elevation={3}>
      <BottomNavigation showLabels sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >Porthree </Typography>
        <Typography
          noWrap
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >Porthree copyright {year} </Typography>
        <BottomNavigationAction />
      </BottomNavigation>
    </Paper>
  );
}
