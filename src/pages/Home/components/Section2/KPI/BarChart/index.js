import { Typography, Box, Grid, Card, CardContent, FormControl, Select, MenuItem } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import Charts from "./components/chart";
import { ReactComponent as TaskSVG } from '../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg'
import { ReactComponent as TimerSVG } from '../../../../../../assets/icon/planning-kpi-icon/timer.svg'
import './styles.css'
import { styled } from "@mui/material/styles";
import { DROPDOWNS } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInchargeKpiData } from "redux/actions/SiteHomeActions";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 5px;
  }
`);

const barColors = ['#45C052', '#FFBF00', '#7098FF', '#36A98A'];

function BarChart({ dropDown, icon, label }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const KPIData = state.siteHomeKpi.siteInchargeKpi;

  const [selected, setSelected] = useState(dropDown ? DROPDOWNS[label][0].value : '');
  const [barData, setBarData] = useState({
    dataLabels: [],
    dataValues: []
  });

  useEffect(() => {
    if (JSON.stringify(KPIData) === '{}' || KPIData === null)
      return setBarData({});

    if (KPIData[label]) {
      const dataValues = [];
      const dataLabels = [];

      KPIData[label].forEach(d => {
        dataValues.push(d.value);
        dataLabels.push(d.columnname);
      })

      setBarData({ dataValues: dataValues, dataLabels: dataLabels });
    }
  }, [KPIData])

  useEffect(() => {
    dispatch(getSiteInchargeKpiData({ parameter: label, filter: selected }))
  }, [dispatch, selected])

  return (
    <Card className="barCardWrapper">
      <CardContentNoPadding className="barContentWrapper">
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
          {
            icon === 'timer' ? <TimerSVG style={{ width: '16px', height: '16.5px' }} /> :
              <TaskSVG style={{ width: '16px', height: '16.5px' }} />
          }
          <Typography className="kpi-label">
            {label}
          </Typography>
          {
            dropDown && (
              <Box sx={{ width: "50%", ml: 'auto' }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selected}
                    onChange={(newVal) => {
                      setSelected(newVal.target.value)
                    }}
                    sx={{
                      fontSize: '11px',
                      '& .MuiSelect-select': {
                        padding: '2px',
                      },
                    }}
                  >
                    {
                      DROPDOWNS[label]?.map(d => (
                        <MenuItem value={d.value}>{d.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            )
          }
        </Box>
        <Box className="chartWrapper">
          {
            barData?.dataLabels?.length > 0 && barData?.dataValues?.length > 0 && (
              <Charts
                dataLabels={barData.dataLabels}
                dataValues={barData.dataValues}
                barColors={barColors}
              />
            )
          }
        </Box>
      </CardContentNoPadding>
    </Card>
  );
}

export default BarChart;