import React from 'react'
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

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

const ITEM_HEIGHT = 48;

export function SkillMenu() {
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
                {options.map((option) => (
                    <MenuItem key={option} /* selected={option === 'Pyxis'} */ onClick={handleClose}>
                        {option}
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

    return (
        <Box component="section" id="skills">

            <DrawerAppBar pages={NavLinks} />
            <Box p={"50px"}>
                <Breadcrumb path={useLocation()} />
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {sk.map((data) => (
                            <Grid key={data.id} {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Box className=" p-2">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: '-20px' }}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt="Remy Sharp" src={BgImage} sx={{ width: 70, height: 70 }} />
                                        </StyledBadge>
                                    </Box>
                                    <Paper elevation={6} sx={{ pt: '40px', px: '10px', pb: '10px', borderRadius: '20px' }}>
                                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography component='p' className='capitalize text-center pr-2' >projects <br /> <b>10</b>+</Typography>
                                            </Box>
                                            <Box><Typography component='p' className='capitalize text-center border-x' sx={{ fontWeight: '900' }}>First_name Last_name</Typography>
                                                <Typography component='p' className='capitalize text-center' >career</Typography></Box>
                                            <Box><Typography component='p' className='capitalize text-center pl-2' >posts <br /> <b>1K</b>+</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant='p' component='p' sx={{ fontWeight: '700' }}>Bio:</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <SkillMenu />
                                            </Box>
                                        </Box>
                                        <Typography variant='p' component='p'>{data.detail}</Typography>
                                        <Box className="mt-3 flex justify-center">
                                            <Chip
                                                label="Portfolio"
                                                color="success"
                                                component="a"
                                                href="http://localhost:5173/admin"
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
