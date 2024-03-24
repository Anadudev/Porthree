import React from 'react'
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';

const Signup = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <div>Signup</div>
            <Footer />
        </React.Fragment>
    )
}

export default Signup
