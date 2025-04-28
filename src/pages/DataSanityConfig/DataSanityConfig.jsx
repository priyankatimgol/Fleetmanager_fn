import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./styles.css";
import SanityGridView from "./components/SanityGridView";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColumnsData,
  getPrefilledColumnsData,
  getTablesAndViewsDSC,
  saveColumnsData,
} from "redux/actions/DataSanityConfigAction";

function DataSanityConfig() {
  const dispatch = useDispatch();
  const {
    viewsAndtablesDSCData,
    DSCColumnsData,
    DSCPrefilledColumnsData,
    DSCSaveColumnsLoader,
  } = useSelector((state) => state?.dataSanity);

  const [columnsData, setColumnsData] = useState(DSCColumnsData);
  const [tableName, setTableName] = useState("");
  const [mergedArray, setMergedArray] = useState([]);
  const [checkedSpecificData, setCheckedSpecificData] = useState(false);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");

  const handleSubmitSanityData = () => {
    const filteredData = mergedArray?.filter((item) =>
      item.hasOwnProperty("condition")
    );
    
    if (checkedSpecificData && selectedColumn && selectedColumn !== "") {
      filteredData?.push({
        column_name: selectedColumn,
        data_type: "",
        condition: "user_specific",
      });
    }

    const payload = {
      table_name: tableName,
      columns: filteredData,
    };

    console.log(payload);
    setColumnsData(DSCColumnsData);
    dispatch(saveColumnsData({ payload: payload }));
  };

  useEffect(() => {
    dispatch(getTablesAndViewsDSC());
  }, [dispatch]);

  useEffect(() => {
    if (tableName && tableName !== "") {
      dispatch(fetchColumnsData({ tableName: tableName }));
      dispatch(getPrefilledColumnsData({ tableName: tableName }));
    }
  }, [dispatch, tableName]);

  useEffect(() => {
    setColumnsData(DSCColumnsData);
  }, [DSCColumnsData]);

  useEffect(() => {
    if (!checkedSpecificData) {
      setSelectedColumn("");
    }
  }, [checkedSpecificData]);

  useEffect(() => {
    const mergeArrays = () => {
      const arr = [];
      const merged = columnsData?.map((item1) => {
        const matchingItem = DSCPrefilledColumnsData?.columns?.find(
          (item2) => item2?.column_name === item1?.column_name
        );

        if (matchingItem) {
          return { ...item1, ...matchingItem };
        }

        return item1;
      });

      merged.forEach((element) => {
        arr.push({ label: element.column_name, value: element.column_name });
      });

      setMergedArray(merged);
      setColumns(arr);
      const userSpecific = merged.find(item => item.condition === "user_specific");
      setSelectedColumn(userSpecific?.column_name);
      setCheckedSpecificData(userSpecific ? true : false);
    };

    mergeArrays();
  }, [columnsData, DSCPrefilledColumnsData, tableName]);

  return (
    <>
      <Grid>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h2">Define Data Conditions</Typography>
        </Box>
      </Grid>
      <Card
        className="data-sanity-config"
        style={{
          maxHeight: "84vh",
          minHeight: "84vh",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "92%",
            overflowY: "auto",
          }}
        >
          <CardContent>
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

            {tableName && tableName !== "" && (
              <div className="spacific-data">
                <div>
                  <Checkbox
                    style={{ marginRight: "10px" }}
                    checked={checkedSpecificData}
                    onChange={(e) => setCheckedSpecificData(e.target.checked)}
                    sx={{
                      color: "#00a18b",
                      "&.Mui-checked": {
                        color: "#00a18b",
                      },
                    }}
                  />
                  <label id="demo-select-small-label">
                    View user specific data
                  </label>
                </div>
                {checkedSpecificData && (
                  <div>
                    <Select
                      value={selectedColumn}
                      onChange={(e) => setSelectedColumn(e.target.value)}
                      style={{ width: "200px", marginLeft: "1rem" }}
                      size="small"
                      label="Select column"
                    >
                      {columns?.map((data, index) => (
                        <MenuItem key={index} value={data?.value}>
                          {data?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          {tableName || tableName !== "" ? (
            <SanityGridView
              columnsData={mergedArray}
              setColumnsData={(e, index, name) => {
                let tempArr = [...mergedArray];
                if (tempArr?.[index]?.["condition"] === "replace_by") {
                  // tempArr[index]["value2"] = null;
                  tempArr[index]["value2"] = [
                    { replace_from: "", replace_to: "" },
                  ];
                }

                if (tempArr[index]["value2"]?.length > 0) {
                  tempArr[index]["value1"] = "";
                }
                tempArr[index][name] = e?.target?.value;

                setMergedArray(tempArr);
              }}
              setMergedArray={setMergedArray}
            />
          ) : (
            <div className="empty-data">
              <h1>No data found</h1>
              <br />
            </div>
          )}
        </div>

        <div className="sanity-submit-button">
          <Button
            variant="contained"
            className="submit-button"
            onClick={!DSCSaveColumnsLoader && handleSubmitSanityData}
          >
            {DSCSaveColumnsLoader ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
      </Card>
    </>
  );
}

export default DataSanityConfig;
