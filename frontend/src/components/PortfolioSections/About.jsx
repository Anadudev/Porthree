import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SectionHeader from './SectionHeader';
import { About as ab, Experience, Education } from '../../data/Info';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AboutCard from './AboutCard';


export function ToolsList({ tools }) {
  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tools.slice(0, 4).map((data, index) => (
        <div key={data.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={data.tool || ''} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={data.tool || ''}
            />
          </ListItem>
          {index == 3 || index !== tools.length - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
}




const About = ({ user, tools, education, experience }) => {
  if (user.about === '' &&  (!tools || tools.length <= 0) && (!education || education.length <= 0) && (!experience || experience.length <= 0)) { return null }
  return (
    <Box sx={{ width: '100%' }} id="about">
      <SectionHeader title={'about'} />
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
          <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
            <Typography variant='h5' component={'p'} className='uppercase'>who am i?</Typography>
            <Typography my={'20px'}>{user.about}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
            <Typography variant='h5' component={'p'} className='uppercase'>my tools</Typography>
            <ToolsList tools={tools} />
          </Grid>
        </Grid>
      </Box>
      {/* TODO: add a modal/popover element to view full detail */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
        {education && education.length > 0 && <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
          <AboutCard education={education} title={"Education"} />
        </Grid>}
        {experience && experience.length > 0 && <Grid item xs={12} sm={6} md={6}>
          <AboutCard experience={experience} title={"Experience"} />
        </Grid>}
      </Grid>
    </Box>
  );
}
export default About;
