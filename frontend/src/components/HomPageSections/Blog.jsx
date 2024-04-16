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


const Blog = () => {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const data = async () => {
      const result = await GetDatas('posts');
      setPosts(result.results)
    }
    data();
  }, [])
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!posts || posts.length <= 0) {
    return null;
  }


  return (
    <Box id='blog'>
      <SectionTitle title={'posts'} caption={'some posts by users on our platform'} />
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
              {posts.loading ? <Typography>Loading posts.<CircularProgress size={18} color="inherit" /> </Typography> : (posts && posts.slice(0, 8).map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Post' post={data} mode={"Post"} />
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
              {posts?.map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Post' />
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
              {posts?.map((data, index) => (
                <Grid item key={index}  {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className=" p-2">
                    <PostCard type='Post' />
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

export default Blog;