import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TopErrorsCard from './TopErrorCard/index';
import MABucketingCard from './MABucketing/index';
import { useDispatch, useSelector } from 'react-redux';
import { getMTTR_MTBF, getPMLSTCIData, getTop10Error } from 'redux/actions/SiteHomeActions';
import BarChartPmLsTci from '../KPI/PMTCILSChart';
import { MTBFData, MTTRData } from 'pages/KPI\'s/utils';
import BarChartMTBF from '../KPI/MTBFChart';
import MTTRChart from '../KPI/MTTRChart';

const ErrorBucketCard = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state);
    const MA_GA_DATA = state.siteHomeKpi.siteInchargeKpi?.MA_GA;
    const SelSite = state.siteHomeKpi?.selSite;
    const errorData = state?.siteHomeKpi?.top10Error ?? [];
    const mttr_mtbf_data = state?.siteHomeKpi?.mttrMtbf ?? [];
    const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];

    const [mttr, setMttr] = useState([])
    const [mtbf, setMtbf] = useState([])

    useEffect(() => {
        if (mttr_mtbf_data) {
            const mttrVals = mttr_mtbf_data.filter(d => d.KPIType === "MTTR");
            setMttr(mttrVals);
            const mtbfVals = mttr_mtbf_data.filter(d => d.KPIType === "MTBF");
            setMtbf(mtbfVals);
        }
    }, [mttr_mtbf_data])

    useEffect(() => {
       if(SelSite) {
        dispatch(getTop10Error(SelSite))
        dispatch(getMTTR_MTBF(SelSite))
       }
    }, [SelSite])

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} md={7} className='topTenErrors'>
                <TopErrorsCard data={errorData} label="TOP 10 ERRORS" showToolbar={true} kpiDatabase={kpiDatabase}/>
            </Grid>
            <Grid item xs={12} md={5} className='timerRight'>
                <Grid item xs={12} md={12}  >
                <BarChartMTBF data={mtbf} dropDown={true} icon="timer" label="MTBF" />
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                <MTTRChart data={mttr} dropDown={true} icon="timer" label="MTTR" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ErrorBucketCard;
