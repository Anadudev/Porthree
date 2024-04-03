import React, { useState, useEffect } from 'react'
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
import { useLoaderData } from 'react-router-dom';
import GetUser from '../data/GetUser';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCard from '../components/PortfolioSections/PostCard';
import { getUserData } from '../data/GetUser';

const Posts = () => {
    const id = useLoaderData();
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState('')
    useEffect(() => {
        async function getter() {
            setUser(await (GetUser(id)));
            setPosts(await (getUserData(id.id, 'posts')));
        }
        getter();
    }, [id])

    PageTitle("Posts");
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks(user)} />
            <Breadcrumb path={useLocation()} />
            <div>Posts</div>
            <Box>
                <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} className='flex justify-center border'>
                    {posts && posts.map((post, index) => (
                        // <Item sx={{ [heights[index]]: true  }}>
                            <PostCard key={index} post={post} mode={'Blog Post'}/>
                        // </Item>
                    ))}
                </Masonry>
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Posts
