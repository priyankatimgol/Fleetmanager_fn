import React from 'react'
import { ReactComponent as MoreSVG } from '../../../../assets/icon/more.svg'
import { Box, IconButton, Typography } from '@mui/material'
import Chart from './components/chart'

const RoseChart = () => {
  return (
    <>
      <Box>
        <Box className='circleBarHeader'>
          <Typography sx={{ color: "black", fontWeight: 700 }}>Wind Rose</Typography>
          <IconButton size="small">
            <MoreSVG style={{ width: '24px', height: '24px' }} />
          </IconButton>
        </Box>
        <Box id='rose_wind_svg' sx={{ mb: 2 }}>
          <Chart />
        </Box>
      </Box>
    </>
  )
}

export default RoseChart