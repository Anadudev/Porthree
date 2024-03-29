import React from 'react'
import DrawerAppBar from '../components/Nav';
import Footer from '../components/Footer';
import { UserNavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
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

const Post = () => {
    PageTitle("Post");
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
                            image={BgImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h1" sx={{ fontWeight: '900' }} className="text-center">
                                Lizard
                            </Typography>
                            <Box className="border-y flex py-2 my-4">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 56, height: 56, margin: '5px', marginRight: "10px" }}
                                />
                                <Box>
                                    <Typography sx={{ fontWeight: 700 }}>First_name Last_name</Typography>
                                    <Link href="#" sx={{ fontWeight: 700 }}>Username</Link>
                                    <Typography sx={{ fontWeight: 700 }}>career</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" className="pt-20">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <Box px={'10px'}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Chip label="Outlined" className="m-0.5" variant="outlined" />
                                <Chip label="Chip " className="m-0.5" variant="outlined" />
                                <Chip label="Chip Outlined" className="m-0.5" variant="outlined" />
                                <Chip label="Chip Outlined" className="m-0.5" variant="outlined" />
                                <Chip label="Chip " className="m-0.5" variant="outlined" />
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
