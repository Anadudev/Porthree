import React from 'react'
import SectionHeader from './SectionHeader'
import {
  Button, Link,
  List, Box, Paper,
  TextField, FormControl,
  Grid, ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function ContactForm(custom) {

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
        <Button varian="outlined" sx={{ color: `${custom?.secondary_color || ''}` }}>Send</Button>
      </div>
    </Box>
  );
}

export function ContactList({ contacts, socials }) {

  return (
    <Paper elevation={6} sx={{ width: '100%', height: '19rem', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {contacts.location && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={contacts.location || ""} />
            </ListItemButton>
          </ListItem>}
          <Divider />
          {contacts.phone && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={contacts.phone || ""} />
            </ListItemButton>
          </ListItem>
          }
          <Divider />
          {contacts.email && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={contacts.email || ""} />
            </ListItemButton>
          </ListItem>}
        </List>
      </nav>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
          height={'100%'}
        >
          {socials?.map((data, index) => (
            <Paper elevation={3} key={index} className="px-2 py-1 w-fit m-2 align-bottom self-end">
              <Link target="_blank" rel="noopener" href={data.url} className='capitalize' sx={{ fontWeight: '900', color: `${contacts?.secondary_color || ''}` }}>{data.social}</Link>
            </Paper>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
const Contact = ({ contacts, socials }) => {
  return (
    <Box className="mt-20" id='contact'>
      <SectionHeader title={'contact address'} side={true} custom={contacts} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} px={{ md: '100px' }}>
        <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>

          <ContactList contacts={contacts} socials={socials} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={{ xs: '40px' }}>

          <ContactForm custom={contacts} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact;
