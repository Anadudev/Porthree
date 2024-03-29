import React from 'react'
import SectionHeader from './SectionHeader'
import { List, Box, Paper, TextField, FormControl, Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function ContactForm() {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div className='flex flex-col justify-center w-full'>

        <Box className="sm:flex pl-3 block w-full justify-between">
          <FormControl className='sm:w-[48%] w-full' variant="outlined">
            <TextField
              id="outlined-adornment-password"
              type={'text'}
              label="Name"
            />
          </FormControl>
          <div className=' sm:hidden block h-3'></div>
          <FormControl className='sm:w-[48%] w-full' variant="outlined">
            <TextField
              id="outlined-adornment-password"
              type={'text'}
              label="Email"
            />
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="outlined-adornment-amount"
            label="Subject"
            type={'text'}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="outlined-adornment-amount"
            label="Message"
            multiline
            rows={6}
          />
        </FormControl>
      </div>
    </Box>
  );
}

export function ContactList({ location, phone, mail, socials }) {
  return (
    <Paper elevation={6} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={location || "location"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={phone || "phone"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={mail || "Inbox"} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Paper>
  );
}
const Contact = () => {
  return (
    <Box className="mt-20">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
        <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>

          <SectionHeader title={'contact address'} side={true} />
          <ContactList />
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>

          <ContactForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact;
