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

const componentData = (id, fn, endPoint) => {
    const [data, setData] = useState(null); // State to store fetched data

    // Fetch data on component mount (or when needed)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fn(id, endPoint); // Call the GetData function
                setData(fetchedData);
                // console.log(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors appropriately, e.g., display an error message
            }
        };
        fetchData(); // Execute the data fetching logic
    }, [id]);
    return data;
}

const Portfolio = () => {
    const id = useLoaderData();
    const [user, setUser] = useState([]); // State to store fetched user

    // Fetch data on component mount (or when needed)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await GetUser(id); // Call the GetUser function
                setUser(fetchedUser);
                // console.log(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                // Handle errors appropriately, e.g., display an error message
            }
        };
        fetchData(); // Execute the data fetching logic
    }, [id]);

    const tools = componentData(user?.id, getUserData, "tools")
    const  educations = componentData(user?.id, getUserData, "educations")
    const  experiences = componentData(user?.id, getUserData, "experiences")
    const  skills = componentData(user?.id, getUserData, "skills")
    const  socials = componentData(user?.id, getUserData, "socials")
    PageTitle(user?.username);
    const currLoc = useLocation()
    const contacts = {phone:user.phone,email:user.email, location:user.location}
    // console.log(contacts);
    // console.log(user);
    return (
        <React.Fragment>
            <DrawerAppBar pages={UserNavLinks} />
            <Box p={"50px"}>
                {user.length == 0 ? (<Typography variant="h1" component="h1">Portfolio not in Porthree</Typography>) : (
                    <>
                        <Breadcrumb path={currLoc} />
                        <Hero props={user} />
                        <About user={user} tools={tools} experience={experiences} education={educations}/>
                        <Skills skills={skills} />
                        <Projects />
                        <Blog />
                        <Contact contacts={contacts} socials={socials}/>
                    </>)}
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Portfolio
