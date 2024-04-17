import React from "react";
import { Card, Typography, Box, Grid, Paper, Modal } from "@mui/material";
import Limiter from "../Limiter";

export default function AboutCard({custom,  education = [], experience = [], title }) {
    const passed = education.length > 0 ? education : experience;
    const [openIndex, setOpenIndex] = React.useState(null);

    const handleOpen = (index) => setOpenIndex(index);
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
        <Card className={`p-2 xl:p-6 ${custom||''}`}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>{title}</Typography>
            {passed.slice(0, 4).map((data, index) => (
                <div key={index}>
                    <Box className="my-2 xl:my-6 cursor-pointer" onClick={() => handleOpen(index)} >
                        <Paper elevation={6} className='p-2'>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                    <Typography variant='p' component='p' className='text-sm'>{data.start_date} - {data.end_date || "in progress"}</Typography>
                                    <Typography variant='p' component='p' className='font-bold capitalize'>{data.institute || data.company || ""}</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='p' component='p' className='font-bold capitalize'>{data.degree || data.position || ""}</Typography>
                                    <Typography variant='p' component='p' >{Limiter(data.detail, 100)}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                    <Modal
                        open={openIndex === index}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" className="capitalize" variant="h6" component="h2">
                                {data.institute && `institute: ${data.institute}` || data.company && `company: ${data.company}`}
                            </Typography>
                            <Typography id="modal-modal-title" className="capitalize text-right" variant="p" component="h2">
                                started: <b>{data.start_date}</b> <br />ended: <b>{data.end_date || 'in progress'}</b>
                            </Typography>
                            <Typography id="modal-modal-title" className="capitalize text-right mb-7" variant="p" component="h2">
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
            ))}
        </Card>
    )
}
