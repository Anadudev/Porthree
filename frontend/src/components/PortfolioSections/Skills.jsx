import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Modal } from '@mui/material';
import Limiter from '../Limiter';
import HTMLRenderer from '../HtmlRender';

const Skills = ({ skills, custom }) => {
  if (!skills || skills.length < 1) {
    return null;
  }

  const [openIndex, setOpenIndex] = useState(null);

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

  return (
    <Box component="section" id="skills">
      <SectionHeader title={'What i do'} />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {skills.map((data, index) => (
            <Grid key={index} {...{ xs: 12, sm: 8, md: 4, lg: 3, m:0.5}}  className="border-4 rounded-lg">
              <Box className=" p-2 cursor-pointer" onClick={() => handleOpen(index)}>
                <Typography component='h3' className='uppercase' sx={{ fontWeight: '900', mb:2 }}>{data.skill}</Typography>
                <Typography variant='body1' component='p' sx={{textWrap:'wrap'}}>{(<HTMLRenderer htmlContent={Limiter(data.detail, 200)} />)}</Typography>
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
          <Typography sx={{m:2}}>More</Typography>
      </Box>
    </Box>
  );
}

export default Skills;
