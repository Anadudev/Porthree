import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';

const About = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <div>About</div>
            <Footer />
        </React.Fragment>
    )
}

export default About
