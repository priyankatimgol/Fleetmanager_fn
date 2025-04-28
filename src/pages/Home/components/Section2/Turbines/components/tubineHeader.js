import React from 'react'
import Customers from './customers';
import { Divider, Grid, Typography } from '@mui/material';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Search from './search';
function TubineHeader({ data }) {
  return (
    <div><Grid container spacing={3}  alignItems="flex-start">
      <Grid item md={8}>
       
        <Grid container spacing={1}>
          {data?.turbine_actions?.map((item, ind) => {
            return (
              <Grid item className="action">
                <Grid container spacing={1} className="pr-item">
                  <Grid item>
                    <FiberManualRecordIcon style={{ color: item?.color }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" className="turbin-label">
                      {item?.name}
                    </Typography>
                  </Grid>
                </Grid>
                {data?.turbine_actions?.length - 1 !== ind && (
                  <Divider orientation="vertical" variant="middle" flexItem />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item md={4} className="search-wrepper paddtop">
      <Grid container spacing={2}>
      <Grid item md={6}>          
     <Search/>
      </Grid>
      <Grid item md={6}>     
        <Customers />
        </Grid>
      </Grid>       
      </Grid>
    </Grid>
    </div>
  )
}

export default TubineHeader