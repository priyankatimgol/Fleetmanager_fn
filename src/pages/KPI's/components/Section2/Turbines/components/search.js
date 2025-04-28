import * as React from 'react';
import {TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Search({ setSearch }) {
  return (
    <TextField        
      placeholder='Search'
      fullWidth
      variant="standard"
      onChange={(e) => setSearch(e.target.value)}
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
