import React from 'react'
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <React.Fragment>
      <DrawerAppBar pages={NavLinks}/>
      <div>Login</div>
            <Footer />
    </React.Fragment>
  )
}

export default Login
