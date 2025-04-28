import { Typography, Box, Grid, FormControl, Select, MenuItem } from "@mui/material";
import Chart from './componets/chart';
import titleIcon from '../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg'
import './styles.css'
import { DROPDOWNS } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInchargeKpiData } from "redux/actions/SiteHomeActions";

const PieChart = ({ dropDown, label }) => {
   const dispatch = useDispatch();
   const state = useSelector((state) => state);
   const KPIData = state.siteHomeKpi.siteInchargeKpi;

   const [selected, setSelected] = useState(dropDown ? DROPDOWNS[label][0].value : '');
   const [pieData, setPieData] = useState();

   useEffect(() => {
      if (JSON.stringify(KPIData) === '{}' || KPIData === null)
         return setPieData([]);

      if (KPIData[label]) {
         const dataValues = KPIData[label].map(d => {
            return { name: d.columnname, value: d.value }
         })

         setPieData(dataValues);
      }
   }, [KPIData])

   useEffect(() => {
      if (dropDown && selected !== '') {
         dispatch(getSiteInchargeKpiData({ parameter: label, filter: selected }));
      }
   }, [dispatch, selected])

   return (
      <Box className="inside-card" sx={{ width: '100%' }}>
         <Box className="piechartTitle">
            <Box sx={{ display: 'flex' }}>
               <img src={titleIcon} width={16} />
               <Typography pl='2px' className="kpi-label">
                  {label}
               </Typography>
            </Box>
            {
               dropDown && (
                  <Box sx={{ width: "50%", ml: 'auto' }}>
                     <FormControl variant="standard">
                        <Select
                           labelId="standard-label"
                           id="select-standard"
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
                                 <MenuItem value={d.value}>
                                    {d.name}
                                 </MenuItem>
                              ))
                           }
                        </Select>
                     </FormControl>
                  </Box>
               )
            }
         </Box>
         <Chart data={pieData} />
      </Box>
   );
};

export default PieChart;
