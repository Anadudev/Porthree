import React from 'react'
import SectionHeader from './SectionHeader'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Limiter from '../Limiter';

const Skills = ({ skills }) => {
  if (!skills || skills.length < 1) {
    return null;

  }
  return (
    <Box component="section" id="skills">
      <SectionHeader title={'What i do'} />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {skills.map((data) => (
            <Grid key={data.id} {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Box className=" p-2">
                <Typography component='p' className='uppercase' sx={{ fontWeight: '900' }}>{data.skill}</Typography>
                <Typography variant='p' component='p'>{Limiter(data.detail, 200)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Skills;
