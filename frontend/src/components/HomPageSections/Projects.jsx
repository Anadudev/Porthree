import React, { useEffect, useState } from 'react';
import { GetDatas } from '../../data/GetUser';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import PostCard from '../PortfolioSections/PostCard';
import SectionTitle from './SectionTitle';
import CircularProgress from '@mui/material/CircularProgress';


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
    const data = async () => {
      const result = await GetDatas('projects');
      setProjects(result.results)
    }
    data();
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
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            scrollButtons
            allowScrollButtonsMobile
            centered
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box> */}
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {projects.loading ? <Typography>Loading Projects.<CircularProgress size={18} color="inherit" /> </Typography> : (
                projects && projects.slice(0, 8).map((data, index) => (
                  <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box className=" p-2">
                      <PostCard type='Project' post={data} mode={"Project"} />
                    </Box>
                  </Grid>
                )))}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {projects?.map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Project' />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {projects.map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Project' />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

export default Projects