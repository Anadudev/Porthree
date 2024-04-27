import React from 'react'
import ResponsiveAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
import { ThemeProvider } from '@mui/material/styles';


const PasswordReset = () => {
    PageTitle("Password-rest");
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Breadcrumb path={useLocation()} />
            <div>PasswordReset</div>
            <Footer />
        </React.Fragment>
    )
}

export default PasswordReset
