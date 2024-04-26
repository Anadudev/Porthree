import React from 'react'
import ResponsiveAppBar, { appTheme } from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


const PasswordReset = () => {
    PageTitle("Password-rest");
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <Breadcrumb path={useLocation()} />
                <div>PasswordReset</div>
            </ThemeProvider>
            <Footer />
        </React.Fragment>
    )
}

export default PasswordReset
