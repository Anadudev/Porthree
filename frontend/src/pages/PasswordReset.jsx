import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';

const PasswordReset = () => {
        PageTitle("Password-rest");
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks}/>
      <Breadcrumb path={useLocation()} />
            <div>PasswordReset</div>
            <Footer />
        </React.Fragment>
    )
}

export default PasswordReset
