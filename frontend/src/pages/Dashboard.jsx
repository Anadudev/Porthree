import React from 'react'
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
      <Breadcrumb path={useLocation()} />
            <div>Dashboard <br /><Outlet /></div>
            <Footer />
        </React.Fragment>
    )
}

export default Dashboard
