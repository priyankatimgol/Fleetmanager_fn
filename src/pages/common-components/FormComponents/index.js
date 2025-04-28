import { useField } from "formik";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Select,
  Typography,
} from "@mui/material";

export const FormTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <>
      <Typography variant="body2" className="bold-600">
        {props?.toplabel?.includes("*") ? (
          <>
            <span>{props?.toplabel?.replace("*", "")}</span>
            <span className="color-red">*</span>
          </>
        ) : (
          props?.toplabel
        )}
      </Typography>
      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
      />
    </>
  );
};

export const MySelect = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  
  return (
    <>
      <Typography variant="body2" className="bold-600">
        {props?.toplabel?.includes("*") ? (
          <>
            <span>{props?.toplabel?.replace("*", "")}</span>
            <span className="color-red">*</span>
          </>
        ) : (
          props?.toplabel
        )}
      </Typography>
      <FormControl
        fullWidth
        variant="outlined"
        className="default-textbox"
        error={!!errorText}
      >
        <Select
          displayEmpty
          //MenuProps={{ classes: { paper: `select-custom-MuiMenu-paper` } }}
          {...field}
          {...props}
          style={{ height: "36px" }}
        />
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </>
  );
};

export const MySelectAutoComplete = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
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
          disablePortal
          id="combo-box-demo"
          value={props?.values} // initial value
          options={props?.listing} // [{label: ""},{label: ""}]
          fullWidth
          disableClearable
          disabled={props?.disabled}
          onChange={(e, value) => props?.onChangeDta(e, value)}
          renderInput={(params) => <TextField {...params} />}
          {...props}
        />
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </>
  );
};
