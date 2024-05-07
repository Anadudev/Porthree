import React, { useEffect, useState } from 'react';
import {
    Card, Chip, Box, Paper, Link,
    CardHeader, CardMedia, CardContent,
    CardActions, Collapse, Avatar,
    IconButton, Typography, styled
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BgImage from "/src/assets/image.jpg";
import TimeAgo from 'react-timeago';
import Limiter from '../Limiter';
import { GetItem, GetRelation } from '../../data/GetUser';
import { Link as RL } from 'react-router-dom';
import HTMLRenderer from '../HtmlRender';

import { Button, CardActionArea } from '@mui/material';

export function ProjectCard({ project, user }) {
    return (
        <Card sx={{
            width: 345,
            margin: 1,
            border: `2px solid ${user.secondary_color}`,
            borderRadius: '10px'
        }} className='border-[2px]'>
            <RL to={`/${user.username}/projects/${project.slug}`} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{ height: "12rem" }}
                        image={project?.image || BgImage}
                        alt="Project Thumbnail"
                    />
                    <CardContent sx={{ minHeight: 200 }}>
                        <Typography gutterBottom variant="h5" component="div" color={user.secondary_color}>
                            {(<HTMLRenderer htmlContent={Limiter(project?.title)} />) || ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {(<HTMLRenderer htmlContent={Limiter(project.content, 190)} />) || ""}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </RL>
            <CardActions>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar alt="Remy Sharp" src={user.picture || ''} sx={{ mr: 1 }} />
                    <Typography color={user.primary_color} variant='h6' component={RL} to={`/${user.username}`} className='capitalize'>
                        {/* {`${user.first_name} ${user.last_name}` || ""} */}
                        {user.username}
                    </Typography>
                </Box>
                <Typography><TimeAgo date={project.created_at} /></Typography>
            </CardActions>
        </Card>
    );
}

function BlogCard({ post, user }) {
    return (
        <Card sx={{ width: 345, margin: 1, border: `1px solid ${user?.secondary_color}` }}>
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
                title={<Typography variant="h6" component={RL} to={`/${user.username}`} className='capitalize' sx={{ color: user?.primary_color || '' }}> {user.username || ""}</Typography>}
                subheader={<TimeAgo date={post.created_at} /> || ""}
            />
            <RL to={`/${user.username}/posts/${post.slug}`} >
                <CardMedia
                    component="img"
                    sx={{ height: "12rem" }}
                    image={post.post_image || BgImage}
                    alt={"Post thumbnail"}
                />

                <CardContent sx={{ height: 200 }}>
                    <Typography gutterBottom variant="h5" sx={{ color: user?.secondary_color || '', }}>
                        {(<HTMLRenderer htmlContent={Limiter(post.title)} />) || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{(<HTMLRenderer htmlContent={Limiter(post.content, 150)} />)}</Typography>
                </CardContent>
            </RL>
        </Card>
    )
}



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
            setUser(await GetRelation(post.user));
            // collect post tools
            let collection = []
            const tools = post.tools || [];

            // console.log(tools)
            for (const tool of tools) {
                const data = await GetRelation(tool);
                // const data = await GetItem("tools", relate.id);
                collection.push(data)
            }
            setTools(collection);

            // collect post tags
            collection = []
            const tags = post.tags || blog.tags;
            for (const tag in tags) {
                // console.log(tags[i]);
                const data = await GetRelation(tag);
                //  = await GetItem("tags", relate.id);
                collection.push(data)
            }
            setTags(collection);
        }
        fetchData();
    }, [post]);
    // console.log(mode);
    return (mode === "Project" ? <ProjectCard project={post} user={user} /> : <BlogCard post={post} user={user} />);
}

export default PostCard;