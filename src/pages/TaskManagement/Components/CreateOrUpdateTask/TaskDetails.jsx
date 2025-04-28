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
import { CREATE_TASK, UPDATE_TASK } from "../../utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomDropzone from "pages/common-components/CustomDropzone";
import { DatePickerComp } from "pages/common-components/DateAndTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAndUpdate, getTaskDocument } from "redux/actions/TaskManagmentActions";
import "../../style.css";
import { getApiCall } from "apiServices/apiUtils";
import moment from "moment";

const acceptFileTypes =
  "image/*, application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const TaskDetails = ({ onCloseDrawer, mode, mainSiteDrop }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const TicketId = state?.taskManager?.ticketById;
  const TaskTypeDropdown = state?.taskManager?.dropdowns?.["Task Type"];
  const NatureOfTaskDropdown =
    state?.taskManager?.dropdowns?.["Nature of Task"];
  const SprintDropdown = state?.taskManager?.dropdowns?.["Sprint"];
  const PriorityDropdown = state?.taskManager?.dropdowns?.["Priority"];
  const TaskStatusListing = state?.taskManager?.statusList || [];
  const taskDoccuments = state?.taskManager?.taskDoccuments || [];

  const intialVal = {
    ticketNo: TicketId?.ticketNo || "",
    taskType: TicketId?.taskTypeId?.id || "",
    status: TicketId?.statusId?.id || 1,
    title: TicketId?.title || "",
    description: TicketId?.description || "",
    natureOfTask: TicketId?.natureOfTaskId?.id || "",
    site: TicketId?.siteCode || null,
    label: TicketId?.label || "",
    location: TicketId?.location || "",
    dueDate: TicketId?.dueDate || new Date(),
    priority: TicketId?.priorityId?.id || "",
    assignedTo: TicketId?.assignedToUser?.map((d) => {
      return {
        label: `${d.empCode} - ${d.empName}`,
        code: d.empCode,
        name: d.empName,
      };
    }) || [],
    reviewer: TicketId?.reviewer?.map((d) => {
      return {
        label: `${d.empCode} - ${d.empName}`,
        code: d.empCode,
        name: d.empName,
      };
    }) || [],
    attachment: TicketId?.id || [],
  };

  const taskValidationSchema = Yup.object().shape({
    taskType: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
    natureOfTask: Yup.string().required("Required"),
    site: Yup.object().required("Required").nullable(),
    // label: Yup.string().required("Required"),
    // location: Yup.string().required("Required"),
    dueDate: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
    assignedTo: Yup.array().required("Required").min(1, "Required"),
    reviewer: Yup.array().required("Required").min(1, "Required"),
    // attachment: Yup.array().required("Required"),
  });

  const [empCode, setEmpCode] = useState(null);
  const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
  const [attachment, setAttachments] = useState();

  const setSelAttchments = (files) => {
    if (files?.length > 0) {
      const updatedAttachment = files.map((obj) => {
        const { objUrl, ...newObj } = obj;
        return newObj;
      });

      const filterDocc = updatedAttachment?.filter((d) => !d?.file?.guid)
      setAttachments(filterDocc);
    }
  }

  useEffect(() => {
    if (TicketId?.id) {
      dispatch(getTaskDocument(TicketId?.id || 0))
    }
  }, [TicketId])
  useEffect(() => {
    if (mode === CREATE_TASK) {
      dispatch(getTaskDocument(0))
    }
  }, [])

  useEffect(() => {
    if (empCode && empCode === "") {
      setEmpDropdownOptions([]);
      return;
    } else {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/EmployeeDetails?EmployeeCode=${empCode}`)
      .then((response) => {
        if (response?.data) {
          const modifiedArray = response?.data?.map(response => ({
            label: `${response.code} - ${response.name}`,
            code: response.code,
            name: response.name,
            email: response.email
          }));
          setEmpDropdownOptions(modifiedArray);
        } else {
          setEmpDropdownOptions([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [empCode]);

  return (
    <>
      <Box
        sx={{
          border: "1px solid #c4c4c4",
          borderRadius: "8px",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Formik
          initialValues={intialVal}
          validationSchema={taskValidationSchema}
          onSubmit={(values, actions) => {
            const data = {
              taskTypeId: values?.taskType,
              statusId: values?.status,
              title: values?.title,
              description: values?.description,
              natureOfTaskId: values?.natureOfTask,
              sprintId: 1105,
              siteCode: values?.site?.mainSiteCode,
              siteName: values?.site?.mainSite,
              location: values?.location,
              dueDate: moment(values?.dueDate).format("YYYY-MM-DDT00:00:00"),
              priorityId: values?.priority,
              assignedToUser: values?.assignedTo?.map((i) => i.code),
              reviewer: values?.reviewer?.map((i) => i.code),
              attachment: attachment
            };
            dispatch(createTaskAndUpdate(TicketId?.id ? { ...data, id: TicketId?.id, ticketNo: TicketId?.ticketNo, siteIncharge:TicketId?.siteIncharge} :{ ...data, label:"Label"}), onCloseDrawer());
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
                  {mode === UPDATE_TASK && (
                    <Grid item md={4}>
                      <FormTextField
                        toplabel="Ticket No.*"
                        name="ticketNo"
                        type="text"
                        value={values.ticketNo}
                        onChange={handleChange}
                        disabled={true}
                        fullwidth="false"
                        size="small"
                      />
                    </Grid>
                  )}
                  <Grid item md={mode === UPDATE_TASK ? 4 : 6}>
                    <MySelect
                      toplabel="Task Type*"
                      name="taskType"
                      value={values?.taskType}
                      onChange={handleChange}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                    >
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Task Type
                      </MenuItem>
                      {TaskTypeDropdown?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={mode === UPDATE_TASK ? 4 : 6}>
                    <MySelect
                      toplabel="Status*"
                      name="status"
                      value={values?.status}
                      onChange={handleChange}
                      disabled={TicketId?.statusId?.id ? false : true}
                    >
                      {TaskStatusListing?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>{item?.status}</MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>

                  <Grid item md={4}>
                    <FormTextField
                      toplabel="Title*"
                      name="title"
                      type="text"
                      value={values?.title}
                      onChange={handleChange}
                      multiline={true}
                      rows={2}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item md={8}>
                    <FormTextField
                      toplabel="Description"
                      name="description"
                      type="text"
                      value={values?.description}
                      onChange={handleChange}
                      multiline={true}
                      rows={2}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </Grid>

                  <Grid item md={4}>
                    <MySelect
                      toplabel="Nature Of Task*"
                      name="natureOfTask"
                      value={values?.natureOfTask}
                      onChange={handleChange}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                    >
                      <MenuItem className="color-appgrey" value={0} disabled>
                        Select Nature
                      </MenuItem>
                      {NatureOfTaskDropdown?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={4}>
                    {/* <MySelect
                      toplabel="Sprint*"
                      name="sprint"
                      value={values?.sprint}
                      onChange={handleChange}
                      disabled={true}
                    >
                      <MenuItem className="color-appgrey" value={0} disabled>
                        Select Sprint
                      </MenuItem>
                      {SprintDropdown?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect> */}
                   <MySelectAutoComplete
                      toplabel="Site*"
                      name="site"
                      values={values?.site}
                      listing={mainSiteDrop || []}
                      getOptionLabel={(option) => option.mainSite}
                      onChangeDta={(e, value) => {
                        setFieldValue("site", value);
                      }}
                      size="small"
                      ListboxProps={{ style: { maxHeight: 170 } }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  
                  <Grid item md={4}>
                    <FormTextField
                      toplabel="Location"
                      name="location"
                      value={values?.location}
                      onChange={handleChange}
                      type="text"
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <DatePickerComp
                      toplabel="Due Date*"
                      name="dueDate"
                      value={values?.dueDate}
                      handleOnChange={(value) =>
                        setFieldValue("dueDate", value)
                      }
                      minDate={new Date()}
                      size="small"
                    />
                  </Grid>
                  <Grid item md={4}>
                    <MySelect
                      toplabel="Priority*"
                      name="priority"
                      value={values?.priority}
                      onChange={handleChange}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                    >
                      <MenuItem className="color-appgrey" value={0} disabled>
                        Select Priority
                      </MenuItem>
                      {PriorityDropdown?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {item?.masterName}
                          </MenuItem>
                        );
                      })}
                    </MySelect>
                  </Grid>
                  <Grid item md={4}>
                    {/* <FormTextField
                      toplabel="Label*"
                      name="label"
                      type="text"
                      value={values?.label}
                      onChange={handleChange}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
                      size="small"
                    /> */}
                  </Grid>

                  <Grid item md={12}>
                    <MySelectAutoComplete
                      toplabel="Assigned To*"
                      name="assignedTo"
                      multiple={true}
                      values={values?.assignedTo}
                      listing={empDropdownOptions}
                      getOptionLabel={(option) => option.label}
                      onChangeDta={(e, value) => {
                        setFieldValue("assignedTo", value);
                        setEmpDropdownOptions([]);
                      }}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
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

                  <Grid item md={12}>
                    <MySelectAutoComplete
                      toplabel="Reviewer*"
                      name="reviewer"
                      multiple={true}
                      values={values?.reviewer}
                      listing={empDropdownOptions}
                      getOptionLabel={(option) => option.label}
                      onChangeDta={(e, value) => {
                        setFieldValue("reviewer", value);
                        setEmpDropdownOptions([]);
                      }}
                      disabled={
                        TicketId?.statusId?.status === "IN REVIEW"
                          ? true
                          : false
                      }
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

                  <Grid item md={12}>
                    <CustomDropzone
                      toplabel="Attachments"
                      acceptFileTypes={acceptFileTypes}
                      setSelAttchments={setSelAttchments}
                      taskDoccuments={taskDoccuments}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className="task-form-bottom-section">
                <Grid container>
                  <Grid item md={8}>
                    {mode === UPDATE_TASK && (
                      <>
                        <Typography variant="h5">
                          Reported By:
                          {TicketId?.createdBy === null ? "" : <span>
                            {TicketId?.createdBy} on{" "}
                            {moment(TicketId?.createdDate).format(
                              "DD-MM-YYYY HH:mm"
                            )}
                          </span>}
                        </Typography>
                        <Typography variant="h5">
                          Modified By:
                          <span>
                            {TicketId?.modifiedBy} on{" "}
                            {moment(TicketId?.modifiedDate).format(
                              "DD-MM-YYYY HH:mm"
                            )}
                          </span>
                        </Typography>
                      </>
                    )}
                  </Grid>

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
    </>
  );
};

export default TaskDetails;
