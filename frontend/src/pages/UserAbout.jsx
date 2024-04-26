import React from 'react'
import ResponsiveAppBar, { appTheme } from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


const UserAbout = () => {
    PageTitle("About");
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={UserNavLinks} />
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <Breadcrumb path={useLocation()} />
                <div>UserAbout</div>
            </ThemeProvider>
            <Footer />
        </React.Fragment>
    )
}

export default UserAbout
