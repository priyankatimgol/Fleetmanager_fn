import { Grid, Stack } from "@mui/material";
import { Ib_Top_Kpi } from "pages/IBLevel/utils";
import React, { useEffect, useState } from "react";
import Card from "./Components/card";
import MTTRMTBFCard from "./Components/MTTRMTBF";
import { useSelector } from "react-redux";
import MTTRCard from "./Components/MTTRCard";
import MTBFCard from "./Components/MTBFCard";
import Spinner from "pages/common-components/Spinner";
import WTGCard from "./Components/WTGCard";
import CAMACard from "./Components/CAMACard";
function TopSection() {
  const state = useSelector((state) => state);
  const mttrMtbfData = state?.IBLevel?.mttrMtbfData ?? [];
  const wtgData = state?.IBLevel?.wtgData ?? [];
  const WTG_Loader = state?.IBLevel?.WTG_Loader ?? [];
  const MTTR_MTBF_Loader = state?.IBLevel?.MTTR_MTBF_Loader ?? [];
  const CAMAData = state?.IBLevel?.CAMAData ?? [];
  const CAMA_Loader = state?.IBLevel?.CAMA_Loader ?? [];

  const [camaH1, setCamaH1] = useState({});
  const [camaH2, setCamaH2] = useState({});

  useEffect(() => {
    const CAMA_H1_DATA = CAMAData?.find((d) => d?.Half === "H1");
    setCamaH1(CAMA_H1_DATA);
    const CAMA_H2_DATA = CAMAData?.find((d) => d?.Half === "H2");
    setCamaH2(CAMA_H2_DATA);
  }, [CAMAData]);

  const handleLoader = () => {
    return (
      <Stack alignContent="center">
        <Spinner />
      </Stack>
    );
  };

  return (
    <>
      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <Grid
          item
          xs={12}
          className="inside-card-ib pt-5"
        >
          {CAMA_Loader ? (
            handleLoader()
          ) : (
            <CAMACard data={camaH1} label="CAMA (%)-H1" />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <Grid
          item
          xs={12}
          className="inside-card-ib pt-5"
        >
          {CAMA_Loader ? (
            handleLoader()
          ) : (
            <CAMACard data={camaH2} label="CAMA (%)-H2" />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <WTGCard item={wtgData?.[0]} WTG_Loader={WTG_Loader} handleLoader={handleLoader} />
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <WTGCard item={wtgData?.[1]} WTG_Loader={WTG_Loader} handleLoader={handleLoader} />
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <Grid
          item
          xs={12}
          className="inside-card-ib pt-5"

        >
          {MTTR_MTBF_Loader ? handleLoader() : <MTTRCard data={mttrMtbfData} />}
        </Grid>
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{ height: "126px" }}>
        <Grid
          item
          xs={12}
          className="inside-card-ib pt-5"
        >
          {MTTR_MTBF_Loader ? handleLoader() : <MTBFCard data={mttrMtbfData} />}
        </Grid>
      </Grid>

      <Grid container spacing={3} className="pl-mr" sx={{height:"126px"}}>
        {Ib_Top_Kpi?.KPI?.map((item, index) => (
          <Grid
            item
            xs={12}
            key={index}
            className="inside-card-ib pt-5"
          >
            <Card item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TopSection;
