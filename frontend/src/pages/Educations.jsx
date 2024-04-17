import React, { useState, useEffect } from 'react'
import { useLoaderData, useLocation } from "react-router-dom";
import { GetRelation } from '../data/GetUser';
import AboutCard from '../components/PortfolioSections/AboutCard';
import { Box } from "@mui/material";
import DrawerAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from "../data/NavLinks";
import PageTitle from './PageTitle';
import Breadcrumb from '../components/Breadcrumb';

const Educations = () => {
  const user = useLoaderData();
  PageTitle(user?.username + ' Educations');
  const [educations, setEducations] = useState("");
  useEffect(() => {
    async function getData() {
      setEducations((await GetRelation(`http://127.0.0.1:8000/api/users/${user.id}/educations`)).results);
    }
    getData();
  }, [user])

  // console.log(user);
  return (
    <React.Fragment>

      <DrawerAppBar pages={UserNavLinks(user)} />
      <Box padding={{ xs: "10px", sm: "50px" }}>
        <Breadcrumb path={useLocation()} />
      <Box className='flex justify-center'>
        {educations?.length > 0 && <AboutCard education={educations} title={"Education"} custom={'max-w-[60rem]'} />}
      </Box>
      </Box>
      <Footer />

    </React.Fragment>

  )
}

export default Educations;