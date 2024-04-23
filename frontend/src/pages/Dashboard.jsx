import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Container, Grid, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import UserIcon from '@mui/icons-material/Person';
import ToolsIcon from '@mui/icons-material/Build';
import ProjectsIcon from '@mui/icons-material/Work';
import EducationIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PostsIcon from '@mui/icons-material/PostAdd';
import Logout from '../components/Dashboard/Logout';
import UserComponent from '../components/Dashboard/User';
import ToolsComponent from '../components/Dashboard/Tools';
import ProjectsComponent from '../components/Dashboard/Projects';
import EducationsComponent from '../components/Dashboard/Education';
import PostsComponent from '../components/Dashboard/Posts';
import ExperienceComponent from '../components/Dashboard/Experience';
import PageTitle from './PageTitle';
import { GetItem } from '../data/GetUser';
import { useLoaderData } from "react-router-dom";

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


/**
 * Object containing the structure of the dashboard with keys as section names and values as React components.
 */
const boardStructure = {
  posts: { component: <PostsComponent />, icon: <PostsIcon /> },
  projects: { component: <ProjectsComponent />, icon: <ProjectsIcon /> },
  experience: { component: <ExperienceComponent />, icon: <WorkIcon /> },
  education: { component: <EducationsComponent />, icon: <EducationIcon /> },
  tools: { component: <ToolsComponent />, icon: <ToolsIcon /> },
  profile: { component: <UserComponent />, icon: <UserIcon /> },
};

export function SpeedDialTooltipOpen({ propActiveLink }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function activateLink(active) {
    propActiveLink(active);
    handleClose();
  }

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: "fixed", right: 1, bottom: "6rem" }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {Object.keys(boardStructure).map((key, index) => (
          <SpeedDialAction
            key={index}
            icon={boardStructure[key].icon}
            tooltipTitle={<p className='capitalize'>{key}</p>}
            tooltipOpen
            onClick={() => activateLink(key)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}





/**
 * Dashboard component for displaying the user's dashboard.
 * @returns {JSX.Element} The JSX element representing the dashboard.
 */
const Dashboard = () => {
  const userData = useLoaderData();
  // console.log("userData",userData);
  const intialUser = (userData.results)[0];
  const [user, setUser] = useState(intialUser);
  const data = JSON.parse(localStorage.getItem('user'))
  const navigation = useLocation();

  useEffect(() => {
    setUser(data);
  }, [data])

  PageTitle("Dashboard");
  const [activeLink, setActiveLink] = useState('profile');
  /**
   * Handles the click event to set the active link in the dashboard navigation.
   * @param {string} link - The name of the link to be set as active.
   */
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // console.log(user);
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
      <Box padding={{ xs: "10px", sm: "50px" }}>
        <Breadcrumb path={navigation} />
        <Container>

          <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
            <SpeedDialTooltipOpen propActiveLink={setActiveLink} />
            <Grid item xs={12}>
              {boardStructure[activeLink].component}
            </Grid>
            <Grid item xs={12}>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </React.Fragment >
  );
};

export default Dashboard;
