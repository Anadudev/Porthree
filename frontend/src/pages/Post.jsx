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
import BgImage from '/src/assets/image.jpg';
import Error from './Error';
import { Link as RL } from 'react-router-dom';
import HTMLRenderer from '../components/HtmlRender';
import { GetRelation } from '../data/GetUser';
import { useDispatch } from 'react-redux';
import { ToggleTagChip, ToggleToolChip, ResetChip } from '../features/FilterChip/FilterChipSlice';
import { useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import { ReplyFormDialog } from '../components/Comment';

const Post = () => {
    PageTitle("Post");
    const postList = useLoaderData();
    const navigate = useNavigate();

    if (!postList) {
        return <Error />
    }
    if (postList.results.length < 1) {
        return (<h1>Post Not Found</h1>);
    }
    const post = postList.results[0];
    const dispatch = useDispatch();
    const toggleChip = (chipType = '', value) => {
        dispatch(ResetChip('tags'));
        dispatch(ResetChip('tools'));
        dispatch(chipType === 'tag' ? ToggleTagChip(value) : ToggleToolChip(value));
        navigate(`/filter/posts`);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tags, setTags] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            async function handler() {
                // let relate = await GetRelation(post.user);
                setUser(await GetRelation(post.user));
                const tagCollection = []
                for (const tag of post.tags) {
                    tagCollection.push(await GetRelation(tag))
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
            <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
                <Breadcrumb path={useLocation()} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="justify-center align-middle">
                    <Card sx={{ width: '90%', maxWidth: "60rem", alignSelf: 'center' }}>
                        <CardMedia
                            component="img"
                            sx={{ height: "25rem" }}
                            image={post.post_image || BgImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="h1" sx={{ fontWeight: '900', color: `${user?.secondary_color || ''}` }} className="text-center">
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
                                {tags?.map((data, index) => (
                                    <Chip
                                        sx={{ m: 0.3 }}
                                        key={index}
                                        onClick={() => toggleChip('tag', [data.id, data.tag + '_tag'])}
                                        label={data.tag || ''}
                                        className="m-0.5 capitalize" variant="outlined" />
                                ))}
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
                                <ReplyFormDialog type={'post'} replyType={'post'} parent={post.url}/>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Box sx={{ width: '90%', maxWidth: "60rem", alignSelf: 'center' }}>
                            <Comment author={user} listTitle={"post"} parent={post.id} />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Post;
