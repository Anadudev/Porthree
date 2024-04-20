import React, { useState, useEffect } from 'react'
import { useLoaderData } from "react-router-dom";
import GetUser, { GetRelation } from '../data/GetUser';
import AboutCard from '../components/PortfolioSections/AboutCard';
import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from "../data/NavLinks";
import PageTitle from './PageTitle';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
const Experiences = () => {
  const userId = useLoaderData();
  PageTitle(userId?.username + ' Experiences');
  const [user, setUser] = useState("");
  const [experiences, setExperiences] = useState("");
  useEffect(() => {
    async function getData() {
      setExperiences((await GetRelation(`http://127.0.0.1:8000/api/users/${userId.id}/experiences`)).results);
      setUser((await GetUser(userId)));
    }
    getData();
  }, [userId])

  // console.log(user);
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} />
      <Box padding={{ xs: "10px", sm: "50px" }}>
        <Breadcrumb path={useLocation()} />
      <Box className='flex justify-center'>
        {experiences?.length > 0 && <AboutCard experience={experiences} title={"Experience"} custom={'max-w-[60rem]'} customize={user} />}
      </Box>
      </Box>
      <Footer />

    </React.Fragment>

  )
}

export default Experiences;