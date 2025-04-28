import * as React from 'react';
import {TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <TextField        
      defaultValue='search'
      fullWidth
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    >
     
    </TextField>
  );
}

export default Search;
