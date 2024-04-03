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



/**
 * PostCard component for displaying a post in a card format.
 * @param {Object} post - The post object containing post details.
 * @param {string} mode - The mode of the post, e.g., "Project" or "Blog".
 * @returns {JSX.Element} The JSX element representing the post card.
 */
const PostCard = ({ post, mode }) => {
    if (!post || post.length <= 0) {
        return null;
    }
    const [expanded, setExpanded] = React.useState(false);

    /**
     * Handles the click event to expand or collapse the post card details.
     */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [user, setUser] = useState('');
    const [tools, setTools] = useState([]);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        /**
         * Fetches user data for the post and updates the component state.
         */
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

    return (
        <Card sx={{ maxWidth: 345 }} className="border">
            <CardHeader
                avatar={
                    <Avatar /* sx={{ bgcolor: red[500] }} */ alt={user.username} aria-label="recipe" src={user.picture}>
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
                image={post.post_image || post.image || BgImage}
                alt={"Post thumbnail"}
            />
            <CardContent>
                <p className='font-bold text-center primary'>{mode}:</p>

                <Link component={RL} to={`/${user.username}/${mode === "Project" ? "projects" : "posts"}/${post.slug}`} gutterBottom underline="always" variant="h5">
                    {Limiter(post.title) || ""}
                </Link>
                <Typography variant="body2" color="text.secondary"><b>{Limiter(post.content, 150)}</b>
                </Typography>
            </CardContent>
            <CardActions disableSpacing onClick={handleExpandClick} className='cursor-pointer'>
                {mode === "Project" && <Typography><span className='font-bold'>{post.contributors?.length} </span>Contributors</Typography>}
                <ExpandMore
                    expand={expanded}

                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Typography sx={{ fontWeight: "700" }}>{mode === "Project" ? "Tools:" : ''}</Typography>
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

export default PostCard;