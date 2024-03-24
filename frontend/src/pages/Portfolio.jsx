import React from 'react';
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Portfolio = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
      <Breadcrumb path={useLocation()} />
            <div>Portfolio</div>
            <Footer />
        </React.Fragment>
    )
}

export default Portfolio
