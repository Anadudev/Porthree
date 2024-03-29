import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
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
const boardStructure = {
  user: <UserComponent />,
  tools: <ToolsComponent />,
  projects: <ProjectsComponent />,
  education: <EducationComponent />,
  posts: <PostsComponent />,
};



const Dashboard = () => {
    PageTitle("Dashboard");
  const [activeLink, setActiveLink] = useState('user'); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks} />
      <Breadcrumb path={useLocation()} />
      <div>
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
                        {link === 'user' && <UserIcon />}
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
      </div>
      <Footer />
    </React.Fragment >
  );
};

export default Dashboard;
