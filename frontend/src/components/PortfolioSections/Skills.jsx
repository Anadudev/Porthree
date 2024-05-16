import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box, Typography,
  Dialog, DialogContent,
  DialogContentText, DialogTitle, Button
} from "@mui/material";
import Limiter from '../Limiter';
import HTMLRenderer from '../HtmlRender';
import { Link } from 'react-router-dom';

const Skills = ({ skills, custom }) => {
  if (!skills || skills.length < 1) {
    return null;
  }

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

  return (
    <Box component="section" id="skills">
      <SectionHeader title={'What i do'} custom={custom} />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {skills && skills.map((data, index) => (
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
        <Button component={Link} to={`/${custom?.username}/skills`} sx={{ color: `${custom?.secondary_color || ''}` }}>More...</Button>
      </Box>
    </Box>
  );
}

export default Skills;
