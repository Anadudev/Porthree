import React, { useState, useEffect } from 'react';
import { GetRelation } from '../data/GetUser';
import PropTypes from 'prop-types';
import { Typography, Pagination, Box } from '@mui/material';
import PostCard from '../components/PortfolioSections/PostCard';
import PageTitle from './PageTitle';
import ResponsiveAppBar from '../components/Nav'
import Breadcrumb from '../components/Breadcrumb';
import { NavLinks } from '../data/NavLinks';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';
import Footer from '../components/Footer';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
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

const AllBlogPost = () => {
    PageTitle('All Posts')
    const [posts, setPosts] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);
    const [initialCount, setInitialCount] = useState(0);

    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            setResult(await GetRelation(`http://127.0.0.1:8000/api/posts/?page=${page}&publish=true`));
            if (result && result.results) {
                setPosts(result.results);
                if (initialCount === 0) {
                    setInitialCount(Math.ceil(result.count / result.results.length));
                }
                setCount(initialCount || Math.ceil(result.count / result.results.length));
            }
            // console.log(result);
            setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, result.count, count, result.next]);
    const handleChange = (event, value) => {
        setPage(value);
    };
    if (loading) {
        return <Loading />
    }
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box padding={{ xs: "10px", sm: "50px", minHeight: '100vh' }}>
                <Breadcrumb path={location} />
                {posts && posts.length > 0 ? (
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 1, sm: 8, md: 12 }}
                                sx={{ justifyContent: 'center' }}>
                                {posts && posts.slice(0, 6).map((data, index) => (
                                    <Grid xs={2} sm={4} md={4} key={index}>
                                        <PostCard type='Post' post={data} mode={"Post"} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={count}
                                variant="outlined"
                                color="primary"
                                page={page}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>) : ''}
            </Box>
            <Footer />
        </React.Fragment >
    )
}

export default AllBlogPost
