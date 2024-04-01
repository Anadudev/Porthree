import React from 'react'
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';

const UserAbout = () => {
        PageTitle("About");
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
      <Breadcrumb path={useLocation()} />
            <div>UserAbout</div>
            <Footer />
        </React.Fragment>
    )
}

export default UserAbout