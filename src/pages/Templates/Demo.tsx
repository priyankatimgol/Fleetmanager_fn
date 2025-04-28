import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import { getSiteDropdown,getAreaDropdown, } from "redux/actions/SynergyDashboard";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  customMain: {
    "& .MuiInputBase-formControl ": {
      fontSize: "13px!important",
    },
    "& .MuiAutocomplete-root::-webkit-scrollbar": {
      width: "4px",
    },
  },
});

interface IMultipleSelectProps {
  listing: [];
  values: any;
  setFieldValue: (stateType:any,value:any) => void;
  label: string;
  name:string;
}

export default function MultipleSelectAutocomplete({
  label,listing,name,setFieldValue,values
}: IMultipleSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const options = [
    //  "Select All", 
     ...listing
  ];

  console.log('options',options)
  const dispatch = useDispatch()
  
  const handleChange = (event, value , name) => {
    console.log('value__',value)

   
    // console.log({
    //   nameEvent:event.target,
    //   name:name,
    //   value
    // })
    if (value.includes("Select All")) {
      if (!selectAll) {

        setFieldValue(name,[...listing])
        //setSelectedOptions(options.filter((option) => option !== "Select All"));
        setSelectAll(true);
      } else {
        setFieldValue(name,[])
        //setSelectedOptions([]);
        setSelectAll(false);
        return
      }
    } else {
      if(name==="state"){
        const states = value;
        const result = states.join(", ");
        const encodedStateParam = encodeURIComponent(result);
        dispatch(getAreaDropdown(encodedStateParam));
        setFieldValue("state", value);
        setFieldValue("area", null);
        setFieldValue("site", null);
      }
      if(name==="area"){
        const area = value;
        const result = area?.join(", ");
        dispatch(getSiteDropdown(result));
        setFieldValue("area", value);
        setFieldValue("site", null);
      }
      if(name==="site"){
       // dispatch(getMainSites(value?.areaCode));
        setFieldValue("site", value);
      }
      setSelectedOptions(value);
      setSelectAll(false);
    }

    // if(selectedOptions.length+1 ===options.length)
    // setSelectAll(true);
  };
  const classes = useStyles();
  const allOption = 'Select All';
   
  return (
    <Grid>
      <Typography sx={{ fontSize: "11px", fontWeight: "600" }}>
        {label }
      </Typography>
      <Autocomplete
        multiple
        className={classes.customMain}
        id="multiple-select"
        options={options}
        
        size="small"
        style={{
          backgroundColor: "white",
          fontSize: "10px",
          borderRadius: "4px",
          maxHeight: "40px",
          overflowX: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
        onChange={(e, value) => {
           
            handleChange(e, value, name);
           
        }}
        value={values[name]}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li style={{ padding: "0px 10px", fontSize: "8px" }} {...props}>
            <FormControlLabel
              sx={{ fontSize: "10px" }}
              
              control={
                <Checkbox
                  size="small"
                 
                  checked={option === "Select All" ? selectAll :values.includes(option)}
                />
              }
              label={option}
            />
          </li>
        )}
        renderTags={(value, getTagProps) => (
          <div >
            {value.length > 0 ? (
              <div>
                {values.length > 0
                  ? `(${values.length}) ${values[0].slice(0,11)}`
                  : ""}
              </div>
            ) : null}
          </div>
        )}
        renderInput={(params) => (
          <TextField  {...params} variant="outlined" placeholder={label} />
        )}
      />
    </Grid>
  );
}
