import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

export default function SelectSmall({ label }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Typography sx={{fontSize:'13px'}}>{label}</Typography>
      <InputLabel
        id="demo-select-small-label"
        sx={{ backgroundColor: 'white', display: 'none' }} // Set background color to white and hide label
      >
        
      </InputLabel>
      <Select  sx={{ backgroundColor: 'white' }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label=""
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
