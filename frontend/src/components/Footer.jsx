import * as React from 'react';
import {
  Paper, BottomNavigation, Typography,
  BottomNavigationAction, CssBaseline
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './Nav';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}
