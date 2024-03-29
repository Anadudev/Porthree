import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
const About = () => {
    PageTitle("About");
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <Breadcrumb path={useLocation()} />
            <div>About</div>
            <Footer />
        </React.Fragment>
    )
}

export default About
