import { Grid } from '@mui/material';
import React from 'react';
import ProgressBarCard from './ProgressBar';
import CircleBarCard from './CircleBar';

const PlanningKPI = () => {
    return (
        <>
           <Grid>
            <ProgressBarCard />
            <CircleBarCard />
           </Grid>
        </>
    );
};

export default PlanningKPI;