import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  FormTextField,
  MySelect,
  MySelectAutoComplete,
} from "pages/common-components/FormComponents";
//   import { CREATE_TASK, UPDATE_TASK } from "../../utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomDropzone from "pages/common-components/CustomDropzone";
import { DatePickerComp } from "pages/common-components/DateAndTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAndUpdate, getTaskDocument } from "redux/actions/TaskManagmentActions";
//   import "../../style.css";
import { getApiCall } from "apiServices/apiUtils";
import moment from "moment";
import { addOrUpdatePODtask, getPODStatuses, getPriorityList } from "redux/actions/PODAction";

const PODDrawer = ({ onCloseDrawer, editFlag, editData }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const TicketId = state?.taskManager?.ticketById;
  const TaskTypeDropdown = state?.taskManager?.dropdowns?.["Task Type"];
  const TaskStatusListing = state?.taskManager?.statusList || [];
  const priorityDropdown = state?.POD?.priorityList ?? [];
  const podTypes = state?.POD?.podTypes ?? [];
  const podStatuses = state?.POD?.podSatuses ?? [];

  const convertedObject = (empCode, empName) => {
    return {
      label: `${empCode} - ${empName}`,
      code: empCode,
      name: empName
    };
  }
  const convertedObject1 = (sitename) => {
    return {
      areaCode:sitename?.areaCode,
      siteName:sitename?.mainSite,
      mainSiteCode: sitename?.mainSiteCode
    };
  } 
 
  const initialVal = {
    areaOfWork: editData && editData.areaOfWork || "",
    site: editData && convertedObject1(editData.siteName) || null,
    activityName: editData && editData.activityName || "",
    Type: editData && editData.typeName || "",
    Employee: editData?.employeeId && convertedObject(editData?.employeeId?.empCode, editData?.employeeId?.empName) || null,
    vendorName: editData && editData.venderName || "",
    actionTaken: editData && editData.actionTaken || "",
    assignStatus: editData && editData.assigneeStatus || "",
    siteInchargeStatus: editData && editData.siteInchargeStatus || "",
    pendingDueTo: editData && editData.pendingDueTo || "",
    priority: editData && editData.priority || "",
    
  };
  const taskValidationSchema = Yup.object().shape({
    areaOfWork: Yup.string().required("Required"),
    site: Yup.object().required("Required").nullable(),
    // activityName: Yup.string().required("Required"),
    Type: Yup.string().required("Required"),
    Employee: Yup.object().required("Required").nullable(),
    // vendorName: Yup.string().required("Required"),
    // actionTaken: Yup.string().required("Required"),
    assignStatus: Yup.string().required("Required"),
    siteInchargeStatus: Yup.string().required("Required"),
    // pendingDueTo: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
  });

  const SiteState = useSelector((state) => {
    return state?.siteHomeKpi;
  });
  const UserSites = SiteState?.userSites || [];
  const [empCode, setEmpCode] = useState(null);
  const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (empCode === null || empCode === undefined) {
      setEmpDropdownOptions([]);
      return;
    } else {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetEmployeeMaster?employeeCode=${empCode}`)
        .then((response) => {
          if (response?.data) {
            const data = response?.data.map((d) => {
              return {
                label: `${d.empCode} - ${d.empName}`,
                code: d.empCode,
                name: d.empName,
              };
            });
            setEmpDropdownOptions(data);
          } else {
            setEmpDropdownOptions([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [empCode]);

  useEffect(() => {
    dispatch(getPriorityList());
    dispatch(getPODStatuses())
  }, [dispatch]);

  return (
    <div>
      <Box component="h2" sx={{ display: "flex", margin: "5px" }}>
        {editFlag ? "Edit Plan of Day" : "Add Plan of Day"}
      </Box>
      <Box
        sx={{
          borderRadius: "8px",
          height: "100%",
          overflow: "hidden",
          width: "700px",
        }}
      >
        <Formik
          initialValues={initialVal}
          validationSchema={taskValidationSchema}
          onSubmit={(values, actions) => {
            const data = {
              podDate: moment(new Date()).format("YYYY-MM-DD"),
              areaOfWork: values?.areaOfWork,
              activityName: values?.activityName,
              typeName: values?.Type,
              employeeId: values?.Employee?.code,
              venderName: values?.vendorName,
              actionTaken: values?.actionTaken,
              assigneeStatus: values?.assignStatus,
              siteInchargeStatus: values?.siteInchargeStatus,
              priority: values?.priority,
              pendingdueto: values?.pendingDueTo,
              siteName: values?.site?.siteName
            }
            dispatch(addOrUpdatePODtask(editData?.id ? { ...data, id: editData?.id } : data, onCloseDrawer))
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            initialValues,
            resetForm,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form id="task-form">
              <div className="task-form-upper-section">
                <Grid container rowSpacing={3} columnSpacing={7}>
                  <Grid item md={4}>
                    <FormTextField
                      toplabel="WTG/Area of work*"
                      name="areaOfWork"
                      id="areaOfWork"
                      type="text"
                      value={values?.areaOfWork}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4}>
                  <MySelectAutoComplete
                      toplabel="Site*"
                      options={UserSites || []}
                      getOptionLabel={(option) => (option && option.siteName ? option.siteName : '')}
                      name="site"
                      value={values?.site}
                      onChange={(e, value) => {
                        setFieldValue("site", value)
                      }}
                      className='fontSize-13'
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      size='small'
                      renderInput={(params) => <TextField  {...params} />}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormTextField
                      toplabel="Error/Activity Name"
                      name="activityName"
                      id="activityName"
                      type="text"
                      value={values?.activityName}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MySelectAutoComplete
                      toplabel="Type*"
                      options={podTypes || []}
                      name="Type"
                      value={values?.Type}
                      onChange={(e, value) => {
                        setFieldValue("Type", value)
                      }}
                      className='fontSize-13'
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      size='small'
                      renderInput={(params) => <TextField  {...params} />}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MySelectAutoComplete
                      toplabel="Employee*"
                      name='Employee'
                      values={values?.Employee}
                      listing={empDropdownOptions}
                      getOptionLabel={(option) => option.label}
                      onChangeDta={(e, value) => {
                        setFieldValue("Employee", value);
                        setEmpDropdownOptions([]);
                      }}
                      size="small"
                      disableClearable={false}
                      renderInput={(params) => <TextField {...params} />}
                      onInputChange={(e) => {
                        if (e?.target?.value === "") {
                          setEmpCode(null);
                          setEmpDropdownOptions([]);
                          return;
                        }
                        setEmpDropdownOptions([]);
                        setEmpCode(e?.target?.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <FormTextField
                      toplabel="Vendor/Labour/Contract"
                      name="vendorName"
                      id="vendorName"
                      type="text"
                      value={values?.vendorName}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MySelect
                      toplabel="Priority*"
                      name="priority"
                      id="priority"
                      value={values?.priority}
                      onChange={handleChange}
                    >
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Priority
                      </MenuItem>
                      {priorityDropdown?.map((item) => {
                        return (
                          <MenuItem value={item?.masterName}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={4}>
                    <MySelect
                      toplabel="Assignee Status*"
                      name="assignStatus"
                      value={values?.assignStatus}
                      onChange={handleChange}
                    >
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Assignee Status
                      </MenuItem>
                      {podStatuses?.map((item) => {
                        return (
                          <MenuItem value={item?.masterName}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={4}>
                    <MySelect
                      toplabel="Site Incharge Status*"
                      name="siteInchargeStatus"
                      value={values?.siteInchargeStatus}
                      onChange={handleChange}
                    >
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Site Incharge Status
                      </MenuItem>
                      {podStatuses?.map((item) => {
                        return (
                          <MenuItem value={item?.masterName}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={6}>
                    <FormTextField
                      toplabel="Action Taken*"
                      name="actionTaken"
                      id="actionTaken"
                      type="text"
                      value={values?.actionTaken}
                      onChange={handleChange}
                      multiline={true}
                      rows={2}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FormTextField
                      toplabel="Pending Due to"
                      name="pendingDueTo"
                      id="pendingDueTo"
                      type="text"
                      value={values?.pendingDueTo}
                      onChange={handleChange}
                      multiline={true}
                      rows={2}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>

              <div className="task-form-bottom-section">
                <Grid container sx={{ display: "flex", justifyContent: "end" }}>
                  <Grid item md={4}>
                    <div className="button-container">
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ color: "#00a18b" }}
                        onClick={onCloseDrawer}
                      >
                        Close
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ float: "right", color: "#00a18b" }}
                        type="submit"
                        className="Sub-btn"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default PODDrawer;
