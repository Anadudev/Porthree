import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../components/Nav';
import { UserNavLinks } from '../data/NavLinks';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Hero from '../components/PortfolioSections/Hero';
import About from '../components/PortfolioSections/About';
import Skills from '../components/PortfolioSections/Skills';
import Projects from '../components/PortfolioSections/Projects';
import Blog from '../components/PortfolioSections/Blog';
import Contact from '../components/PortfolioSections/Contact';
import PageTitle from './PageTitle';
import GetUser from '../data/GetUser';
import { useLoaderData } from 'react-router-dom';
import { getUserData } from '../data/GetUser';
import Error from './Error';

const fetchData = async (id, fn, endPoint) => {
    try {
        const fetchedData = await fn(id, endPoint);
        return fetchedData;
    } catch (error) {
        console.error(`Error fetching ${endPoint} data:`, error);
        return null;
    }
};

function Portfolio() {
    const id = useLoaderData();
    const [user, setUser] = useState([]);
    const [tools, setTools] = useState(null);
    const [educations, setEducations] = useState(null);
    const [experiences, setExperiences] = useState(null);
    const [skills, setSkills] = useState(null);
    const [socials, setSocials] = useState(null);
    const [projects, setProjects] = useState(null);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchDataForUser = async () => {
            const fetchedUser = await fetchData(id, GetUser, '');
            setUser(fetchedUser);
            if (fetchedUser) {
                setTools(await fetchData(fetchedUser.id, getUserData, 'tools'));
                setEducations(await fetchData(fetchedUser.id, getUserData, 'educations'));
                setExperiences(await fetchData(fetchedUser.id, getUserData, 'experiences'));
                setSkills(await fetchData(fetchedUser.id, getUserData, 'skills'));
                setSocials(await fetchData(fetchedUser.id, getUserData, 'socials'));
                setProjects(await fetchData(fetchedUser.id, getUserData, 'projects'));
                setBlog(await fetchData(fetchedUser.id, getUserData, 'posts'));
                PageTitle(fetchedUser.username);
            }
        };
        fetchDataForUser();
    }, [id]);
    const errHandle = [user, tools, educations, experiences, skills, socials, projects,]
    for (const data of errHandle) {
        if (data && data.status && data.statusText) {
            return (<Error err={data} />);
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currLoc = useLocation();
    const contacts = { phone: user?.phone, email: user?.email, location: user?.location };
    // console.log(blog)
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks(user)} />
            <Box p="50px">
                {!user ? (
                    <Typography variant="h1" component="h1">Portfolio not in Porthree</Typography>
                ) : (
                    <>
                        <Breadcrumb path={currLoc} />
                        <Hero props={user} />
                        <About user={user} tools={tools} experience={experiences} education={educations} />
                        {skills && <Skills skills={skills} />}
                        {projects && <Projects projects={projects} />}
                        {blog && <Blog blog={blog} />}
                        <Contact contacts={contacts} socials={socials} />
                    </>
                )}
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default Portfolio;
