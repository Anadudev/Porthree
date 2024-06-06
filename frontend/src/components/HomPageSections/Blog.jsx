import React, { useEffect, useState } from 'react';
import { GetRelation } from '../../data/GetUser';
import { Button, Box, } from '@mui/material';
import PostCard from '../PortfolioSections/PostCard';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2/Grid2';


const Blog = () => {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetRelation(`http://127.0.0.1:8000/api/posts/?publish=true`);
      setPosts(result.results)
    }
    fetchData();
  }, [])

  if (!posts || posts.length <= 0) {
    return null;
  }


  return (
    <Box id='blog'>
      <SectionTitle title={'posts'} caption={'some posts by users on our platform'} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ justifyContent: 'center' }}>
            {posts && posts.slice(0, 6).map((data, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <PostCard type='Post' post={data} mode={"Post"} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button component={Link} to={`/posts`}>Explore More posts...</Button>
      </Box>
    </Box>
  )
}

export default Blog;
