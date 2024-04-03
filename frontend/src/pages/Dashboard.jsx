import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import DrawerAppBar from "../components/Nav";
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

const boardStructure = {
  profile: <UserComponent />,
  tools: <ToolsComponent />,
  projects: <ProjectsComponent />,
  education: <EducationsComponent />,
  experience: <ExperienceComponent />,
  posts: <PostsComponent />,
};

const Dashboard = () => {
  const navigation = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user")).username;
  const navigate = useNavigate();

  useEffect(() => {
    if (navigation.pathname.split('/')[2] !== currentUser) {
      navigate('/login');
      return;
    }
  }, [currentUser, navigation.pathname, navigate]);

  PageTitle("Dashboard");
  const [activeLink, setActiveLink] = useState('profile');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks} />
      <Breadcrumb path={useLocation()} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <nav>
              <List component="nav" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {Object.keys(boardStructure).map((link) => (
                  <ListItem key={link} button onClick={() => handleLinkClick(link)} selected={activeLink === link}>
                    <ListItemIcon>
                      {link === 'profile' && <UserIcon />}
                      {link === 'tools' && <ToolsIcon />}
                      {link === 'projects' && <ProjectsIcon />}
                      {link === 'education' && <EducationIcon />}
                      {link === 'experience' && <WorkIcon />}
                      {link === 'posts' && <PostsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={link} />
                  </ListItem>
                ))}
              </List>
            </nav>
          </Grid>
          <Grid item xs={12}>
            {boardStructure[activeLink]}
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment >
  );
};

export default Dashboard;
