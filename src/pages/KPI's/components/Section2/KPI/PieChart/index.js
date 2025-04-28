import {
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Chart from "./componets/chart";
import titleIcon from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import "./styles.css";
import { DATA_LABELS, DROPDOWNS } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInchargeKpiData } from "redux/actions/SiteHomeActions";
import Spinner from "pages/common-components/Spinner";

const PieChart = ({ dropDown, label, disableCard }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const KPIData = state.siteHomeKpi.siteInchargeKpi;
  const Loading = state.siteHomeKpi.loading;
  const SelSite = state.siteHomeKpi?.selSite;

  const [selected, setSelected] = useState(
    dropDown ? DROPDOWNS[label][0].value : ""
  );
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (JSON.stringify(KPIData) === "{}" || KPIData === null)
      return setPieData([]);

    if (dropDown) {
      if (KPIData[label]) {
        const dataValues = Object.values(KPIData[label].calculatedData).map(
          (d, ind) => {
            return { name: DATA_LABELS[label][ind], value: d };
          }
        );

        setPieData(dataValues);
      }
    }
  }, [KPIData]);

  useEffect(() => {
    if (dropDown && selected !== "" && SelSite) {
      dispatch(getSiteInchargeKpiData({ parameter: label, filter: selected, siteName: SelSite }));
    }
  }, [dispatch, selected, SelSite]);

  return (
    <Box className={disableCard ? "inside-card-disabled" : "inside-card"} sx={{ width: "100%" }}>
      <Box className="piechartTitle">
        <Box sx={{ display: "flex" }}>
          <img src={titleIcon} width={16} />
          <Typography pl="2px" className="kpi-label">
            {label}
          </Typography>
        </Box>
        {dropDown && (
          <Box sx={{ width: "50%", ml: "auto" }}>
            <FormControl variant="standard">
              <Select
                labelId="standard-label"
                id="select-standard"
                value={selected}
                style={{zIndex:'9'}}
                onChange={(newVal) => {
                  setSelected(newVal.target.value);
                }}
                sx={{
                  fontSize: "11px",
                  "& .MuiSelect-select": {
                    padding: "2px",
                  },
                  "& .Mui-selected": {
                     backgroundColor: '#00ab8e2b !important'
                  }
                }}
              >
                {DROPDOWNS[label]?.map((d) => (
                  <MenuItem key={d.name} value={d.value}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      {Loading.includes(label) ? (
         <Box
            sx={{
               height: "128px",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Spinner />
         </Box>
         ) : (
         <Chart data={pieData} />
         )}
      </Box>
  );
};

export default PieChart;
