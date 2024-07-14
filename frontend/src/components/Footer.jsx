import React from 'react';
import {
  Paper, BottomNavigation, Typography,Box
} from '@mui/material';

/**
 * Renders a footer component with the current year in the copyright text.
 *
 * @return {JSX.Element} The footer component.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box  sx={{mt:2, borderTop:`2px solid` }} >
        <BottomNavigation
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Typography
            // noWrap
            sx={{
              fontWeight: 700,
              color: 'inherit',
            }}
            className='text-center'
          >Porthree copyright {year} </Typography>
          {/* <BottomNavigationAction /> */}
        </BottomNavigation>
    </Box>
  );
}
