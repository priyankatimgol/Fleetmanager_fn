import {
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Charts from "./components/chart";
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import "./styles.css";
import { styled } from "@mui/material/styles";
import { DATA_LABELS, DROPDOWNS } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInchargeKpiData } from "redux/actions/SiteHomeActions";
import Spinner from "pages/common-components/Spinner";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 5px;
  }
`);

const barColors = ["#45C052", "#FFBF00", "#7098FF", "#36A98A"];

const yAxisConfigs = {
  max: 100,
  decimalsInFloat: 0,
  forceNiceScale: false,
  tickAmount: 5,
};

function BarChart({ dropDown, icon, label, parameter, setYaxisMaxLimit, disableCard }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const KPIData = state.siteHomeKpi.siteInchargeKpi;
  const Loading = state.siteHomeKpi.loading;
  const SelSite = state.siteHomeKpi?.selSite;

  const [selected, setSelected] = useState(
    dropDown ? DROPDOWNS[label][0].value : ""
  );
  const [barData, setBarData] = useState({
    dataValues: [],
  });

  useEffect(() => {
    if (JSON.stringify(KPIData) === "{}" || KPIData === null)
      return setBarData({});

    const cardLabel = parameter ?? label;

    const dataValues = [];

    if (dropDown) {
      if (KPIData[cardLabel]) {
        Object.values(KPIData[cardLabel].responseData).forEach((d) => {
          dataValues.push(d);
        });
      }
    } else {
      if (KPIData[cardLabel]) {
        Object.values(KPIData[cardLabel]).forEach((d) => {
          dataValues.push(d);
        });
      }
    }

    setBarData({ dataValues: dataValues });
  }, [KPIData]);

  useEffect(() => {
    if (SelSite) {
      dispatch(
        getSiteInchargeKpiData({
          parameter: parameter ?? label,
          filter: selected,
          siteName: SelSite,
        })
      );
    }
  }, [dispatch, selected, SelSite]);

  return (
    <Card className={disableCard ? "disableCard" : "barCardWrapper"}>
      <CardContentNoPadding className="barContentWrapper">
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
          {icon === "timer" ? (
            <TimerSVG style={{ width: "16px", height: "16.5px" }} />
          ) : (
            <TaskSVG style={{ width: "16px", height: "16.5px" }} />
          )}
          <Typography className="kpi-label">{label}</Typography>
          {dropDown && (
            <Box sx={{ width: "50%", ml: "auto" }}>
              <FormControl variant="standard">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selected}
                  onChange={(newVal) => {
                    setSelected(newVal.target.value);
                  }}
                  sx={{
                    fontSize: "11px",
                    "& .MuiSelect-select": {
                      padding: "2px",
                    },
                  }}
                >
                  {DROPDOWNS[label]?.map((d) => (
                    <MenuItem value={d.value}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
        {Loading.includes(label) ? (
          <Spinner />
        ) : (
          <Box className="chartWrapper">
            {barData?.dataValues?.length > 0 && (
              <Charts
                dataLabels={
                  parameter ? DATA_LABELS[parameter] : DATA_LABELS[label]
                }
                dataValues={barData.dataValues}
                barColors={barColors}
                yAxisConfigs={setYaxisMaxLimit ? yAxisConfigs : {}}
              />
            )}
          </Box>
        )}
      </CardContentNoPadding>
    </Card>
  );
}

export default BarChart;
