import React, { useState, useEffect } from "react";
import DrawerAppBar from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import GetUser from "../data/GetUser";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import PostCard from "../components/PortfolioSections/PostCard";
import { GetRelation } from "../data/GetUser";
import Error from "./Error";
import Loading from "../components/PageLoad";

const Projects = () => {
  PageTitle("Projects");

  const id = useLoaderData();
  if (!id) {
    return <Error />;
  }
  const [user, setUser] = useState("");
  const [projects, setProjects] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getter() {
      setUser(await GetUser(id));
      const projectList = await GetRelation(user.url + "projects/")
      if (!projectList.loading) {
        setLoading(false);
      }
      setProjects(projectList.results);
    }
    getter();
  }, [id, user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks(user)} />
      <Box padding={{xs:"10px", sm:"50px"}}>
        <Breadcrumb path={useLocation()} />
        <Box
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
          {projects &&
            projects.map((project, index) => (
              // <Item sx={{ [heights[index]]: true  }}>
              <PostCard key={index} post={project} mode={"Project"} />
              // </Item>
            ))}
        </Box>
      </Box>{" "}
      <Footer />
    </React.Fragment>
  );
};

export default Projects;
