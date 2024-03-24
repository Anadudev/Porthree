import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';

const Post = () => {
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks}/>
            <div>Post</div>
            <Footer />
        </React.Fragment>
    )
}

export default Post
