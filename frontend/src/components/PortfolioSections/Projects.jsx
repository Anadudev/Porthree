import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Button } from '@mui/material';
import SectionHeader from './SectionHeader';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
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

const Projects = ({ projects, user }) => {
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
      <SectionHeader title={'awesome works'} custom={user}/>
      <Box sx={{ width: '100%' }}>
        <CustomTabPanel value={value} index={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{justifyContent:'center'}}>
            {projects && projects.slice(0, 6).map((data, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <PostCard type='Project' post={data} mode={"Project"} />
              </Grid>
            ))}
          </Grid>
        </Box>
            <Button component={Link} to={`/${user?.username}/projects`} sx={{color:`${user?.secondary_color|| ''}`}}>More...</Button>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default Projects;
