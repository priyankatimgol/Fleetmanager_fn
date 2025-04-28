import { Box, Typography, CardContent, Card } from '@mui/material'
import { useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useDispatch, useSelector } from 'react-redux';
import { getSiteInchargeKpiData } from 'redux/actions/SiteHomeActions';
import styled from 'styled-components';

const CardContentNoPadding = styled(CardContent)(`
  padding: 2px;
  &:last-child {
    padding-bottom: 2px;
  };
  &:last-of-type {
    padding-bottom: 2px !important
  };
`);

const WindSpeed = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const WindSpeedData = state.siteHomeKpi?.siteInchargeKpi?.WindSpeed;

  useEffect(() => {
    dispatch(getSiteInchargeKpiData({ parameter: "WindSpeed", filter: "" }))
  }, [dispatch])

  return (
    <Box className="top-card inside-card">
      {
        WindSpeedData && (
          <>
            <Box className="dial">
              <ReactSpeedometer
                needleHeightRatio={0.6}
                maxSegmentLabels={4}
                customSegmentStops={[0, 25, 75, 100]}
                segmentColors={['#d3fbc4', '#69bc4b', '#2a9a02']}
                maxValue={100}
                value={parseInt(WindSpeedData[0]?.value)}
                needleColor="#36a98a"
                startColor="#d3fbc4"
                ringWidth={10}
                currentValueText=''
                segments={3}
                endColor="#2a9a02"
                textColor="#505050"
                valueTextFontSize="0px"
                labelFontSize="10px"
                width={150}
                height={100}
              />
            </Box>
            <Typography className="kpi-title mt-12" textAlign='center' variant="body1">
              Wind Speed:&nbsp;<Box component='span' sx={{ color: '#E72E3D !important' }}>{WindSpeedData[0]?.value}&nbsp;m/s</Box>
            </Typography>
          </>
        )
      }
    </Box>
  )
}

export default WindSpeed