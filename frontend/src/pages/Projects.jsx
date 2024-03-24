import React from 'react'
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';

const Projects = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
        <div>Projects</div>
            <Footer />
        </React.Fragment>
    )
}

export default Projects
