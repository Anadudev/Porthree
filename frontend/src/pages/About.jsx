import React from 'react'
import ResponsiveAppBar, { appTheme } from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const About = () => {
    PageTitle("About");
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <ThemeProvider>
                <CssBaseline/>
                <Breadcrumb path={useLocation()} />
                <div>About</div>
            </ThemeProvider>
            <Footer />
        </React.Fragment>
    )
}

export default About
