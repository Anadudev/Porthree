import React, { useState, useEffect, useRef } from "react";
import {
    Box, Typography, Grid, Paper,
    Dialog, DialogContent,
    DialogContentText, DialogTitle
} from "@mui/material";
import Limiter from "../Limiter";
import moment from 'moment';

export default function AboutCard({ key, data, customize }) {
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
        <div key={key}>
            <Box className="my-2 xl:my-6 cursor-pointer" onClick={handleClickOpen('paper', key)}>
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
            <Dialog
                open={open === key}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ color: `${customize?.secondary_color || ''}` }}>
                    {data.institute && `institute: ${data.institute}` || data.company && `Company: ${data.company}`}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Typography id="modal-modal-title" className="capitalize" variant="p" component="h2">
                            started: <b>{moment(data.start_date).format('MMM D, YYYY')}</b> <br />ended: <b>{data.end_date ? moment(data.end_date).format('MMM D, YYYY') : "Present"}</b>
                        </Typography>
                        <Typography id="modal-modal-title" className="capitalize mb-7" variant="p" component="h2" >
                            {
                                (data.institute && <span>degree: <b>{data.degree}</b></span>) ||
                                (data.company && <span>position: <b>{data.position}</b></span>)
                            }
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {data.detail || ''}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                      </DialogActions> */}
            </Dialog>
        </div>
    )
}
