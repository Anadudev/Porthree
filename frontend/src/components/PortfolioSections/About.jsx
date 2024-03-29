import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SectionHeader from './SectionHeader';
import { About as ab, Experience, Education } from '../../data/Info';

const About = () => {
  return (
    <Box sx={{ width: '100%' }} id="about">
      <SectionHeader title={'about'} />
      <Box>
        <Typography variant='h5' component={'p'} className='uppercase'>who am i?</Typography>
        <Typography my={'20px'}>{ab.about}</Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
        <Grid item xs={12} sm={6} md={6} mb={{xs:'40px'}}>
          <Card className={'p-2 xl:p-6'}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Education</Typography>
            {Education.map((data) => (
              <Box key={data.id} className="my-2 xl:my-6" >
                <Paper elevation={6} className='p-2'>
                  <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid item xs={4}>
                      <Typography variant='p' component='p' className='text-sm'>{data.start} - {data.end}</Typography>
                      <Typography variant='p' component='p' className='font-bold capitalize'>{data.institute}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='p' component='p' className='font-bold capitalize'>{data.degree}</Typography>
                      <Typography variant='p' component='p' >{data.detail}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>))}
          </Card>
        </Grid>
        <Grid item  xs={12} sm={6} md={6}>
          <Card className={'p-2 xl:p-6'}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Experience</Typography>
            {Experience.map((data) => (
              <Box key={data.id} className="my-2 xl:my-6" >
                <Paper elevation={6} className='p-2'>
                  <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid item xs={4}>
                      <Typography variant='p' component='p' className='text-sm'>{data.start} - {data.end}</Typography>
                      <Typography variant='p' component='p' className='font-bold capitalize'>{data.company}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='p' component='p' className='font-bold capitalize'>{data.position}</Typography>
                      <Typography variant='p' component='p' >{data.detail}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default About;
