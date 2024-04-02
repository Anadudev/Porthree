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
import PostsIcon from '@mui/icons-material/PostAdd';
import Logout from '../components/Dashboard/Logout';
import UserComponent from '../components/Dashboard/User';
import ToolsComponent from '../components/Dashboard/Tools';
import ProjectsComponent from '../components/Projects';
import EducationComponent from '../components/Projects';
import PostsComponent from '../components/Dashboard/Posts';
import PageTitle from './PageTitle';
import { GetItem } from '../data/GetUser';

const boardStructure = {
  user: <UserComponent />,
  tools: <ToolsComponent />,
  projects: <ProjectsComponent />,
  education: <EducationComponent />,
  posts: <PostsComponent />,
};



const Dashboard = () => {
  const navigation = useLocation();
  // console.log(JSON.stringify(JSON.parse(localStorage.getItem("user")).username));
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  // console.log(localStorage.getItem("access_token"));
  useEffect(() => {
    // Check if the pathname matches the current user
    if (!localStorage.getItem("access_token") || navigation.pathname.split('/')[2] !== currentUser.username) {
      // If not, navigate to the login page
      navigate('/login');
    }
    const getter = async () => (setUser(await GetItem('users', currentUser.id)));
    getter();
  }, [currentUser.username, currentUser.id, navigation.pathname, navigate]); // useEffect dependencies


  PageTitle("Dashboard");
  const [activeLink, setActiveLink] = useState('user'); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks(user)} />
      <Breadcrumb path={useLocation()} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Dashboard
            </Typography>
          </Grid>
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
