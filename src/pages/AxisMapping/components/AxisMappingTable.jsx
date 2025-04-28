import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function AxisMappingTable({ selectedX, selectedY }) {
  const maxLength =
    selectedX?.length > selectedY?.length
      ? selectedX?.length
      : selectedY?.length;
  const maxArray = Array.from(Array(maxLength).keys()).map((x) => x + 1);
  console.log('!!!!!!', maxLength);

  return (
    <div>
      <Typography className="heading">Selected X and Y axis columns</Typography>
      <TableContainer component={Paper} style={{overflowX: 'clip'}}>
        <Table
          sx={{ minWidth: 650, overflow: "hidden" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>X-Axis</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Y-Axis
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maxArray.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "200px", fontSize: ".9rem" }}
                >
                  {String(selectedX[index] || "")}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "200px", fontSize: ".9rem" }}
                >
                  {String(selectedY[index] || "")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AxisMappingTable;
