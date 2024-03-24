import React from 'react';
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';

const Portfolio = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
            <div>Portfolio</div>
            <Footer />
        </React.Fragment>
    )
}

export default Portfolio
