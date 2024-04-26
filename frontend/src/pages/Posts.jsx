import React, { useState, useEffect } from "react";
import ResponsiveAppBar, { appTheme } from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import { Box, Pagination, CssBaseline } from "@mui/material";
import PostCard from "../components/PortfolioSections/PostCard";
import { GetRelation } from "../data/GetUser";
import { ErrorCard } from "./Error";
import Loading from "../components/PageLoad";
import { ThemeProvider } from '@mui/material/styles';

const Posts = () => {
  PageTitle("Posts");
  const id = useLoaderData();

  if (!id) {
    return <ErrorCard nav={true} code={404} error={"User not found"} />;
  }

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [initialCount, setInitialCount] = useState(0);

  const location = useLocation();

  if (!id) {
    return <Error />;
  }
  useEffect(() => {
    async function fetchData() {
      setUser(await GetRelation(`http://localhost:8000/api/users/${id.id}/`));
      setResult(await GetRelation(`http://localhost:8000/api/users/${id.id}/projects/?page=${page}&publish=true`))
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
  }, [id, page, result.count, count, result.next]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  if (loading) {
    return <Loading />
  }
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} />
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {posts && <Box padding={{ xs: "10px", sm: "50px" }}>
          <Breadcrumb path={location} />
          <Box
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {posts.map((post, index) => (
              // <Item sx={{ [heights[index]]: true  }}>
              <PostCard key={index} post={post} mode={"Blog Post"} />
              // </Item>
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
      </ThemeProvider>
      <Footer />
    </React.Fragment>
  );
};

export default Posts;
