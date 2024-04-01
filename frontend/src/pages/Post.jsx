import React, { useState, useEffect } from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation, useLoaderData } from 'react-router-dom';
import PageTitle from './PageTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    Typography,
    Link,
    Avatar,
    CardActions,
    Box,
    Chip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BgImage from '/src/assets/image.jpg';
import Error from './Error';
import { GetItem } from '../data/GetUser';
import { Link as RL } from 'react-router-dom';

const Post = () => {
    PageTitle("Post");
    const postList = useLoaderData();
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
        const fetchDataForUser = async () => {
            async function handler() {
                setUser(await GetItem('users', post.user));
                const tagCollection = []
                for (const tag in post.tags) {
                    tagCollection.push(await GetItem('tags', post.tags[tag]))
                }
                setTags(tagCollection)
            }
            handler();
        };
        fetchDataForUser();
    }, [post]);
    // console.log(tags)

    // console.log(postList.results);
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks} />
            <Box p={"50px"}>
                <Breadcrumb path={useLocation()} />
                <Box className="flex justify-center">
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={post.image || BgImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h1" sx={{ fontWeight: '900' }} className="text-center">
                                {post.title || ''}
                            </Typography>
                            <Box className="border-y flex py-2 my-4">
                                <Avatar className="capitalize"
                                    alt={user.username}
                                    src={user.image||"/static/images/avatar/1.jpg"}
                                    sx={{ width: 56, height: 56, margin: '5px', marginRight: "10px" }}
                                />
                                <Box>
                                    <Typography sx={{ fontWeight: 700 }}>{user.first_name} {user.last_name || ''}</Typography>
                                    <Link  component={RL} to={`/${user.username}`}  sx={{ fontWeight: 700 }} className="capitalize">{user.username || ''}</Link>
                                    <Typography sx={{ fontWeight: 700 }}>{user.career || ''}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" className="pt-20">{post.content || ''}</Typography>
                        </CardContent>
                        <Box px={'10px'}>
                            <Box sx={{ flexGrow: 1 }}>
                                {tags?.map((data, index) => (<Chip key={index} label={data.tag||''} className="m-0.5 capitalize" variant="outlined" />))}

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
