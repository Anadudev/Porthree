import React, { useState, useEffect } from 'react'
import { useLoaderData } from "react-router-dom";
import GetUser, { GetRelation } from '../data/GetUser';
import AboutCard from '../components/PortfolioSections/AboutCard';
import { Box, Typography, Card, Pagination } from "@mui/material";
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from "../data/NavLinks";
import PageTitle from './PageTitle';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';


const Educations = () => {
  const userId = useLoaderData();
  PageTitle(userId?.username + ' Educations');
  const [user, setUser] = useState("");
  const [educations, setEducations] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [initialCount, setInitialCount] = useState(0);

  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      setUser((await GetUser(userId)));
      setResult(await GetRelation(`http://127.0.0.1:8000/api/users/${userId.id}/educations/?page=${page}`));
      if (result && result.results) {
        setEducations(result.results);
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
  return (
    <React.Fragment>

      <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
      <Box padding={{ xs: "10px", sm: "50px" }}>
        <Breadcrumb path={location} />
        <Box className='flex justify-center'>
          {educations && <Card className={`p-2 xl:p-6 w-[60rem]`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>Educations</Typography>
            {educations.slice(0, 4).map((data, index) => (
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

    </React.Fragment >

  )
}

export default Educations;