import React from 'react';
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';

const Home = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <div>Home</div>
            <Footer />
        </React.Fragment>
    )
}

export default Home;
