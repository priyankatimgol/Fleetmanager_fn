import { Box, Tooltip, Typography } from "@mui/material";
import { MySelectAuto } from "pages/common-components/AutoSearchSelect";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getTurbinesData, getUserSites } from "redux/actions/SiteHomeActions";

const BoxComp = ({data}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const SelSite = state.siteHomeKpi?.selSite;
  const PlantNames = state?.siteHomeKpi?.turbineData?.plantNames || [];
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'PLANT CAPACITY')?.dbname;
  const [plantValue, setPlantValue] = useState("")

  useEffect(()=>{
    if(data !== undefined) {
      setPlantValue(data === null ? "":data.Value)
    }
  },[data])
 
  return (
    <Box sx={{ position: 'relative', minHeight: '109px' }} className="inside-card">
       <Tooltip title={dbSource}>
      <Box sx={{ display: 'flex' }}>
        <GiElectric style={{ fontSize: '20px', color: '#36a98a' }} />
        <Typography align="left" sx={{ color: "black", fontWeight: 700 }}>Plant Capacity</Typography>
      </Box>
      </Tooltip>
      <Box sx={{ height: "80%", display: 'flex', alignItems: 'center', justifyContent:"center"}}>
        <Box sx={{ pl: 1, display: 'flex'}} >
          <Typography className="kip-value" >{plantValue}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'end' }} >
            <Typography className="kip-units" sx={{ pl: 1 }}>MW</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BoxComp;