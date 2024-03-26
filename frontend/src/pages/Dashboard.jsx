import React from 'react'
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Logout from '../components/Dashboard/Logout';



const Dashboard = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks} />
            <Breadcrumb path={useLocation()} />
            <div>
                Dashboard <br /><Outlet />
                <h1> Welcome {JSON.parse(localStorage.getItem('user')).username}</h1>
                <h1> id {JSON.parse(localStorage.getItem('user')).id}</h1>
                <h1> token {localStorage.getItem('access_token')}</h1>
                <Logout />
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Dashboard;
