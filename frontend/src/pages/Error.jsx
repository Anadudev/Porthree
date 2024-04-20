import * as React from 'react';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';
import ResponsiveAppBar from "../components/Nav";
import { NavLinks } from '../data/NavLinks';
import { Typography, Alert } from '@mui/material';
import { useRouteError } from 'react-router-dom';

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
    // console.log("tada",error);
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            {error && <ErrorCard content={error.error && error.error.message||error.error} code={error.statusText} error={error.status} />}
            <Footer />
        </React.Fragment>
    )
}


export default Error;
