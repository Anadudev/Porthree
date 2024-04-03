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
import { getUserData } from "../data/GetUser";
import Error from "./Error";

const Projects = () => {
  PageTitle("Projects");

  const id = useLoaderData();
  if (!id) {
    return <Error />;
  }
  const [user, setUser] = useState("");
  const [projects, setProjects] = useState("");
  useEffect(() => {
    async function getter() {
      setUser(await GetUser(id));
      setProjects(await getUserData(id.id, "projects"));
    }
    getter();
  }, [id]);

  if (projects.length < 1) {
    return <h1>Projects Not Found</h1>;
  }
  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks(user)} />
      <Box p="50px">
      <Breadcrumb path={useLocation()} />
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {projects &&
            projects.map((project, index) => (
              // <Item sx={{ [heights[index]]: true  }}>
              <PostCard key={index} post={project} mode={"Project"} />
              // </Item>
            ))}
        </Masonry>
      </Box>{" "}
      <Footer />
    </React.Fragment>
  );
};

export default Projects;
