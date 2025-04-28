import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const AppTextField = (props) => {
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

export default AppTextField;
