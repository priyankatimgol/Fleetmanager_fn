import { useMemo } from "react";
import Customers from "./customers";
import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Search from "./search";
import { useSelector } from "react-redux";
import { TURBINE_API } from "pages/KPI's/utils";
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";

function TubineHeader({
  data,
  setSearch,
  setSelCustomer,
  selected,
  setSelected,
}) {
  const state = useSelector((state) => state);
  const Loading = state.siteHomeKpi?.loading;
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'Kpi Bubbles')?.dbname;
  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid sx={{ zIndex: 9 }} item md={8} style={{display:"flex"}}>
          <Tooltip title={dbSource}>
            <TaskSVG style={{ width: "16px", height: "16.5px" }} />
          </Tooltip>
          <Grid container spacing={1}>
            {!Loading.includes(TURBINE_API) &&
              data?.length &&
              data.map((d, ind) => {
                return (
                  <Grid item className="action">
                    <Grid
                      container
                      spacing={1}
                      className={selected === d.statusCode ? "pr-selected-item" : "pr-item"}
                      onClick={() => setSelected(d.statusCode)}
                    >
                      <Grid item sx={{ display: "flex", alignItems: "center" }}>
                        <FiberManualRecordIcon
                          className={`Color${d.statusCode?.replace(/\s/g, "")}`}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" className="turbin-label">
                          {`${d.value} ${d.statusCode}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    {data.length - 1 !== ind && (
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                    )}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item md={4} className="search-wrepper paddtop">
          <Grid container spacing={2}>
            <Grid item md={5.5}>
              <Search setSearch={setSearch} />
            </Grid>
            <Grid item md={6.5}>
              <Customers setSelCustomer={setSelCustomer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TubineHeader;
