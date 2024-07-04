import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import PostCard from "../components/PortfolioSections/PostCard";
import { GetRelation } from "../data/GetUser";
import Error from "./Error";
import Loading from "../components/PageLoad";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HiddenPortfolioCard from "../components/HiddenPortfolioCard";

const Projects = () => {
  PageTitle("Projects");

  const id = useLoaderData();

  const [user, setUser] = useState("");
  const [projects, setProjects] = useState("");
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
        setProjects(result.results);
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
    return <Loading />;
  }
  // console.log(id);
  return user.visibility ? (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} />
      {projects && <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
        <Breadcrumb path={location} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ justifyContent: 'center' }}>
            {projects && projects.slice(0, 6).map((data, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <PostCard type='Project' post={data} mode={"Project"} />
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
      </Box>}
      <Footer />
    </React.Fragment>
  ) : <HiddenPortfolioCard user={user.username}/>;
};

export default Projects;
