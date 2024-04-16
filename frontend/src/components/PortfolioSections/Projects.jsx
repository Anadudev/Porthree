import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import SectionHeader from './SectionHeader';
import PostCard from './PostCard';
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

const Projects = ({ projects }) => {
  if (!projects || projects.length <= 0) {
    return null;
  }
  // console.log(projects)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id='projects'>
      <SectionHeader title={'awesome works'} />
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
              {projects && projects.slice(0, 6).map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Project' post={data} mode={"Project"} />
                  </Box>
                </Grid>
              ))}
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
  );
}

export default Projects;
