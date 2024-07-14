import * as React from 'react';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';
import ResponsiveAppBar from "../components/Nav";
import { NavLinks } from '../data/NavLinks';
import { Typography, Alert, Box, Card, Button } from '@mui/material';
import { useRouteError } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';


export const ErrorCard = ({ error, code, content, nav }) => {
    return (
        <React.Fragment>
            {nav && <ResponsiveAppBar pages={NavLinks} />}
            <div className="w-full h-[70vh] flex justify-center align-middle">
                <div className='capitalize h-fit self-center'>
                    <Alert severity="error">
                        <Typography variant='h6' component='h1'>Error: </Typography>
                        <Typography variant='h1' sx={{ fontWeight: 900 }} component='h1'>{code || ''} {error || 'An error occurred'}</Typography>
                        <Typography variant='h6' component='h1'>{content || ''}</Typography>
                    </Alert>
                </div>
            </div>
        </React.Fragment>
    )
}

const Error = () => {
    PageTitle("Error");
    const error = useRouteError();
    // console.log("From error component", error);
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box sx={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
                padding={"2rem"}
            >
                <Card
                    elevation={10}
                    sx={{
                        py: 20, px: 3,
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "800",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                    }}>
                    <Box sx={{margin:'auto'}}>
                        <Typography >Oops!</Typography>
                        {error.data || error.statusText ? <>
                            <Typography component="h1" sx={{ fontWeight: 900 }} variant='h1'>{error.status}</Typography>
                            <Typography component="p" variant='body1'>{error.data}</Typography>
                            <Typography component="p" variant='body1'>{error.statusText}</Typography>
                        </> : (<Typography component="h1" sx={{ fontWeight: 900 }} variant='h2'>An error occurred</Typography>)}
                        <Button>Go Home</Button>
                    </Box>
                </Card>
            </Box>
            <Footer />
        </React.Fragment>
    )
}


export default Error;
