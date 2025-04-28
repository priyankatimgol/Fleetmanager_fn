import { Grid } from '@mui/material'
import React from 'react'
import Turbines from './Turbines'
import KPI from './KPI'
import { data } from 'pages/Home/utils'
import TopSection from '../Section1'

function MainSection() {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={7} className='pt-5'>
             <TopSection/>
             <div>
             <Turbines data={data?.section2}/>
             </div>
         
        </Grid>
        <Grid item xs={12} md={5} className='pt-5'>
            <KPI />
        </Grid>
    </Grid>
  )
}

export default MainSection