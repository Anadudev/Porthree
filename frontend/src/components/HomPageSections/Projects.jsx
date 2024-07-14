import React, { useEffect, useState } from 'react';
import { GetRelation } from '../../data/GetUser';
import PropTypes from 'prop-types';
import {
  Typography, Button,
  Box, CircularProgress, Paper
} from '@mui/material';
import PostCard from '../PortfolioSections/PostCard';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


const Projects = () => {

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetRelation(`api/projects/?publish=true`);
      setProjects(result.results)
    }
    fetchData();
  }, [])

  return !projects || projects.length <= 0 ? "" : (
    <Box id='projects'>
      <SectionTitle title={'projects'} caption={'some projects by users on our platform'} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ justifyContent: 'center' }}>
            {projects && projects.map((data, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <PostCard type='Project' post={data} mode={"Project"} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button component={Link} to={`/projects`}>Explore More Projects...</Button>
      </Box>
    </Box>
  )
}


export default Projects
