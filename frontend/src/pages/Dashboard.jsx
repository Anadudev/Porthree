import React from 'react'
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';

const Dashboard = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
            <div>Dashboard <br /><Outlet /></div>
            <Footer />
        </React.Fragment>
    )
}

export default Dashboard
