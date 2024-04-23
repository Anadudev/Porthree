import React, { useEffect, useState } from 'react';
import {
    Card, Chip, Box, Paper, Link,
    CardHeader, CardMedia, CardContent,
    CardActions, Collapse, Avatar,
    IconButton, Typography,styled
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BgImage from "/src/assets/image.jpg";
import TimeAgo from 'react-timeago';
import Limiter from '../Limiter';
import { GetItem, GetRelation } from '../../data/GetUser';
import { Link as RL } from 'react-router-dom';
import HTMLRenderer from '../HtmlRender';


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
    if (!post || post.length <= 0 || post.publish == false) {
        return null;
    }
    const [expanded, setExpanded] = React.useState(false);
    // console.log(post);
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
        const fetchData = async () => {
            let relate = null;
            relate = await GetRelation(post.user);
            // console.log(relate.id);
            setUser(await GetItem("users", relate.id));
            // collect post tools
            let collection = []
            const tools = post.tools;

            for (const i in tools) {
                // console.log(tools[i])
                relate = await GetRelation(tools[i]);
                const data = await GetItem("tools", relate.id);
                collection.push(data)
            }
            setTools(collection);

            // collect post tags
            collection = []
            const tags = post.tags || blog.tags;
            for (const i in tags) {
                // console.log(tags[i]);
                relate = await GetRelation(tags[i]);
                const data = await GetItem("tags", relate.id);
                collection.push(data)
            }
            setTags(collection);
        }
        fetchData()
    }, [post]);
    // console.log(post);
    return (
        <Card sx={{ maxWidth: 330, margin: 1, border: `1px solid ${user?.secondary_color}` }} className="border">
            <CardHeader
                avatar={
                    <Avatar alt={user.username} aria-label="recipe" src={user.picture}>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography component={RL} to={`/${user.username}`} className='capitalize' sx={{ color: user?.primary_color || '' }}> {user.username || ""}</Typography>}
                subheader={<TimeAgo date={post.created_at} /> || ""}
            />
            <CardMedia
                component="img"
                height="194"
                image={/* post.post_image || post.image || */ BgImage}
                alt={"Post thumbnail"}
            />
            <CardContent sx={{ height: 200 }}>
                <p className='font-bold text-center primary'>{mode}:</p>

                <Link component={RL} to={`/${user.username}/${mode === "Project" ? "projects" : "posts"}/${post.slug}`} gutterBottom underline="always" variant="h5" sx={{ color: user?.secondary_color || '', }}>
                    {(<HTMLRenderer htmlContent={Limiter(post.title)} />) || ""}
                </Link>
                <Typography my={2} variant="body1" color="text.secondary" component={RL} to={`/${user.username}/${mode === "Project" ? "projects" : "posts"}/${post.slug}`}><b>{(<HTMLRenderer htmlContent={Limiter(post.content, 150)} />)}</b>
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
                        {tools?.slice(0, 4).map((data, index) => (<Chip component={Paper} elevation={3} key={index} label={data.tool} className="m-0.5" variant="outlined" />))}
                    </Box>
                </CardContent>
                <CardContent>
                    <Typography sx={{ fontWeight: "700" }}>{tags && "Tags:"}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {tags?.slice(0, 4).map((data, index) => (<Chip component={Paper} elevation={3} key={index} label={data.tag} className="m-0.5" variant="outlined" />))}
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default PostCard;