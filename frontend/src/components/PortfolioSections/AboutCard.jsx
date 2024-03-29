import React from "react";
import { Card, Typography, Box, Grid, Paper } from "@mui/material";
import Limiter from "../Limiter";
export default function AboutCard({ education = [], experience = [], title }) {
    const passed = education.length > 0 ? education : experience;
    return (
        <Card className={'p-2 xl:p-6'}>
            <Typography variant='h6' component={'p'} mb={'20px'} className='font-dark uppercase'>{title}</Typography>
            {passed.slice(0, 4).map((data) => (
                <Box key={data.id} className="my-2 xl:my-6" >
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
            ))}
        </Card>
    )
}
