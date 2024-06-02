import React, { useEffect, useState } from 'react';
import { GetRelation } from '../../data/GetUser';
import PropTypes from 'prop-types';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
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


const Blog = () => {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetRelation(`http://127.0.0.1:8000/api/posts/?publish=true`);
      setPosts(result.results)
    }
    fetchData();
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
        <CustomTabPanel value={value} index={0}>
          <Box
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {posts.loading ? <Typography>Loading posts.<CircularProgress size={18} color="inherit" /> </Typography> : (posts && posts.slice(0, 8).map((data, index) => (
              <Box item key={index}>
                <PostCard type='Post' post={data} mode={"Post"} />
              </Box>
            )))}
          </Box>
          <Button component={Link} to={`/posts`}>Explore More posts...</Button>
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

export default Blog;
