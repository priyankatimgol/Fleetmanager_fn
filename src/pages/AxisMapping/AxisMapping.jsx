import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  fetchColumnsData,
  getTablesAndViewsDSC,
} from "redux/actions/DataSanityConfigAction";
import { getXYColumns, submitColumnsData } from "redux/actions/XYAxisMapping";
import AxisMappingTable from "./components/AxisMappingTable";

function AxisMapping() {
  const dispatch = useDispatch();
  const [tableName, setTableName] = useState("");
  const [xAxisSelected, setXAxisSelected] = useState([]);
  const [yAxisSelected, setYAxisSelected] = useState([]);
  const { viewsAndtablesDSCData, DSCColumnsData } = useSelector(
    (state) => state?.dataSanity
  );
  const { xyAxisFilledColumns, loader } = useSelector(
    (state) => state?.axisMapping
  );
  const [options, setOptions] = useState(DSCColumnsData);

  const handleXAxisChange = (event) => {
    const selectedOptions = event.target.value;
    setXAxisSelected(selectedOptions);
  };

  const handleYAxisChange = (event) => {
    const selectedOptions = event.target.value;
    setYAxisSelected(selectedOptions);
  };

  useEffect(() => {
    setOptions(DSCColumnsData);
  }, [tableName, DSCColumnsData]);

  useEffect(() => {
    dispatch(getTablesAndViewsDSC());
  }, [dispatch]);

  useEffect(() => {
    if (tableName && tableName !== "") {
      dispatch(fetchColumnsData({ tableName: tableName }));
      dispatch(getXYColumns({ tableName: tableName }));
    }
  }, [dispatch, tableName]);

  useEffect(() => {
    setXAxisSelected(xyAxisFilledColumns?.xaxis ?? []);
    setYAxisSelected(xyAxisFilledColumns?.yaxis ?? []);
  }, [tableName, xyAxisFilledColumns]);

  const handleSubmitAxisMappings = () => {
    const payload = {
      table_name: tableName,
      xaxis: xAxisSelected,
      yaxis: yAxisSelected,
    };

    dispatch(submitColumnsData({ payload: payload }));
  };

  const setXAxisDisabled = (option) => {
    return yAxisSelected?.find((item) => item === option);
  };

  const setYAxisDisabled = (option) => {
    return xAxisSelected?.find((item) => item === option);
  };

  return (
    <>
      <Grid>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h2">X and Y Axis Mapping</Typography>
        </Box>
      </Grid>
      <Card
        className="axis-columns-mapping"
        style={{
          maxHeight: "84vh",
          minHeight: "84vh",
          position: "relative",
          width: "100%",
        }}
      >
        <div className="main-container">
          <CardContent className="main-1">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                Table / View Name
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Table / View Name"
                onChange={(e) => setTableName(e.target.value)}
                style={{ width: "30%" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {viewsAndtablesDSCData?.map((data, index) => (
                  <MenuItem key={index} value={data?.value}>
                    {data?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="xy-dropdowns-container">
              <div className="dropdown-self">
                <h6 className="dropdown-self-text">
                  Select columns for X axis
                </h6>
                <Select
                  multiple
                  value={xAxisSelected}
                  onChange={handleXAxisChange}
                  renderValue={(selected) => selected.join(", ")}
                  style={{
                    width: "100%",
                    gap: "5px",
                  }}
                  size="small"
                  disabled={!tableName && tableName === ""}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option?.column_name}
                      value={option?.column_name}
                      disabled={setXAxisDisabled(option?.column_name)}
                    >
                      {option?.column_name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="dropdown-self">
                <h6 className="dropdown-self-text">
                  Select columns for Y axis
                </h6>
                <Select
                  multiple
                  value={yAxisSelected}
                  onChange={handleYAxisChange}
                  renderValue={(selected) => selected.join(", ")}
                  style={{
                    width: "100%",
                    gap: "5px",
                  }}
                  size="small"
                  disabled={!tableName && tableName === ""}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option?.column_name}
                      value={option?.column_name}
                      disabled={setYAxisDisabled(option?.column_name)}
                    >
                      {option?.column_name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <Button
              variant="contained"
              className="submit-button"
              onClick={handleSubmitAxisMappings}
              disabled={!tableName && tableName === ""}
            >
              {loader ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </CardContent>

          <CardContent className="main-2">
            <AxisMappingTable
              selectedX={xAxisSelected}
              selectedY={yAxisSelected}
            />
          </CardContent>
        </div>
      </Card>
    </>
  );
}

export default AxisMapping;
