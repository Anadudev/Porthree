import React, { useState, useEffect } from 'react'
import { useLoaderData } from "react-router-dom";
import { GetRelation } from '../data/GetUser';
import AboutCard from '../components/PortfolioSections/AboutCard';
import { Box, Card, Typography, Pagination } from "@mui/material";
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from "../data/NavLinks";
import PageTitle from './PageTitle';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';
import HiddenPortfolioCard from '../components/HiddenPortfolioCard';

const Experiences = () => {
  const userId = useLoaderData();
  PageTitle(userId?.username + ' Experiences');
  const [user, setUser] = useState("");
  const [experiences, setExperiences] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [initialCount, setInitialCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      setUser((await GetRelation(`api/users/${userId.id}/`)));
      setResult(await GetRelation(`api/users/${userId.id}/experiences/?page=${page}`));
      if (result && result.results) {
        setExperiences(result.results);
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
  }, [page, result.count, count, result.next]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  if (loading) {
    return <Loading />
  }
  // console.log(user);
  return user.visibility ? (
    <React.Fragment>
      <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
      <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
        <Breadcrumb path={location} />
        <Box className='flex justify-center'>
          {experiences && <Card className={`p-2 xl:p-6 w-[60rem]`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Experiences</Typography>
            {experiences.slice(0, 4).map((data, index) => (
              <AboutCard key={index} data={data} customize={user} />
            ))}
            <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={count}
                variant="outlined"
                color="primary"
                page={page}
                onChange={handleChange}
              />
            </Box>
          </Card>}
        </Box>
      </Box>
      <Footer />
    </React.Fragment>

  ) : <HiddenPortfolioCard user={user.username}/>
}

export default Experiences;
