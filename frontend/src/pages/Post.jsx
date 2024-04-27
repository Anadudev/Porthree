import React, { useState, useEffect } from 'react'
import ResponsiveAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation, useLoaderData } from 'react-router-dom';
import PageTitle from './PageTitle';
import {
    Typography, Link, Avatar,
    CardActions, Box, CardContent,
    CardMedia, Chip, Card, IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BgImage from '/src/assets/image.jpg';
import Error from './Error';
import { GetItem } from '../data/GetUser';
import { Link as RL } from 'react-router-dom';
import HTMLRenderer from '../components/HtmlRender';
import { GetRelation } from '../data/GetUser';

const Post = () => {
    PageTitle("Post");
    const postList = useLoaderData();
    if (!postList) {
        return <Error />
    }
    if (postList.results.length < 1) {
        return (<h1>Post Not Found</h1>);
    }
    const post = postList.results[0];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tags, setTags] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            async function handler() {
                let relate = await GetRelation(post.user);
                setUser(await GetItem('users', Number(post.user.split('/')[5])));
                const tagCollection = []
                for (const tag in post.tags) {
                    tagCollection.push(await GetItem('tags', Number(post.tags[tag].split('/')[5])))
                }
                setTags(tagCollection)
            }
            handler();
        };
        fetchData();
    }, [post]);

    return (
        <React.Fragment>
            <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
            <Box padding={{ xs: "10px", sm: "50px" }}>
                <Breadcrumb path={useLocation()} />
                <Box className="flex justify-center">
                    <Card sx={{ width: "60rem" }}>
                        <CardMedia
                            component="img"
                            sx={{height:"25rem"}}
                            image={post.post_image || BgImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h1" sx={{ fontWeight: '900', color: `${user?.secondary_color || ''}` }} className="text-center">
                                {(<HTMLRenderer htmlContent={post.title} />) || ''}
                            </Typography>
                            <Box className="border-y flex py-2 my-4">
                                <Avatar className="capitalize"
                                    alt={user.username}
                                    src={user.image || "/static/images/avatar/1.jpg"}
                                    sx={{ width: 56, height: 56, margin: '5px', marginRight: "10px" }}
                                />
                                <Box>
                                    <Typography sx={{ fontWeight: 700 }}>{user.first_name} {user.last_name || ''}</Typography>
                                    <Link component={RL} to={`/${user.username}`} sx={{ fontWeight: 700, color: `${user?.primary_color || ''}` }} className="capitalize">{user.username || ''}</Link>
                                    <Typography sx={{ fontWeight: 700 }}>{user.career || ''}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="p"
                                component='p'
                                color="text.secondary"
                                className="py-10 font-semibold text-lg">{(<HTMLRenderer htmlContent={post.content} />) || ''}</Typography>
                        </CardContent>
                        <Box px={'10px'}>
                            <Box sx={{ flexGrow: 1 }}>
                                {tags?.map((data, index) => (<Chip key={index} label={data.tag || ''} className="m-0.5 capitalize" variant="outlined" />))}

                            </Box>
                        </Box>
                        <CardActions>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="comment">
                                <CommentIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Post
