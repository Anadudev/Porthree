import React from 'react';
import { useRouteError } from "react-router-dom";
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';

const Error = () => {
    PageTitle("Error");
    const error = useRouteError();

    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <div>Ernest caused a <b className='text-blue'>{error.statusText || error.message}</b> error</div>
            <Footer />
        </React.Fragment>
    )
}

export default Error;
