import React, { Fragment } from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import ResponsiveAppBar from './Nav';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import { NavLinks } from '../data/NavLinks';

const HiddenPortfolioCard = ({ user }) => {
    // console.log(user)
    return (
        <Fragment>
            <ResponsiveAppBar pages={NavLinks} custom={user} />
            <Breadcrumb path={location} />
            <Box padding={{
                xs: "10px",
                sm: "50px",
                minHeight: '70vh'
            }} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Paper elevation={6} sx={{
                    margin: 'auto',
                    padding: '1rem',
                    textAlign: "center",
                    borderRadius: '30px',
                    maxWidth: '50rem',
                }}>
                    <Typography component="h1" variant='h3' sx={{
                        fontWeight: "400",
                        textAlign: "center",
                        border: '1px solid',
                        padding: '1.5rem',
                        borderRadius: '30px',
                        width: '100%',
                    }}
                        fontSize={{ xs: '2rem', md: '3rem' }}
                    >
                        The user with the username <br />
                        <Typography fontSize={{ xs: '4rem', md: '6rem' }} component='a' href='#' style={{
                            fontWeight: '900',
                            // background: '#007fff',
                            color: '#007fff',
                            textTransform: 'Capitalize',
                        }} >{user || "username"} </Typography>
                        <br />have chosen to keep their portfolio hidden
                    </Typography>
                </Paper>
            </Box>
            <Footer />
        </Fragment >
    )
}

export default HiddenPortfolioCard;
