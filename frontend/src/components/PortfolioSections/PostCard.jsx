import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Chip, Box, Paper, Link } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BgImage from "/src/assets/image.jpg";
import TimeAgo from 'react-timeago';
import Limiter from '../Limiter';
import { GetItem } from '../../data/GetUser';
import { Link as RL } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function PostCard({ post, mode }) {
    if (!post || post.length <= 0 ) {
        return null;
    }
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [user, setUser] = useState('');
    const [tools, setTools] = useState([]);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        const fetchDataForUser = async () => {

            setUser(await GetItem("users", post.user));
            // collect post tools
            let collection = []
            const tools = post.tools;
            for (const tool in tools) {
                const data = await GetItem("tools", tools[tool]);
                collection.push(data)
            }
            setTools(collection);
            // collect post tags
            collection = []
            const tags = post.tags || blog.tags;
            for (const tag in tags) {
                const data = await GetItem("tags", tags[tag]);
                collection.push(data)
            }
            setTags(collection);
        }
        fetchDataForUser()
    }, [post]);
    // console.log(tools)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} alt={user.username} aria-label="recipe">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography className='capitalize'> {user.username || ""}</Typography>}
                subheader={<TimeAgo date={post.created_at} /> || ""}
            />
            <CardMedia
                component="img"
                height="194"
                image={post.image || BgImage}
                alt={"Post thumbnail"}
            />
            <CardContent>
                <p className='font-bold text-center primary'>{mode}:</p>

                <Link component={RL} to={`/${user.username}/${mode==="Project"?"projects":"posts"}/${post.slug}`} gutterBottom underline="always" variant="h5">
                    {post.title || ""}
                </Link>
                <Typography variant="body2" color="text.secondary">{Limiter(post.content, 150)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Typography sx={{ fontWeight: "700" }}>{mode==="Project"?"Tools:":''}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {tools?.map((data, index) => (<Chip component={Paper} elevation={3} key={index} label={data.tool} className="m-0.5" variant="outlined" />))}
                    </Box>
                </CardContent>
                <CardContent>
                    <Typography sx={{ fontWeight: "700" }}>{tags && "Tags:"}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {tags?.map((data, index) => (<Chip component={Paper} elevation={3} key={index} label={data.tag} className="m-0.5" variant="outlined" />))}
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}
