import { MenuItem, TextField } from "@mui/material";
import React from "react";

function Customers() {
  return (
    <TextField
      id="standard-select-currency"
      select
      defaultValue={0}
      fullWidth
      variant="standard"
    >
      <MenuItem key={0} value={0}>
        Customers
      </MenuItem>
      <MenuItem key={1} value={1}>
        Customers 1
      </MenuItem>
    </TextField>
  );
}

export default Customers;
