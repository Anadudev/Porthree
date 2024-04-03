import React from 'react';
import { useRouteError } from "react-router-dom";
import DrawerAppBar from '../components/Nav';
import { NavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import PageTitle from './PageTitle';

const Error = ({ err }) => {
    try {
        // Validate the err prop
        err = err || useRouteError();
        if (!err || !err.status || !err.statusText || !err.request) {
            throw new Error("Invalid err prop");
        }

        // Validate the useRouteError() function
        if (typeof useRouteError !== "function") {
            throw new Error("useRouteError() is not a function");
        }

        const error = {
            ...err,
            statusText:
                err.statusText ||
                (err.status === 0 ? "Network Error" : "Unknown Error"),
            request: err.request || { responseURL: window.location.href },
        };

        return (
            <React.Fragment>
                <DrawerAppBar pages={NavLinks} />
                <div>
                    Error <b className="text-blue">{error.status} {error.statusText} @ {error.request.responseURL}</b>
                </div>
                <Footer />
            </React.Fragment>
        );
    } catch (e) {
        // Handle any unexpected errors
        console.error(e);
        return (
            <React.Fragment>
                <DrawerAppBar pages={NavLinks} />
                <div>
                    Error <b className="text-blue">{e.message}</b>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
};
export default Error;
