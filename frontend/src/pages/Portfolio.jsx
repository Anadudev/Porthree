import React from 'react';
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Hero from '../components/PortfolioSections/Hero';
import About from '../components/PortfolioSections/About';
import Skills from '../components/PortfolioSections/Skills';
import Projects from '../components/PortfolioSections/Projects';
import Blog from '../components/PortfolioSections/Blog';
import Contact from '../components/PortfolioSections/Contact';

const Portfolio = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks} />
            <Box p={"50px"}>
                <Breadcrumb path={useLocation()} />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Blog />
                <Contact />
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Portfolio
