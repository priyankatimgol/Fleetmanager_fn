import { Grid, Typography,Box } from "@mui/material";
import React from "react";

function Card({ item }) {
  return (
    <div>
      {/* <Grid container spacing={1}>
        {item?.icon && <Grid item>{item?.icon}</Grid>}
        <Grid item>
          <Typography variant="h5">{item?.name}</Typography>
          <Typography variant="caption">{item?.caption}</Typography>
        </Grid>
      </Grid> */}

       <Box className="top-card inside-card">     
            <Box className="kip-circle-div" style={{ borderColor: `${item?.color}` }} >
                  <Typography className="kip-value">
              {item?.caption}
                </Typography>
                <Typography className="kip-units">
             {item?.unit}
                </Typography>
             </Box>
             <Typography className="kpi-title">
              <img src={item?.icon} alt="icon"/>
             {item?.name}
             </Typography>
        
       </Box>
    </div>
  );
}

export default Card;
