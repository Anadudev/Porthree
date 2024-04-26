import React, { useState, useEffect } from 'react';
import { GetRelation } from '../data/GetUser';
import PropTypes from 'prop-types';
import { Typography, Pagination, Box, CssBaseline } from '@mui/material';
import PostCard from '../components/PortfolioSections/PostCard';
import PageTitle from './PageTitle';
import ResponsiveAppBar, { appTheme } from '../components/Nav'
import Breadcrumb from '../components/Breadcrumb';
import { NavLinks } from '../data/NavLinks';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';

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
    // console.log(posts);
    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <Box padding={{ xs: "10px", sm: "50px" }}>
                    <Breadcrumb path={location} />
                    {posts && <Box sx={{ width: '100%' }}>
                        <Box
                            spacing={2}
                            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                        >
                            {posts.map((data, index) => (
                                <Box item key={index}>
                                    <PostCard type='Project' post={data} mode={"Blog Post"} />
                                </Box>
                            ))}
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
                    </Box>}
                </Box>
            </ThemeProvider>
            <Footer/>
        </React.Fragment >
    )
}

export default AllBlogPost
