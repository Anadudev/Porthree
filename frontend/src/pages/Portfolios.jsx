import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Skills as sk } from '../data/Info';
import PageTitle from './PageTitle';
import DrawerAppBar from '../components/Nav';
import Breadcrumb from '../components/Breadcrumb';
import { NavLinks } from '../data/NavLinks';
import { useLocation } from 'react-router-dom';
import BgImage from "/src/assets/image.jpg";
import { Typography, Paper, Avatar, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GetDatas, getUserData, GetRelation } from '../data/GetUser';
import { Link } from 'react-router-dom';
import Limiter from '../components/Limiter';
import Loading from "../components/PageLoad";
const ITEM_HEIGHT = 48;

export function SkillMenu({ skills }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <IconButton
                aria-label="more"
                id="long-button"
                color='primary'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Typography>Skills</Typography><MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {skills?.map((skill, index) => (
                    <MenuItem key={index} /* selected={option === 'Pyxis'} */ onClick={handleClose}>
                        {skill.skill}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const Portfolios = () => {
    PageTitle("Portfolios");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    let relationList = [];

    async function gatterRelations(relation) {
        if (relation && relation[0]) {
            for (const tool of relation) {
                const data = await GetRelation(tool);
                relationList.push(data);
            }
            return relationList;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetDatas('users');

            if (!result.loading) {
                const userList = result.results;
                const promises = [];

                for (const user of userList) {
                    promises.push(
                        GetRelation(user.url + 'projects/').then(data => {
                            user.projects = data.count;
                        })
                    );
                    // console.log(await GetRelation(user.url+'projects/'));

                    promises.push(
                        GetRelation(user.url + 'posts/').then(data => {
                            user.posts = data.count;
                        })
                    );

                    promises.push(
                        user.dataSkills = await gatterRelations(user.skills)
                    );
                    relationList = [];
                    // console.log(user);
                }

                await Promise.all(promises);
                setLoading(false);
                setUsers(userList);
            }
        };

        fetchData();
    }, []);

    if (loading) { return <Loading /> }
    if (!users || users.length < 1) {
        return null;
    }
    // console.log(users);
    return (
        <Box component="section" id="skills">

            <DrawerAppBar pages={NavLinks} />
            <Box padding={{xs:"10px", sm:"50px"}}>
                <Breadcrumb path={useLocation()} />
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {users?.map((user, index) => (
                            <Grid key={index} {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: '-20px' }}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar component={Paper} elevation={6} alt={user.username} src={user.picture} sx={{ width: 70, height: 70 }} />
                                        </StyledBadge>
                                    </Box>
                                    <Paper elevation={5} sx={{ pt: '40px', px: '10px', pb: '10px', borderRadius: '10px' }}>
                                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography component='p' className='capitalize text-center pr-2' >projects <br /> <b>{user.projects ? `${user.projects}+` : 0}</b></Typography>
                                            </Box>
                                            <Box><Typography component='p' className='capitalize text-center border-x px-1' sx={{ fontWeight: '900' }}>{user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}</Typography>
                                                <Typography component='p' className='capitalize text-center' >{user.career}</Typography></Box>
                                            <Box><Typography component='p' className='capitalize text-center pl-2' >posts <br /> <b>{user.posts ? `${user.posts}+` : 0}</b></Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant='p' component='p' sx={{ fontWeight: '700' }}>Bio:</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {user.dataSkills && <SkillMenu skills={user.dataSkills} />}
                                            </Box>
                                        </Box>
                                        <Typography variant='p' component='p'>{Limiter(user.bio, 100)}</Typography>
                                        <Box className="mt-3 flex justify-center">
                                            <Chip
                                                label="Portfolio"
                                                color="success"
                                                component={Link}
                                                to={`/${user.username}`}
                                                variant="outlined"
                                                clickable
                                            />
                                        </Box>
                                    </Paper>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default Portfolios;
