import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useLoaderData } from "react-router-dom";
import { GetRelation } from '../data/GetUser';
import {
  Box, Typography, Pagination,
  Dialog, DialogContent,
  DialogContentText, DialogTitle,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
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
  const location = useLocation();

  const [user, setUser] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [initialCount, setInitialCount] = useState(0);
  const [open, setOpen] = useState(null);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType, id) => () => {
    setOpen(id);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    async function fetchData() {
      setUser(await GetRelation(`http://127.0.0.1:8000/api/users/${userId.id}/`));
      setResult(await GetRelation(`http://127.0.0.1:8000/api/skills/?page=${page}&user=${userId.id}`));
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
    <Fragment>

      <ResponsiveAppBar pages={UserNavLinks(user)} custom={user} />
      <Box padding={{ xs: "10px", sm: "50px", minHeight: '90vh' }}>
        <Breadcrumb path={location} />
        <Box className='flex justify-center'>
          {skills && skills.length > 0 ? <Box>
            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Grid
                container
                spacing={2}
                alignItems={'center'}
                justifyContent={'center'}
              >
                {skills.map((data, index) => (
                  <Grid key={index} {...{ xs: 12, sm: 8, md: 4, lg: 3, m: 0.5 }} className="border-4 rounded-lg">
                    <Box className=" p-2 cursor-pointer" onClick={handleClickOpen('paper', index)}>
                      <Typography component='h3' className='uppercase' sx={{ fontWeight: '900', mb: 2 }}>{data.skill}</Typography>
                      <Typography variant='body1' component='p' sx={{ textWrap: 'wrap' }}>{(<HTMLRenderer htmlContent={Limiter(data.detail, 200)} />)}</Typography>
                    </Box>
                    <Dialog
                      open={open === index}
                      onClose={handleClose}
                      scroll={scroll}
                      aria-labelledby="scroll-dialog-title"
                      aria-describedby="scroll-dialog-description"
                    >
                      <DialogTitle id="scroll-dialog-title">{data.skill || ''}</DialogTitle>
                      <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                          id="scroll-dialog-description"
                          ref={descriptionElementRef}
                          tabIndex={-1}
                        >
                          {(<HTMLRenderer htmlContent={data.detail} />)}
                        </DialogContentText>
                      </DialogContent>
                      {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                      </DialogActions> */}
                    </Dialog>
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
          </Box> : ''}
        </Box>
      </Box>
      <Footer />
    </Fragment>

  )
}

export default Skills;