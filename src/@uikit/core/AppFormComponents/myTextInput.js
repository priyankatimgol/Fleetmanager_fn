import React from "react";
import { useField } from "formik";
import {
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Select,
  Typography,
} from "@mui/material";

export const MyTextInput = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div className="">
      <h2 className="phaseLable">{props?.label}</h2>
      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
      />
    </div>
  );
};

