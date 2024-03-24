import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";


function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}


const Breadcrumb = ({ path }) => {
    const pathSegments = path.pathname.split("/");
    const last = (pathSegments.length) - 1;
    const breadcrumbs = pathSegments.map((segment, index) => ({
        text: index === 0 ? "Home" : segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
        to: index === 0 ? "/" : `${pathSegments.slice(0, index + 1).join("/")}`, // Build URL based on segments
    }));

    return (
        <div>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    {breadcrumbs.map((item, index) => (
                        // index === 0? "":
                        <MuiLink component={Link} key={index} underline="hover" to={item.to} aria-current={index === last ? "page" : ""} color={index === last ? "text.primary" : "inherit"}>
                            {item.text}
                        </MuiLink>
                    ))}
                </Breadcrumbs>
            </div>
        </div>
    )
}

export default Breadcrumb;
