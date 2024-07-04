import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import { Box, Pagination, Typography } from "@mui/material";
import PostCard from "../components/PortfolioSections/PostCard";
import { GetRelation } from "../data/GetUser";
import { ErrorCard } from "./Error";
import Loading from "../components/PageLoad";
import api from "../../apiConfig";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HiddenPortfolioCard from "../components/HiddenPortfolioCard";

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

  useEffect(() => {
    async function fetchData() {
      setUser(await GetRelation(`http://localhost:8000/api/users/${id.id}/`));
      setResult(await GetRelation(`http://localhost:8000/api/users/${id.id}/posts/?page=${page}&publish=true`))
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
  return user.visibility ? (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} />
      <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
        <Breadcrumb path={location} />
        {posts && posts.length > 0 ? (<Box padding={{ xs: "10px", sm: "50px" }}>
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
        </Box>) : <Typography textAlign={'center'}>No Posts </Typography>}
      </Box>
      <Footer />
    </React.Fragment>
  ) : <HiddenPortfolioCard user={user.username} />;
};

export default Posts;
