import React, { useEffect, useState } from "react";
import ResponsiveAppBar, { appTheme } from "../components/Nav";
import { UserNavLinks } from "../data/NavLinks";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Box, Typography, CssBaseline } from "@mui/material";
import Hero from "../components/PortfolioSections/Hero";
import About from "../components/PortfolioSections/About";
import Skills from "../components/PortfolioSections/Skills";
import Projects from "../components/PortfolioSections/Projects";
import Blog from "../components/PortfolioSections/Blog";
import Contact from "../components/PortfolioSections/Contact";
import PageTitle from "./PageTitle";
import { useLoaderData } from "react-router-dom";
import GetUser, { getUserData, GetRelation } from "../data/GetUser";
import Error, { ErrorCard } from "./Error";
import Loading from "../components/PageLoad";
import { ThemeProvider } from '@mui/material/styles';


function Portfolio() {
    const id = useLoaderData();
    PageTitle(id?.username);
    const currLoc = useLocation();

    if (id.error) {
        return <ErrorCard
            error={'not found'}
            code={404}
            content={id.error + " in porthree"}
            nav={true}
        />
    }

    const [user, setUser] = useState([]);
    const [tools, setTools] = useState(null);
    const [educations, setEducations] = useState(null);
    const [experiences, setExperiences] = useState(null);
    const [skills, setSkills] = useState(null);
    const [socials, setSocials] = useState(null);
    const [projects, setProjects] = useState(null);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDataForUser = async () => {
            // console.log(id)
            const fetchedUser = await GetUser(id);
            if (!fetchedUser.loading) {
                // setData(result.data);
                setLoading(false);
                setUser(fetchedUser);

            }
            let dataResult = [];
            let relationList = [];
            if (fetchedUser) {

                /* fetch all users tools  */
                // dataResult = await GetRelation(`http://localhost:8000/api/tools/?user=${fetchedUser.id}`);
                for (const tool of fetchedUser.tools) {
                    const data = await GetRelation(tool);
                    relationList.push(data)
                }

                setTools(relationList);
                /* fetch all users educations  */
                dataResult = await GetRelation(fetchedUser.url + "educations/");
                setEducations(dataResult.results);
                /* fetch all users experiences  */
                dataResult = await GetRelation(fetchedUser.url + "experiences/");
                setExperiences(dataResult.results);

                /* fetch all users skills  */
                dataResult = await GetRelation(`http://localhost:8000/api/skills/?user=${fetchedUser.id}`);
                setSkills(dataResult.results);

                /* fetch all users socials  */
                setSocials(await getUserData(fetchedUser.id, "socials"));
                /* fetch all users projects  */
                dataResult = await GetRelation(fetchedUser.url + "projects/");
                setProjects(dataResult.results);
                /* fetch all users posts  */
                dataResult = await GetRelation(fetchedUser.url + "posts/");
                setBlog(dataResult.results);
            }
        };
        fetchDataForUser();
    }, [id]);

    if (loading) { return <Loading /> }

    // console.log(skills)
    const errHandle = [
        user,
        tools,
        educations,
        experiences,
        skills,
        socials,
        projects,
    ];

    for (const data of errHandle) {
        if (data && data.status && data.statusText) {
            return <Error err={data} />;
        }
    }

    return (
        <React.Fragment>
            <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
            <ThemeProvider theme={appTheme}>
            <CssBaseline />
                <Box padding={{ xs: "10px", sm: "50px" }} className='scroll-smooth'>
                    {!user ? (
                        <Typography variant="h1" component="h1">
                            Portfolio not in Porthree
                        </Typography>
                    ) : (
                        <>
                            <Breadcrumb path={currLoc} />
                            <Hero props={user} />
                            {!user && !tools && !experiences && !educations ? (
                                ""
                            ) : (
                                <About
                                    user={user}
                                    tools={tools}
                                    experience={experiences}
                                    education={educations}
                                />
                            )}
                            {skills && <Skills skills={skills} custom={user} />}
                            {projects && <Projects projects={projects} user={user} />}
                            {blog && <Blog blog={blog} user={user} />}
                            <Contact contacts={user} socials={socials} />
                        </>
                    )}
                </Box>
            </ThemeProvider>
            <Footer />
        </React.Fragment>
    );
}

export default Portfolio;
