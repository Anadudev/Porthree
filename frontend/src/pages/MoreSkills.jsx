import React, { useState, useEffect } from 'react'
import { useLoaderData } from "react-router-dom";
import GetUser, { GetRelation } from '../data/GetUser';
import AboutCard from '../components/PortfolioSections/AboutCard';
import { Box, Typography, Card, Pagination, Modal, Grid } from "@mui/material";
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { UserNavLinks } from "../data/NavLinks";
import PageTitle from './PageTitle';
import Breadcrumb from '../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Loading from '../components/PageLoad';
import HTMLRenderer from '../components/HtmlRender';
import Limiter from '../components/Limiter';

const Skills = () => {
  const userId = useLoaderData();
  PageTitle(userId?.username + ' Skills');
  const [user, setUser] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [initialCount, setInitialCount] = useState(0);

  const handleOpen = (index) => setOpenIndex(index);
  const handleClose = () => setOpenIndex(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600rem',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 2,
  };
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      setUser((await GetUser(userId)));
      setResult(await GetRelation(`http://127.0.0.1:8000/api/skills/?page=${page}&user=${user.id}`));
      if (result && result.results) {
        setSkills(result.results);
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
          {skills && <Box>
            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Grid
                container
                spacing={2}
                alignItems={'center'}
                justifyContent={'center'}
              >
                {skills.map((data, index) => (
                  <Grid key={index} {...{ xs: 12, sm: 8, md: 4, lg: 3, m: 0.5 }} className="border-4 rounded-lg">
                    <Box className=" p-2 cursor-pointer" onClick={() => handleOpen(index)}>
                      <Typography component='h3' className='uppercase' sx={{ fontWeight: '900', mb: 2 }}>{data.skill}</Typography>
                      <Typography variant='body1' component='p' sx={{ textWrap: 'wrap' }}>{(<HTMLRenderer htmlContent={Limiter(data.detail, 200)} />)}</Typography>
                    </Box>
                    <Modal keepMounted
                      open={openIndex === index}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" className="capitalize" variant="h6" component="h2">
                          {data.skill || ''}
                        </Typography>
                        <Typography component="body1" id="modal-modal-description" sx={{ mt: 2 }}>
                          {data.detail || ''}
                        </Typography>
                      </Box>
                    </Modal>
                  </Grid>
                ))}
              </Grid>
              <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={count}
                  variant="outlined"
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>}
        </Box>
      </Box>
      <Footer />

    </React.Fragment>

  )
}

export default Skills;