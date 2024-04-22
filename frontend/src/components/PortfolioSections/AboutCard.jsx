import React from "react";
import { Card, Typography, Box, Grid, Paper, Modal } from "@mui/material";
import Limiter from "../Limiter";
import moment from 'moment';

export default function AboutCard({ key, data, customize }) {
    // const passed = education.length > 0 ? education : experience;
    const [openIndex, setOpenIndex] = React.useState(null);

    const handleOpen = (data) => setOpenIndex(data);
    const handleClose = () => setOpenIndex(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '48rem',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
        p: 2,
    };

    return (
        <div key={key}>
            <Box className="my-2 xl:my-6 cursor-pointer" onClick={() => handleOpen(key)} >
                <Paper elevation={6} className='p-2'>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={4}>
                            <Typography variant='p' component='p' className='text-sm'>{moment(data.start_date).format('MMM D, YYYY')} - {data.end_date ? moment(data.end_date).format('MMM D, YYYY') : "Present"}</Typography>
                            <Typography variant='p' component='p' className='font-bold capitalize' sx={{ color: `${customize?.secondary_color || ''}` }}>{data.institute || data.company || ""}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='p' component='p' className='font-bold capitalize' sx={{ color: `${customize?.secondary_color || ''}` }}>{data.degree || data.position || ""}</Typography>
                            <Typography variant='p' component='p' >{Limiter(data.detail, 100)}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Modal keepMounted
                open={openIndex === key}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" className="capitalize" variant="h6" component="h2" sx={{ color: `${customize?.secondary_color || ''}` }}>
                        {data.institute && `institute: ${data.institute}` || data.company && `company: ${data.company}`}
                    </Typography>
                    <Typography id="modal-modal-title" className="capitalize text-right" variant="p" component="h2">
                        started: <b>{moment(data.start_date).format('MMM D, YYYY')}</b> <br />ended: <b>{data.end_date ? moment(data.end_date).format('MMM D, YYYY') : "Present"}</b>
                    </Typography>
                    <Typography id="modal-modal-title" className="capitalize text-right mb-7" variant="p" component="h2" >
                        {
                            (data.institute && <span>degree: <b>{data.degree}</b></span>) ||
                            (data.company && <span>position: <b>{data.position}</b></span>)
                        }
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {data.detail || ''}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
