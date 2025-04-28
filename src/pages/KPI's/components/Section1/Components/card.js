import { Grid, Typography, Box, Tooltip } from "@mui/material";
import { utilData } from "pages/KPI's/utils";
import { useEffect, useState } from "react";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

function Card({ data, title }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const PlantNames = state?.siteHomeKpi?.turbineData?.plantNames || [];
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'PLF')?.dbname;
  function getCurrentFinancialYear() {
    var today = new Date();
    var currentYear = today.getFullYear();
    var startYear = today.getMonth() >= 3 ? currentYear : currentYear - 1;
    var endYear = startYear + 1;
    return startYear + '-' + endYear;
  }
  const financialYear = getCurrentFinancialYear()

  const [plfValue, setPlfValue] = useState("")
  useEffect(() => {
    if (data !== undefined) {
      setPlfValue(data === null ? "" : data.Value)
    }
  }, [data])
  return (

    <Box sx={{ position: 'relative', minHeight: '109px' }} className="top-card inside-card">
      <Tooltip title={dbSource}>
        <Box sx={{ display: 'flex' }}>
          <GiElectric style={{ fontSize: '20px', color: '#36a98a' }} />
          <Typography variant="body1" sx={{ textAlign: "left", fontWeight: 700, color: "black" }}>
            PLF <span style={{ fontWeight: 400, fontSize: "12px", marginLeft: "5px" }}>({financialYear})</span>
          </Typography>
        </Box>
      </Tooltip>
      <Box sx={{ height: "80%", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
        <Box sx={{ pl: 1, display: 'flex' }} >
          <Typography className="kip-value">{plfValue || 0}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'end' }} >
            <Typography className="kip-units" sx={{ pl: 1 }} >%</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
