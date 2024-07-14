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
import Limiter from '../Limiter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export function ScrollDialog({ about }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('body')}>See more</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{about.username}'s About</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {about.about || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


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
              <Typography my={'20px'}>{Limiter(user.about, 500)}</Typography>
              {user.about.length > 500 && <ScrollDialog about={user} />}
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
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>{education.length > 1 ? 'Educations' : 'Education'}</Typography>
            {education?.length > 0 && education.slice(0, 4).map((data, index) => (
              <AboutCard key={index} data={data} customize={user} />
            ))}
            <Button component={Link} to={`/${user?.username}/educations`} sx={{ color: `${user?.secondary_color || ''}` }}>More...</Button>
          </Card>
        </Grid>}
        {experience && experience.length > 0 && <Grid item xs={12} sm={6} md={6}>
          <Card className={`p-2 xl:p-6`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>{experience.length > 1 ? 'Experiences' : 'Experience'}</Typography>
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
