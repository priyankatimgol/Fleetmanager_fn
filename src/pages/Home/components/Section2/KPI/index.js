import { Grid, Typography } from "@mui/material";
import BarChart from "./BarChart";
import PlanningKPI from "../Planning-KPI";
import PieChart from "./PieChart";

function KPI() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7} md={7}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <BarChart
              dropDown={false}
              icon='task'
              label='MA'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <BarChart
              dropDown={false}
              icon='task'
              label='GA'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <PieChart
              dropDown={true}
              label='PM'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <PieChart
              dropDown={true}
              label='TCI'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <PieChart
              dropDown={true}
              label='IDRV'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <PieChart
              dropDown={true}
              label='LS'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <BarChart
              dropDown={true}
              icon='timer'
              label='MTTR'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <BarChart
              dropDown={true}
              icon='timer'
              label='MTBF'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <BarChart
              dropDown={false}
              icon='task'
              label='Below 95'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5} md={5}>
      <div>
        <PlanningKPI/>
        </div>
      </Grid>
    </Grid>
  );
}

export default KPI;
