import { Grid } from "@mui/material";
import { data } from "pages/Home/utils";
import React from "react";
import Card from "./Components/card";
import WindSpeed from "./Components/windSpeed";

function TopSection() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
         <WindSpeed />  
          </Grid>
      {data?.section1?.map((item) => {
        return (
          <Grid item xs={3}>
            <Card item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TopSection;
