import React from 'react'
import { Grid, Typography } from '@mui/material';
import TurbinIcon from '../../../../../../assets/icon/iconT.svg'
function TurbinCard({data}) {
  return (
    <div>
     <Grid container spacing={1} className='turbine-wrepper'>
     {data?.listing?.map((item, ind) => {
            return (
              <Grid item>
              <div className={"turbin-icon " + 
              (item?.color==='suzlonGreen'?'green-turbine' : '') + 
              (item?.color==='blue'?'blue-turbine' : '')+ 
              (item?.color==='lightGreen'?'light-green-turbine' : '')}>
                <img src={TurbinIcon} alt=""/>
              <Typography variant="caption" className="turbin-label-icon">
               {item?.name}
              </Typography>
              </div>
           
            </Grid>
            );
          })}
                  {/* <Grid item>
                    <div className='turbin-icon'>
                      <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                   AD078
                    </Typography>
                    </div>
                 
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className='turbin-icon'>
                      <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                 
                  </Grid>
                  <Grid item>
                    <div className='turbin-icon'>
                      <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                 
                  </Grid>
                  <Grid item>
                    <div className='turbin-icon green-turbine'>
                      <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                 
                  </Grid>
                  <Grid item>
                    <div className='turbin-icon'>
                      <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                 
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon light-green-turbine'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>

                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon blue-turbine'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                  <div className='turbin-icon'>
                  <img src={TurbinIcon} alt=""/>
                    <Typography variant="caption" className="turbin-label-icon">
                     AD078
                    </Typography>
                    </div>
                  </Grid> */}
                </Grid>
    </div>
  )
}

export default TurbinCard