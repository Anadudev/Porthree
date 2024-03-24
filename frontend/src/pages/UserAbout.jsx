import React from 'react'
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';

const UserAbout = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
            <div>UserAbout</div>
            <Footer />
        </React.Fragment>
    )
}

export default UserAbout
