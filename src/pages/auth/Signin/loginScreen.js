import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAdminLoginStatus, setLoading, setUserInfo } from "redux/actions/login";
import MainLogo from "../../../assets/images/logo_suzlon.png";
import { FormTextField } from "pages/common-components/FormComponents";
import { Formik } from "formik";
import * as Yup from "yup";

function AdminRightSideForm() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const Loading = state?.user?.loading;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter username."),
    password: Yup.string().required("Please enter password."),
  });

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setUserInfo(null));
    localStorage.clear();
  }, [dispatch]);

  return (
    <div>
      <div className="logo-wrapper">
        <img src={MainLogo} alt="Suzlon_logo" />
      </div>
      <Divider sx={{ mb: 7, mt: 7, fontWeight: 600 }}>Fleet Manager</Divider>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const postObj = {
            domainId: values?.username,
            password: values?.password,
          };
          dispatch(checkAdminLoginStatus(postObj, history));
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-fields">
              <FormTextField
                toplabel="Username*"
                size="small"
                name="username"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Enter username"
                value={values?.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-fields">
              <FormTextField
                toplabel="Password*"
                size="small"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                placeholder="Enter password"
                value={values?.password}
                onChange={handleChange}
              />
            </div>
            <LoadingButton
              loading={Loading}
              disabled={Loading}
              className="signin-button"
              fullWidth
              type="submit"
            >
              {Loading ? "" : "Sign In"}
            </LoadingButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AdminRightSideForm;
