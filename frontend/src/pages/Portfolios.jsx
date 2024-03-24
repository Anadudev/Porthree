import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';

const Portfolios = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks}/>
            <div>Portfolios</div>
            <Footer />
        </React.Fragment>
    )
}

export default Portfolios
