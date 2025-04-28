import { Box, Typography,CardContent,Card } from '@mui/material'
import ReactSpeedometer from 'react-d3-speedometer';
import styled  from 'styled-components';

const CardContentNoPadding = styled(CardContent)(`
  padding: 2px;
  &:last-child {
    padding-bottom: 2px;
  };
  &:last-of-type {
    padding-bottom: 2px !important
  };
`);

const WindSpeed = ({ windSpeed }) => {
  return (
    <Box className="top-card inside-card">        
          <Box className="dial">
            <ReactSpeedometer
              needleHeightRatio={0.6}
              maxSegmentLabels={4}
              customSegmentStops={[0, 25, 75, 100]}
              segmentColors={['#d3fbc4', '#69bc4b', '#2a9a02']}
              maxValue={100}
              value={windSpeed}
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
            Wind Speed:&nbsp;<Box className="kpi-title" sx={{color:'#E72E3D !important'}}>{windSpeed}&nbsp;m/s</Box>
          </Typography>
       
    
    </Box>
  )
}

export default WindSpeed