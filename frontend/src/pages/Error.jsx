import React from 'react';
import { useRouteError } from "react-router-dom";
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';

const Error = ({ err }) => {
    PageTitle("Error");
    const error = err || useRouteError();

    return (
        <React.Fragment>
            <DrawerAppBar pages={NavLinks} />
            <div>Error <b className='text-blue'>{error.status || ''} {error.statusText || ''} @ {error.request && error.request.responseURL || ''}</b> </div>
            <Footer />
        </React.Fragment>
    )
}

export default Error;
