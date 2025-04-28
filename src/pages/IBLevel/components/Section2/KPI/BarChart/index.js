import { Typography, Box, IconButton } from '@mui/material'
import { ReactComponent as MoreSVG } from '../../../../../../assets/icon/more.svg'
import Charts from './components/chart'

const index = ({ data }) => {
  return (
    <Box sx={{ maxHeight: "180px" }}>
      <Box className="headerWrapper">
        <Typography variant="h6" fontSize={14} color="#505050" fontWeight="600">
          {data.label}
        </Typography>
        <IconButton sx={{ padding: "4px" }} size="small">
          <MoreSVG style={{ width: "24px", height: "24px" }} />
        </IconButton>
      </Box>
      <Box>
        <Charts 
            dataValues={data.dataValues}
            barColors={data.barColors}
            categories={data.categories}
        />
      </Box>
    </Box>
  )
}

export default index