import * as React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl, TextField, Typography } from "@mui/material";

export function TimePickerComp(props) {
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
      <FormControl fullWidth variant="outlined" className="default-textbox">
        <TimePicker
         disabled={props?.disabled}
          value={props.value}
          onChange={(value) => props.handleOnChange(value)}
          onClose={() => {
            if (props.handleOnClose !== null && props.handleOnClose !== undefined) {
              props.handleOnClose()
            } 
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size={props?.size}
              error={!!errorText}
              helperText={errorText}
            />
          )}
        />
      </FormControl>
    </>
  );
}

export function DatePickerComp(props) {
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
      <FormControl fullWidth variant="outlined" className="default-textbox">
        <DatePicker
          value={props.value}
          maxDate={props.maxDate}
          inputFormat={props.inputFormat || "dd-MMM-yyyy"}
          onChange={(value) => props.handleOnChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              size={props?.size}
              error={!!errorText}
              helperText={errorText}
            />
          )}
          {...props}
        />
      </FormControl>
    </>
  );
}
