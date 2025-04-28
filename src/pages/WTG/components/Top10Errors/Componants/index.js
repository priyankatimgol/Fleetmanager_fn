import { Box, Grid, Typography } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    dataLabels,
    showLabel = false,
    showToolbar = false,
    dataValues,
    barColors,
    yAxisConfigs
}) {
    function truncateDots(sentence, maxLength) {
        if (sentence?.length > maxLength) {
          return sentence.substring(0, maxLength - 3) + "...";
        } else {
          return sentence;
        }
      }
    return (
        <div>
            <div style={{ width: '100%', marginTop: 0 }}>
                <Grid container spacing={5}>
                    <Grid item xs={8} md={6}>
                        <div className="err-wrep red">
                            <Typography fontSize={12}>{truncateDots(dataLabels[0], 40)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[0]}</Typography>
                        </div>
                        <div className="err-wrep red">
                            <Typography fontSize={12}>{truncateDots(dataLabels[1], 30)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[1]}</Typography>
                        </div>
                        <div className="err-wrep red">
                            <Typography fontSize={12}>{truncateDots(dataLabels[2], 30)}</Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[2]}</Typography>
                        </div>
                        <div className="err-wrep yellow">
                            <Typography fontSize={12}>{truncateDots(dataLabels[3], 30)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[3]}</Typography>
                        </div>
                        <div className="err-wrep yellow">
                            <Typography fontSize={12}>{truncateDots(dataLabels[4], 30)}</Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[4]}</Typography>
                        </div>

                    </Grid>
                    <Grid item xs={8} md={6}>
                        <div className="err-wrep l-green">
                            <Typography fontSize={12}>{truncateDots(dataLabels[5], 30)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[5]}</Typography>
                        </div>
                        <div className="err-wrep l-green">
                            <Typography fontSize={12}>{truncateDots(dataLabels[6], 30)}</Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[6]}</Typography>
                        </div>
                        <div className="err-wrep green">
                            <Typography fontSize={12}>{truncateDots(dataLabels[7], 30)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[7]}</Typography>
                        </div>
                        <div className="err-wrep green">
                            <Typography fontSize={12}>{truncateDots(dataLabels[8], 30)}</Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[8]}</Typography>
                        </div>
                        <div className="err-wrep green">
                            <Typography fontSize={12}>{truncateDots(dataLabels[9], 30)} </Typography>
                            <Typography variant="h6" fontSize={14} color="#505050">{dataValues[9]}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Charts;