import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import SectionHeader from './SectionHeader';
import PostCard from './PostCard';
import { Blogs as pj } from '../../data/Info';
import CircularProgress from '@mui/material/CircularProgress';
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


function TabData() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid
        container
        spacing={2}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {pj.map((data, index) => (
          <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box className=" p-2">
              <PostCard mode={'Blog Post'} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}


const Blogs = ({ blog, user }) => {
  if (!blog || blog.length <= 0) {
    return null;
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(blog)
  return (
    <Box id='blog'>
      <SectionHeader title={'Helpful writings'} />
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
              {blog.loading ? <Typography>Loading posts.<CircularProgress size={18} color="inherit" /> </Typography> : (blog && blog.slice(0, 6).map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Project' post={data} mode={"Blog Post"} />
                  </Box>
                </Grid>
              )))}

            </Grid>
            <Button component={Link} to={`/${user?.username}/posts`}>More...</Button>

          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabData />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TabData />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default Blogs;
