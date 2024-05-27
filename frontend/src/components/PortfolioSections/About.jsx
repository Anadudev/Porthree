import * as React from 'react';
import SectionHeader from './SectionHeader';
import {
  Typography, Button, Avatar,
  Card, Grid, Box,
  List, ListItem, ListItemText,
  ListItemAvatar, CircularProgress,
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggestOutlined';
import AboutCard from './AboutCard';
import { Link } from 'react-router-dom';


export function ToolsList({ tools }) {
  if (!tools || tools.length === 0) {
    return null;
  }
  if (tools.loading) {
    return <CircularProgress color="inherit" />
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} className='flex flex-wrap'>
      {tools.slice(0, 4).map((data, index) => (
        <div key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ width: 50, height: 50 }}>
                <SettingsSuggestIcon fontSize='large' color='primary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography color="primary" sx={{ fontWeight: 500, fontSize: 25 }}>{data.tool || ''}</Typography>}
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
}


const About = ({ user, tools, education, experience }) => {
  if (user.about === '' && (!tools || tools.length <= 0) && (!education || education.length <= 0) && (!experience || experience.length <= 0)) { return null }
  return (
    <Box sx={{ width: '100%' }} id="about">
      <SectionHeader title={'about'} custom={user} />
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
          {user.about &&
            <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
              <Typography variant='h5' component={'p'} className='uppercase'>who am i?</Typography>
              <Typography my={'20px'}>{user.about}</Typography>
            </Grid>}
          {tools.length > 0 && <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
            <Typography variant='h5' component={'p'} className='uppercase'>my tools</Typography>
            <ToolsList tools={tools} />
          </Grid>}
        </Grid>
      </Box>
      {/* TODO: add a modal/popover element to view full detail */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
        {education && education.length > 0 && <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>
          <Card className={`p-2 xl:p-6`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Educations</Typography>
            {education?.length > 0 && education.slice(0, 4).map((data, index) => (
              <AboutCard key={index} data={data} customize={user} />
            ))}
            <Button component={Link} to={`/${user?.username}/educations`} sx={{ color: `${user?.secondary_color || ''}` }}>More...</Button>
          </Card>

        </Grid>}
        {experience && experience.length > 0 && <Grid item xs={12} sm={6} md={6}>
          <Card className={`p-2 xl:p-6`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Experiences</Typography>
            {/* <AboutCard data={experience}  customize={user} /> */}
            {experience?.length > 0 && experience.slice(0, 4).map((data, index) => (
              <AboutCard key={index} data={data} customize={user} />
            ))}
            <Button component={Link} to={`/${user?.username}/experiences`} sx={{ color: `${user?.secondary_color || ''}` }}>More...</Button>
          </Card>
        </Grid>}
      </Grid>
    </Box>
  );
}
export default About;
