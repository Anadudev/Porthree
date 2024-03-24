import React from 'react'
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Login = () => {
  return (
    <React.Fragment>
      <DrawerAppBar pages={NavLinks}/>
      <Breadcrumb path={useLocation()} />
      <div>Login</div>
            <Footer />
    </React.Fragment>
  )
}

export default Login
