import React from "react";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import { dataSanityConfigConditions } from "fakeJsons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function SanityGridView({ columnsData, setColumnsData, setMergedArray }) {
  const replaceOnChange = (index, actualKey, replaceIndex, value, source) => {
    const parentArr = [...columnsData];
    const childArr = [...(parentArr[index][actualKey] || [])];
    childArr[replaceIndex][source] = value.target?.value;

    setMergedArray(parentArr);
  };

  const handleArrReplceColunmns = (index, actualKey) => {
    const parentArr = [...columnsData];
    const childArr = [
      ...(parentArr[index][actualKey] || []),
      { replace_from: "", replace_to: "" },
    ];
    parentArr[index][actualKey] = childArr;

    setMergedArray(parentArr);
  };

  const handleRemoveColumn = (replaceIndex, index, actualKey) => {
    const parentArr = [...columnsData];
    parentArr?.[index]?.[actualKey]?.splice(replaceIndex, 1);
    setMergedArray(parentArr);
  };

  return (
    <div style={{ margin: "1.2rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Columns</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Data Types
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Condition
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {columnsData?.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "200px", fontSize: ".9rem" }}
                >
                  {String(item?.column_name)}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: "200px", fontSize: ".9rem" }}
                >
                  {String(item?.data_type) ?? ""}
                </TableCell>
                <TableCell align="left" style={{ width: "400px" }}>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={String(item?.condition)}
                    onChange={(e) => {
                      const tempArr = [...columnsData];
                      setColumnsData(e, index, "condition");

                      tempArr[index]["value2"] = [
                        { replace_from: "", replace_to: "" },
                      ];
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    {dataSanityConfigConditions?.map((data) => (
                      <MenuItem key={data?.value} value={data?.value}>
                        {data?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="left" style={{ width: "400px" }}>
                  {item?.condition !== "replace_by" && (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={item?.value1}
                      onChange={(e) => setColumnsData(e, index, "value1")}
                      size="small"
                      placeholder="Value"
                    />
                  )}

                  {item?.condition === "replace_by" &&
                    item?.value2 &&
                    typeof item?.value2 === "object" &&
                    item?.value2?.map((replaceValue, replaceIndex) => {
                      return (
                        <div className="current-replace-by">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            style={{ width: "100%" }}
                            InputLabelProps={{ shrink: false }}
                            // value={item?.value1}
                            value={replaceValue?.replace_from}
                            // onChange={(e) => setColumnsData(e, index, "value1")}
                            onChange={(e) =>
                              replaceOnChange(
                                index,
                                "value2",
                                replaceIndex,
                                e,
                                "replace_from"
                              )
                            }
                            size="small"
                            placeholder="Current value"
                          />
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            style={{ width: "100%" }}
                            InputLabelProps={{ shrink: false }}
                            // value={item?.value2}
                            value={replaceValue?.replace_to}
                            // onChange={(e) => setColumnsData(e, index, "value2")}
                            onChange={(e) =>
                              replaceOnChange(
                                index,
                                "value2",
                                replaceIndex,
                                e,
                                "replace_to"
                              )
                            }
                            size="small"
                            placeholder="Replace by"
                          />
                          {item?.value2?.length - 1 - replaceIndex ===
                            item?.value2?.length - 1 && (
                            <div
                              onClick={() =>
                                item?.value2?.[item?.value2?.length - 1]?.[
                                  "replace_from"
                                ] !== "" &&
                                item?.value2?.[item?.value2?.length - 1]?.[
                                  "replace_to"
                                ] !== "" &&
                                handleArrReplceColunmns(index, "value2")
                              }
                            >
                              <AddBoxIcon
                                style={{
                                  color: "#00a18b",
                                  cursor:
                                    item?.value2?.[item?.value2?.length - 1]?.[
                                      "replace_from"
                                    ] !== "" &&
                                    item?.value2?.[item?.value2?.length - 1]?.[
                                      "replace_to"
                                    ] !== "" &&
                                    "pointer",
                                }}
                              />
                            </div>
                          )}

                          {replaceIndex !== 0 && (
                            <div
                              onClick={() =>
                                handleRemoveColumn(
                                  replaceIndex,
                                  index,
                                  "value2"
                                )
                              }
                            >
                              <DeleteForeverIcon
                                style={{ color: "#00a18b", cursor: "pointer" }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SanityGridView;
