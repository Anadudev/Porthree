import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton,
  Typography, Menu, Container, Avatar,
  Button, Tooltip, MenuItem, ButtonGroup,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { userTools } from '../data/NavLinks';

const settings = userTools();

function ResponsiveAppBar({ pages, custom }) {
  if (!pages) { return null }
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const toggleTheme = () => {
    localStorage.getItem('theme') === "light" ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
  }

  const OutUser = () => (<ButtonGroup variant="text" aria-label="Basic button group " color="inherit">
    <Button component={Link} to='/login' color="inherit">Login</Button>
    <Button component={Link} to='/signup' color="inherit">SignUp</Button>
    <Button onClick={() => toggleTheme()} color="inherit">Theme</Button>
  </ButtonGroup>)
  const InUser = () => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="U" src={settings[0].user.picture || ''} />
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
        {settings?.map((setting, index) => (
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
  )

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
            {/* app logo */}
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
            {/* nav toggler */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages?.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Button
                      component={Link}
                      to={page.url}
                    // onClick={handleCloseNavMenu}
                    // sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.title}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* site logo */}
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
