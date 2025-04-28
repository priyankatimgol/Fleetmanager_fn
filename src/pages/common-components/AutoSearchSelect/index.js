import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

export const MySelectAutoComplete = (props) => {
  const errorText = props?.ErrorText;
  return (
    <>
      <Typography variant="body2" className="bold-600">
        {props?.toplabel?.includes("*") ? (
          <>
            <span>{props?.toplabel?.replace("*", "")}</span>
            <span className="color-red">*</span>
          </>
        ) : (
          props?.toplabel //for top label
        )}
      </Typography>
      <FormControl
        fullWidth
        variant="outlined"
        className={`default-textbox ${errorText ? 'AutoComplete':''}`}
        error={!!errorText}
      >
        <Autocomplete
          // disablePortal
          id="combo-box-demo"
          value={props?.values} // initial value
          options={props?.listing} // [{label: ""},{label: ""}]
          fullWidth
          disableClearable
          disabled={props?.disabled}
          onChange={(e, value) => props?.onChangeDta(e, value)}
          renderInput={(params) => <TextField
            onChange={(e) => props?.onInputChange(e)}
            {...params}
            size={props?.size}
            error={!!errorText}
            helperText={errorText}
          />}
          {...props}
        />
      </FormControl>
    </>
  );
};

export const MySelectAuto = (props) => {
  return (
    <>
      <Typography variant="body2" className="bold-600">
        {props?.toplabel?.includes("*") ? (
          <>
            <span>{props?.toplabel?.replace("*", "")}</span>
            <span className="color-red">*</span>
          </>
        ) : (
          props?.toplabel //for top label
        )}
      </Typography>
      <FormControl
        fullWidth
        variant="outlined"
        className="default-textbox"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={props?.values} // initial value
          options={props?.listing} // [{label: ""},{label: ""}]
          fullWidth
          disableClearable
          disabled={props?.disabled}
          onChange={(e, value) => props?.onChangeDta(e, value)}
          renderInput={(params) => <TextField
            {...params}
            size={props?.size}
          />}
          {...props}
        />
      </FormControl>
    </>
  );
};