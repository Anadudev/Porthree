import React from 'react'
import SectionHeader from './SectionHeader'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Modal } from '@mui/material';
import Limiter from '../Limiter';

const Skills = ({ skills }) => {
  if (!skills || skills.length < 1) {
    return null;
  }

  const [openIndex, setOpenIndex] = React.useState(null);

  const handleOpen = (index) => setOpenIndex(index);
  const handleClose = () => setOpenIndex(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600rem',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 2,
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
            <Grid key={index} {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {/* <div> */}
              <Box className=" p-2 cursor-pointer" onClick={() => handleOpen(index)}>
                <Typography component='p' className='uppercase' sx={{ fontWeight: '900' }}>{data.skill}</Typography>
                <Typography variant='p' component='p'>{Limiter(data.detail, 200)}</Typography>
              </Box>
              {/* </Grid> */}
              <Modal
                open={openIndex === index}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" className="capitalize" variant="h6" component="h2">
                    {data.skill || ''}
                    </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>

                    {data.detail || ''}
                    </b>
                  </Typography>
                </Box>
              </Modal>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Skills;
