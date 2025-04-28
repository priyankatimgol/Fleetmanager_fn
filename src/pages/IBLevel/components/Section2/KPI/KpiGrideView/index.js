import { Grid, Typography } from "@mui/material";

import "./styles.css";
import { useSelector } from "react-redux";

const colors = ["#36A98A", "#FFBF00", "#7098FF", "#45C052"];

const KpiGridView = ({ data }) => {
  const state = useSelector((state) => state);
  const scoreCardData = state?.IBLevel?.scoreCardData ?? [];

  return (
    <div>
      <Grid container className="mb-10">
        <Grid item xs={6} md={6} className="pt-7">
          <Typography
            variant="h6"
            fontSize={14}
            color="#505050"
            fontWeight="600"
          >
            Score Card
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} className="pt-7">
          <Grid container spacing={2}>
            <Grid item className="w-20">
              <Typography variant="h6" fontSize={12} color="#505050">
                Annual{" "}
              </Typography>
            </Grid>
            <Grid item className="w-20">
              <Typography variant="h6" fontSize={12} color="#505050">
                Q1{" "}
              </Typography>
            </Grid>
            <Grid item className="w-20">
              <Typography variant="h6" fontSize={12} color="#505050">
                Q2{" "}
              </Typography>
            </Grid>
            <Grid item className="w-20">
              <Typography variant="h6" fontSize={12} color="#505050">
                Q3{" "}
              </Typography>
            </Grid>
            <Grid item className="w-20">
              <Typography variant="h6" fontSize={12} color="#505050">
                Q4{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {scoreCardData && scoreCardData?.map((d, i) => (
        <>
          <Grid container className="mb-10 gray-bg border-green-s">
            <Grid item xs={6} md={6} className="pt-7">
              <Typography variant="h6" fontSize={12} color="#505050">
                {d.Colname}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} className="pt-7">
              <Grid container spacing={2}>
                <Grid item className="w-20">
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.Annual}%{" "}
                  </Typography>
                </Grid>
                <Grid item className="w-20">
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.Q1}%{" "}
                  </Typography>
                </Grid>
                <Grid item className="w-20">
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.Q2}%{" "}
                  </Typography>
                </Grid>
                <Grid item className="w-20">
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.Q3}%{" "}
                  </Typography>
                </Grid>
                <Grid item className="w-20">
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.Q4}%{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ))
      }


    </div>
  );
};

export default KpiGridView;
