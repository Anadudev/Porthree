import React, { useState, useEffect } from "react";
import DrawerAppBar from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import PostCard from "../components/PortfolioSections/PostCard";
import GetUser, { GetRelation } from "../data/GetUser";
import { ErrorCard } from "./Error";
import Loading from "../components/PageLoad";

const Posts = () => {
  const id = useLoaderData();

  if (!id) {
    return <ErrorCard nav={true} code={404} error={"User not found"} />;
  }

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getter() {
      const data = await GetUser(id);
      setUser(data);
      const postList = await GetRelation(data.url + 'posts');
      if (!postList.loading) {
        setLoading(false);
      }
      setPosts(postList.results);
    }
    getter();
  }, [id]);
  PageTitle("Posts");
  if (loading) {
    return <Loading />
  }
  return (
    <React.Fragment>
      <DrawerAppBar pages={UserNavLinks(user)} />

      <Box padding={{xs:"10px", sm:"50px"}}>
        <Breadcrumb path={useLocation()} />
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          className="flex justify-center"
        >
          {posts &&
            posts.map((post, index) => (
              // <Item sx={{ [heights[index]]: true  }}>
              <PostCard key={index} post={post} mode={"Blog Post"} />
              // </Item>
            ))}
        </Masonry>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Posts;
