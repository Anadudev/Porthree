import * as React from 'react';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';
import ResponsiveAppBar, { appTheme } from "../components/Nav";
import { NavLinks } from '../data/NavLinks';
import { Typography, Alert, CssBaseline } from '@mui/material';
import { useRouteError } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';


export const ErrorCard = ({ error, code, content, nav }) => {
    return (
        <React.Fragment>
            {nav && <ResponsiveAppBar pages={NavLinks} />}
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <div className="w-full h-[70vh] flex justify-center align-middle">
                    <div className='capitalize h-fit self-center'>
                        <Alert severity="error">
                            <Typography variant='h6' component='h1'>Error: </Typography>
                            <Typography variant='h1' sx={{ fontWeight: 900 }} component='h1'>{code || ''} {error || 'An error occurred'}</Typography>
                            <Typography variant='h6' component='h1'>{content || ''}</Typography>
                        </Alert>
                    </div>
                </div>
            </ThemeProvider>
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
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                {error && <ErrorCard content={error.error && error.error.message || error.error} code={error.statusText} error={error.status} />}
            </ThemeProvider>
            <Footer />
        </React.Fragment>
    )
}


export default Error;
