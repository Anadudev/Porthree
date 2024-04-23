import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Button,
  Box, CircularProgress,
} from '@mui/material';
import SectionHeader from './SectionHeader';
import PostCard from './PostCard';
import { Blogs as pj } from '../../data/Info';
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
    <Box
      spacing={2}
      sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {pj.map((data, index) => (
        <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PostCard mode={'Blog Post'} />
        </Grid>
      ))}
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
      <SectionHeader title={'Helpful writings'} custom={user} />
      <Box sx={{ width: '100%' }}>
        <CustomTabPanel value={value} index={0}>
          <Box
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {blog.loading ? <Typography>Loading posts.<CircularProgress size={18} color="inherit" /> </Typography> : (blog && blog.slice(0, 6).map((data, index) => (
              <Box item key={index}>
                <PostCard type='Project' post={data} mode={"Blog Post"} />
              </Box>
            )))}


          </Box>
          <Button component={Link} to={`/${user?.username}/posts`} sx={{ color: `${user?.secondary_color || ''}` }}>More...</Button>
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
