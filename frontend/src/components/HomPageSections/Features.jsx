import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SectionTitle from './SectionTitle';
import { Grid } from '@mui/material';
import HeroImage from '../../assets/HomeAssets/undraw_portfolio_website_re_jsdd.svg'
import PostImage from '../../assets/HomeAssets/undraw_books_re_8gea.svg'
import ProjectImage from '../../assets/HomeAssets/undraw_creation_process_re_kqa9.svg'
import ColabImage from '../../assets/HomeAssets/undraw_share_link_re_54rx.svg'
import PartnerImage from '../../assets/HomeAssets/undraw_group_hangout_re_4t8r.svg'
import ResponsiveImage from '../../assets/HomeAssets/undraw_mobile_interface_re_1vv9.svg'
import SocialImage from '../../assets/HomeAssets/undraw_social_thinking_re_y8cc.svg'
import PortfolioImage from '../../assets/HomeAssets/undraw_searching_re_3ra9.svg'
import SkillImage from '../../assets/HomeAssets/undraw_services_re_hu5n.svg'


export function TabBody({ value, index, body, image }) {
  return (
    <TabPanel value={value} index={index}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid pb={2} container px={2}
          spacing={3} height={{ xs: 'fit-content', lg: '37rem' }}
          direction={index%2?'':"row-reverse"}>
          <Grid item xs>
            <Box className="flex justify-center align-middle h-full">
              <img src={image} alt="Hero illustration" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md marginTop={{ xs: 5, md: 0 }}>
            <Box className="flex justify-center align-middle h-full">
              <Box className="self-center h-fit">
                <Box className='mb-10' textAlign={{ xs: 'center', sm: 'right' }}>
                  <Typography component='h2' fontSize={20}>{body}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const Features = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <SectionTitle title={'features'} caption={'why should i choose porthree?'} />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "fit-content" }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Seamless Portfolio creation" {...a11yProps(0)} />
          <Tab label="Intuitive Blog Creation" {...a11yProps(1)} />
          <Tab label="showcase skill" {...a11yProps(2)} />
          <Tab label="Captivating Project Showcase" {...a11yProps(3)} />
          <Tab label="project collaboration" {...a11yProps(4)} />
          <Tab label="Thriving Community" {...a11yProps(5)} />
          <Tab label="Seamless Integration" {...a11yProps(6)} />
          <Tab label="Mobile-Friendly Design" {...a11yProps(7)} />
        </Tabs>
        <TabBody value={value} index={0} body={'Users can easily create and manage portfolio online.'} image={PortfolioImage} />
        <TabBody value={value} index={1} body={'Users can share insights and expertise through a blog creation tool.'} image={PostImage} />
        <TabBody value={value} index={2} body={'Users can showcase their skills and land their dream jobs.'} image={SkillImage} />
        <TabBody value={value} index={3} body={'Projects can be visually presented to highlight technical skills and accomplishments.'} image={ProjectImage} />
        <TabBody value={value} index={4} body={'Users can share insights, accomplishments and collaboration on a project.'} image={ColabImage} />
        <TabBody value={value} index={5} body={'Users can connect, collaborate, and learn from like-minded individuals.'} image={PartnerImage} />
        <TabBody value={value} index={6} body={'Social media profiles and online platforms can be easily integrated for a comprehensive portfolio experience.'} image={SocialImage} />
        <TabBody value={value} index={7} body={'The platform is accessible and manageable from any device.'} image={ResponsiveImage} />
      </Box>
    </React.Fragment>
  )
}

export default Features