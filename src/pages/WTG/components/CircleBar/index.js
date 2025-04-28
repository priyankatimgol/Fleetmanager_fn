import { Box, IconButton, Typography } from "@mui/material";
import Circles from "./components/circle";
import { ReactComponent as MoreSVG } from '../../../../assets/icon/more.svg'
import './styles.css'

const CircleBar = ({ data, mttrMtbfData, label }) => {
  const MTBFData = mttrMtbfData?.find((d) => d.KPIType == label)
  return (
    <Box>
      <Box className='circleBarHeader'>
        <Typography variant="h6" fontSize={14} color='#505050'>{data.title}</Typography>
        <IconButton size="small">
          <MoreSVG style={{ width: '24px', height: '24px' }} />
        </IconButton>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Circles
          percent={MTBFData?.Value}
          valType={data.valType}
          strokeColor={data.color}
          trailColor={data.color1}
          height="100%"
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default CircleBar;
