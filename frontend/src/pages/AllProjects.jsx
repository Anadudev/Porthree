import React, { useState, useEffect } from 'react';
import { GetRelation, GetDatas } from '../data/GetUser';
import PropTypes from 'prop-types';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import PostCard from '../components/PortfolioSections/PostCard';
import SectionTitle from '../components/HomPageSections/SectionTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import PageTitle from './PageTitle';
import ResponsiveAppBar from '../components/Nav'
import Breadcrumb from '../components/Breadcrumb';
import { NavLinks } from '../data/NavLinks';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const AllProjects = () => {
    PageTitle('All Projects')
    const [projects, setProjects] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function handler() {
            setProjects((await GetRelation("http://127.0.0.1:8000/api/projects/")).results);
            setLoading(false);
        }
        handler();
    }, [])
    if (loading){
        return <Loading/>
    }
    // console.log(projects);
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box padding={{ xs: "10px", sm: "50px" }}>
                <Breadcrumb path={useLocation()} />
                <Box sx={{ width: '100%' }}>
                    <Box
                        spacing={2}
                        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        {projects && projects.slice(0, 6).map((data, index) => (
                            <Box item key={index}>
                                <PostCard type='Project' post={data} mode={"Project"} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </React.Fragment >
    )
}

export default AllProjects