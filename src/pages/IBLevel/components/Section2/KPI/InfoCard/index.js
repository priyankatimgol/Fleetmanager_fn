import { Box, Grid, IconButton, Typography } from "@mui/material"
import { ReactComponent as MoreSVG } from "../../../../../../assets/icon/more.svg"
import './styles.css'

const colors = ['#36A98A', '#FFBF00', '#7098FF', '#45C052']

const InfoCard = ({ data }) => {
  const gridWrapperStyle = (colorInd) => {
    return {
      paddingLeft: '10px',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'flexStart',
      borderLeft: `3px solid ${colors[colorInd]}`
    }
  }
  return (
    <Box>
      <Box className="headerWrapper">
        <Typography variant="h6" fontSize={14} color="#505050" fontWeight="600">
          {data.label}
        </Typography>
        <Box className="subtitleWrapper">
          <span>
            <Typography variant="h6" fontSize={11} color='#505050'>{data.subtitle}</Typography>
          </span>
          <span>
            <Typography variant="h6" fontSize={14} color='#505050'>{data.subtitleVal}</Typography>
          </span>
        </Box>
        <IconButton size="small" sx={{ padding: '4px' }}>
          <MoreSVG style={{ width: '24px', height: '24px' }} />
        </IconButton>
      </Box>
      <Box sx={{ mt: '5px' }}>
        <Grid container spacing={3}>
          {data.data.map((d, ind) => (
            <Grid item md={6} className="pl-30">
              <Box style={gridWrapperStyle(ind)}>
                <span>
                  <Typography
                    variant="h6"
                    fontSize={11}
                    color="#505050"
                    fontWeight="600"
                  >
                    {d.label}
                  </Typography>
                </span>
                <span>
                  <Typography variant="h6" fontSize={14} color="#505050">
                    {d.value}
                  </Typography>
                </span>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default InfoCard