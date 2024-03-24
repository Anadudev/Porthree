import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Post = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
      <Breadcrumb path={useLocation()} />
            <div>Post</div>
            <Footer />
        </React.Fragment>
    )
}

export default Post
