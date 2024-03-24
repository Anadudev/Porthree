import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';

const PasswordReset = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks}/>
            <div>PasswordReset</div>
            <Footer />
        </React.Fragment>
    )
}

export default PasswordReset
