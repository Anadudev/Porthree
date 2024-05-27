import React from 'react';
import ResponsiveAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import PageTitle from './PageTitle';
import Hero from '../components/HomPageSections/Hero';
import Features from '../components/HomPageSections/Features';
import About from '../components/HomPageSections/About';
import Projects from '../components/HomPageSections/Projects';
import Blog from '../components/HomPageSections/Blog';
import { Box } from '@mui/material';



const Home = () => {
    PageTitle("Home");
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
                <Hero />
                <About />
                <Features />
                <Projects />
                <Blog />
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Home;
