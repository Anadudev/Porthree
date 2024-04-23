import React, { useEffect, useState } from 'react';
import { GetRelation } from '../../data/GetUser';
import PropTypes from 'prop-types';
import {
  Typography, Button,
  Box, CircularProgress
} from '@mui/material';
import PostCard from '../PortfolioSections/PostCard';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Projects = () => {

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetRelation(`http://127.0.0.1:8000/api/projects/?publish=true`);
      setProjects(result.results)
    }
    fetchData();
  }, [])
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!projects || projects.length <= 0) {
    return null;
  }

  return (
    <Box id='projects'>
      <SectionTitle title={'projects'} caption={'some projects by users on our platform'} />
      <Box sx={{ width: '100%' }}>
        <CustomTabPanel value={value} index={0}>

          <Box
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {projects.loading ? <Typography>Loading Projects.<CircularProgress size={18} color="inherit" /> </Typography> : (
              projects && projects.slice(0, 6).map((data, index) => (
                <Box item key={index}>
                  <PostCard type='Project' post={data} mode={"Project"} />
                </Box>
              )))}
          </Box>
          <Button component={Link} to={`/projects`}>More...</Button>
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

export default Projects