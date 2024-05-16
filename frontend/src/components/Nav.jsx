import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, Toolbar, IconButton,
  Typography, Menu, Container, Avatar,
  Button, Tooltip, MenuItem, ButtonGroup,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { userTools } from '../data/NavLinks';


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export function TemporaryDrawer({ navItems, color }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, bgcolor: color }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            {/* <Button
                    component={Link}
                    to={page.url}
                  >
                    {page.title} */}
            <ListItemButton component={Link}
              to={item.url}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}



/**
 * Renders a responsive app bar with navigation links and user options.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.pages - An array of objects representing the navigation links.
 * @param {Object} props.custom - An object containing custom styling properties.
 * @return {JSX.Element} The rendered responsive app bar.
 */
function ResponsiveAppBar({ pages, custom }) {
  if (!pages) { return null }
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
/*   const [settings, setSettings] = useState('')
  useEffect(() => {
    setSettings(userTools())
  }, []) */
  const settings = userTools();


  const OutUser = () => (<ButtonGroup variant="text" aria-label="Basic button group " color="inherit">
    <Button component={Link} to='/login' color="inherit">Login</Button>
    <Button component={Link} to='/signup' color="inherit">SignUp</Button>
  </ButtonGroup>)
  const InUser = () => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="U" src={settings[0]?.user?.picture || ''} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings && settings?.map((setting, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            {setting.item || <Button
              component={Link}
              to={setting.url}
              onClick={handleCloseNavMenu}
            // sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {setting.title}
            </Button>
            }
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(user);

  return (
    <AppBar sx={{ bgcolor: custom?.primary_color || '' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Porthree
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <TemporaryDrawer navItems={pages} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Porthree
          </Typography>
          {/* large screen nav links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {localStorage.getItem('access_token') !== null ? InUser() : OutUser()}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
