import React, { useState, useEffect } from "react";
import ResponsiveAppBar, {appTheme} from "../components/Nav";
import Footer from "../components/Footer";
import { UserNavLinks } from "../data/NavLinks";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation, useLoaderData } from "react-router-dom";
import PageTitle from "./PageTitle";
import {
  Card, AvatarGroup, CardContent, CardMedia, Typography,
  Link, Avatar, CardActions, Box, Chip, IconButton, CssBaseline
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BgImage from "/src/assets/image.jpg";
import { ErrorCard } from "./Error";
import Limiter from "../components/Limiter";
import { Link as RL } from "react-router-dom";
import HTMLRenderer from "../components/HtmlRender";
import { GetRelation, GetItem } from "../data/GetUser";
import { ThemeProvider } from '@mui/material/styles';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const Project = () => {
  PageTitle("Project");
  const projectList = useLoaderData();
  if (!projectList) {
    return <ErrorCard
      error={'not found'}
      code={404}
      content={'project does not exist in porthree please check your browsers url'
      }
      nav={true}
    />;
  }
  if (projectList.results.length < 1) {
    return <h1>Project Not Found</h1>;
  }
  const project = projectList.results[0];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tags, setTags] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tools, setTools] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contributors, setContributors] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchDataForUser = async () => {
      async function handler() {
        setUser(await GetItem("users", Number(project.user.split('/')[5])));
        let Collection = [];
        for (const tag in project.tags) {
          Collection.push(await GetItem("tags", Number(project.tags[tag].split('/')[5])));
        }
        setTags(Collection);
        /* get project tools */
        Collection = [];
        for (const tool in project.tools) {
          Collection.push(await GetItem("tools", Number(project.tools[tool].split('/')[5])));
        }
        setTools(Collection);
        /* get project contributors */
        Collection = [];
        for (const contributors in project.contributors) {
          Collection.push(
            await GetItem("users", Number(project.contributors[contributors].split('/')[5]))
          );
        }
        setContributors(Collection);
      }
      handler();
    };
    fetchDataForUser();
  }, [projectList, project]);

  // console.log(project);
  if (project.length < 1) {
    return <h1>Project Not Found</h1>;
  }

  return (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
      <ThemeProvider theme={appTheme}>
        <CssBaseline/>
      <Box padding={{ xs: "10px", sm: "50px" }}>
        <Breadcrumb path={useLocation()} />
        <Box className="flex flex-wrap justify-center">
          <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
              component="img"
              height="140"
              image={project.image || BgImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h2"
                component="h1"
                sx={{ fontWeight: "900", color: `${user?.secondary_color || ''}` }}
                className="text-center"
              >
                {(<HTMLRenderer htmlContent={project.title} />) || ""}
              </Typography>
              <Box className="border-y flex-col py-2 my-4 align-middle justify-center">
                <Box className="flex py-2 my-4 justify-between">
                  <Box className="flex">
                    <Avatar
                      className="capitalize"
                      alt={user.username}
                      src={user.picture || "/static/images/avatar/1.jpg"}
                      sx={{
                        width: 56,
                        height: 56,
                        margin: "5px",
                        marginRight: "10px",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {user.first_name} {user.last_name || ""}
                      </Typography>
                      <Link
                        component={RL}
                        to={`/${user.username}`}
                        sx={{ fontWeight: 700, color: `${user?.secondary_color || ''}` }}
                        className="capitalize"
                      >
                        {user.username || ""}
                      </Link>
                      <Typography sx={{ fontWeight: 700 }}>
                        {user.career || ""}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex justify-center align-middle">
                    <Typography
                      variant="h6"
                      mr={"10px"}
                      component={"h2"}
                      className="self-center"
                    >
                      Contributors: {contributors.length < 1 ? "None" : ""}
                    </Typography>
                    <AvatarGroup
                      renderSurplus={(surplus) => (
                        <span>+{surplus.toString()[0]}</span>
                      )}
                      total={contributors?.length}
                      className="self-center"
                    >
                      {contributors?.map((data, index) => (
                        <HtmlTooltip
                          key={index}
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                {data.first_name} {data.last_name}
                              </Typography>
                              <Link component={RL} to={`/${data.username}`}>
                                {data.username}
                              </Link>
                              {data.bio && (
                                <Typography color="inherit">
                                  {Limiter(data.bio)}
                                </Typography>
                              )}
                            </React.Fragment>
                          }
                        >
                          <Avatar alt={data.username} src={data.picture} />
                        </HtmlTooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Box>
                <Box px={"10px"} className="self-center">
                  <Box sx={{ flexGrow: 1 }}>
                    Tools:{" "}
                    {tools?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data.tool || ""}
                        className="m-0.5 capitalize"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="p"
                component='p'
                color="text.secondary"
                className="py-10 font-semibold text-lg"
              >
                {(<HTMLRenderer htmlContent={project.content} />) || ""}
              </Typography>
            </CardContent>
            <Box px={"10px"}>
              <Box sx={{ flexGrow: 1 }}>
                Tags:{" "}
                {tags?.map((data, index) => (
                  <Chip
                    key={index}
                    label={data.tag || ""}
                    className="m-0.5 capitalize"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </Box>
      </ThemeProvider>
      <Footer />
    </React.Fragment>
  );
};

export default Project;
