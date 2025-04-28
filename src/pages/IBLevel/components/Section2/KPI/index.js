import { Grid, Typography, Box, Stack } from "@mui/material";
import BarChart from "./BarChart";
import '../../../style.css'
import InfoCard from "./InfoCard";
import KpiGridView from "./KpiGrideView";
import HVEHvPSSChart from "./RadialChart";
import PMQualityChart from "./PMChart";
import LubricationChart from "./Lubrication";
import MBDsChart from "./MBDsChart";
import { useSelector } from "react-redux";
import Spinner from "pages/common-components/Spinner";
import Description from "@mui/icons-material/Description";
import HTFeedersChart from "./HTFeedersChart/Index";

const BarChartData = {
  'HT': {
    label: 'HT Feeders Performance',
    dataValues: [45, 90, 35, 35, 95],
    barColors: ['#a17507', '#FFBF00', '#7098FF', '#36A98A', '#45C052'],
    categories: ['ANN.', 'Q1', 'Q2', 'Q3', 'Q4']
  },
  'WTG': {
    label: "WTG's & DP",
    dataValues: [45, 80, 58, 35, 95],
    barColors: ['#a17507', '#FFBF00', '#7098FF', '#36A98A', '#45C052'],
    categories: ['ANN.', 'Q1', 'Q2', 'Q3', 'Q4']
  }
}

const InfoCardData = {
  'HV': {
    label: 'HV, EHV & PSS',
    subtitle: 'Annual',
    subtitleVal: '55%',
    data: [
      {
        label: 'Q1',
        value: '55%'
      },
      {
        label: 'Q2',
        value: '69%'
      },
      {
        label: 'Q3',
        value: '90%'
      },
      {
        label: 'Q4',
        value: '90%'
      },
    ]
  },
  'PM': {
    label: 'PM Quality',
    subtitle: 'Annual',
    subtitleVal: '89%',
    data: [
      {
        label: 'Q1',
        value: '55%'
      },
      {
        label: 'Q2',
        value: '69%'
      },
      {
        label: 'Q3',
        value: '90%'
      },
      {
        label: 'Q4',
        value: '90%'
      },
    ]
  },
  'LC': {
    label: 'Lubrication',
    subtitle: 'Annual',
    subtitleVal: '55%',
    data: [
      {
        label: 'Q1',
        value: '55%'
      },
      {
        label: 'Q2',
        value: '69%'
      },
      {
        label: 'Q3',
        value: '75%'
      },
      {
        label: 'Q4',
        value: '80%'
      },
    ]
  },
  'MBD': {
    label: 'MBDs (A&B)',
    subtitle: 'Annual',
    subtitleVal: '68%',
    data: [
      {
        label: 'Q1',
        value: '78%'
      },
      {
        label: 'Q2',
        value: '69%'
      },
      {
        label: 'Q3',
        value: '45%'
      },
      {
        label: 'Q4',
        value: '88%'
      },
    ]
  }
}



function KPI() {
  const state = useSelector((state) => state);
  const IB_HV_EHV_PSS_DATA = state?.IBLevel?.IB_HV_EHV_PSS ?? [];
  const pmQualityData = state?.IBLevel?.pmQuality ?? [];
  const lubricationData = state?.IBLevel?.lubrication ?? [];
  const MBDsData = state?.IBLevel?.MBDsData ?? [];
  const htFeedersData = state?.IBLevel?.htFeedersData ?? [];

  const HV_EHV_PSS_LOADER = state?.IBLevel?.HV_EHV_PSS_LOADER ?? [];
  const Lubrication_Loader = state?.IBLevel?.Lubrication_Loader ?? [];
  const MBDs_Loader = state?.IBLevel?.MBD_Loader ?? [];

  const handleLoader = () => {
    return (
      <Stack alignContent="center" style={{ marginTop: '10%' }}>
        <Spinner />
      </Stack>
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div className="ib-wtg-card-wrapper" style={{ height: "210px" }}>
            {HV_EHV_PSS_LOADER ? (
              handleLoader()
            ) : (
              <HVEHvPSSChart data={IB_HV_EHV_PSS_DATA} icon="task" label="HV, EHV & PSS" showToolbar={true} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="ib-wtg-card-wrapper" style={{ height: "270px" }}>
            {MBDs_Loader ? (
              handleLoader()
            ) : (
              <HTFeedersChart data={htFeedersData} icon="task" label="HT Feeders Performance" showToolbar={true} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="ib-wtg-card-wrapper" style={{ height: "172px" }}>
            {Lubrication_Loader ? (
              handleLoader()
            ) : (
              <LubricationChart data={lubricationData} icon="task" label="Lubrication" showToolbar={true} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="ib-wtg-card-wrapper" style={{ height: "248px" }}>
            {MBDs_Loader ? (
              handleLoader()
            ) : (
              <MBDsChart data={MBDsData} icon="task" label="MBDs (A & B)" showToolbar={true} />
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default KPI;
