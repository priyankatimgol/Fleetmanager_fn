import { Box, Tooltip, Typography } from '@mui/material'
import { useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useDispatch, useSelector } from 'react-redux';
import { getSiteInchargeKpiData } from 'redux/actions/SiteHomeActions';
import Spinner from 'pages/common-components/Spinner';
import ReactApexChart from 'react-apexcharts';
import { GiElectric } from 'react-icons/gi';

const WindSpeed = ({ data }) => {
  const state = useSelector((state) => state);
  const Loading = state.siteHomeKpi?.loading;
  const PlantNames = state?.siteHomeKpi?.turbineData?.plantNames || [];
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'YTD-MA')?.dbname
  const value = data[0]?.Value ?? "";
  function getCurrentFinancialYear() {
    var today = new Date();
    var currentYear = today.getFullYear();
    var startYear = today.getMonth() >= 3 ? currentYear : currentYear - 1;
    var endYear = startYear + 1;
    return startYear + '-' + endYear;
  }
  const financialYear = getCurrentFinancialYear()

  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '60%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            color: '#000',
            fontSize: '16px',
            show: true,
            offsetY: -28,
            fontWeight: 'bold'
          },
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '100%',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#36A2EB'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 75, 100],
      },
    },
    stroke: {
      lineCap: 'square',
    },
    labels: [''],
  };

  const series = [+value];

  return (
    <Box className="top-card inside-card">
    <Tooltip title={dbSource}>
      <Box sx={{display:"flex"}}>
        <GiElectric style={{ fontSize: '20px', color: '#36a98a' }} />
        <Typography variant="body1" sx={{ textAlign: "left", fontWeight: 700, color: "black" }} >YTD - MA% <span style={{ fontWeight: 400, fontSize: "12px", marginLeft: "5px" }}>({financialYear})</span></Typography>
      </Box>
    </Tooltip>
      {
        Loading.includes("TOP_SECTION") && <Spinner sx={{ py: '15.5px !important' }} />
      }
      {
        !Loading.includes("TOP_SECTION") && data !== null && (
          <>
            <Box marginTop={2}
              sx={{
                height: PlantNames.length > 4 ? '85%' : '75%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }} >
              <ReactApexChart options={options} series={series} type="radialBar" height={150} width="100%" />
            </Box>
          </>
        )
      }
    </Box>
  )
}

export default WindSpeed