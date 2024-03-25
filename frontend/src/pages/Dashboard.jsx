import React from 'react'
import { Outlet } from "react-router-dom";
import Logout from '../components/Dashboard/Logout';

const Dashboard = () => {
    return (
        <>
        <div>
            Dashboard <br /><Outlet />
            <h1> Welcome {localStorage.getItem('user')}</h1>
            <h1> Welcome {localStorage.getItem('access_token')}</h1>
            <Logout />
        </div>
        </>

    )
}

export default Dashboard
