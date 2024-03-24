import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const PasswordReset = () => {
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
