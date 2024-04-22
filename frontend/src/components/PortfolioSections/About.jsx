import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Button, Avatar, Card } from '@mui/material';
import Box from '@mui/material/Box';
import SectionHeader from './SectionHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggestOutlined'; import AboutCard from './AboutCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ToolsList({ tools }) {
  if (!tools || tools.length === 0) {
    return null;
  }
  if (tools.loading) {
    return <CircularProgress color="inherit" />
  }
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className='flex flex-wrap'>
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
            {/* {index == 3 || index !== tools.length - 1 && <Divider variant="inset" component="li" />} */}
          </div>
        ))}
      </List>
    </>
  );
}




const About = ({ user, tools, education, experience }) => {
  if (user.about === '' && (!tools || tools.length <= 0) && (!education || education.length <= 0) && (!experience || experience.length <= 0)) { return null }
  return (
    <Box sx={{ width: '100%' }} id="about">
      <SectionHeader title={'about'} custom={user} />
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
