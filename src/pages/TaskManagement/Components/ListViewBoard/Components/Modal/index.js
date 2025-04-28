import { Box, Modal, TextField, Typography } from "@mui/material";
import { getApiCall } from "apiServices/apiUtils";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { Buttons } from "pages/common-components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModalStatus, updateTaskList } from "redux/actions/TaskManagmentActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 800,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ gridref }) => {
  const gridApi = gridref.current?.api;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const modalOpen = state.taskManager?.updateModal;

  const [empCode, setEmpCode] = useState(null);
  const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
  const [selAssignees, setSelAssignees] = useState([]);
  const [selReviewer, setSelReviewers] = useState([]);
  
  const handleClose = () => {
    dispatch(setUploadModalStatus(false));
    setSelAssignees([])
    setSelReviewers([])
  };

  const unSelectAll = () => {
    gridApi.deselectAll();
  }

  const handleSubmit = () => {
    const data = gridApi?.getSelectedRows();

    const payload = data.map(d => {
      return {
        ...d,
        assignedToUser: selAssignees.length > 0 ? selAssignees.map(emp => emp.code) : d.assignedToUser.map(emp => emp.empCode),
        natureOfTaskId: d.natureOfTaskId.id,
        priorityId: d.priorityId.id,
        reviewer: selReviewer.length > 0 ? selReviewer.map(emp => emp.code) : d.reviewer.map(emp => emp.empCode),
        sprintId: d.sprintId.id,
        statusId: d.statusId.id,
        taskTypeId: d.taskTypeId.id
      }
    });

    dispatch(updateTaskList(payload, unSelectAll));
  }

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
    <div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Update
          </Typography>
          <MySelectAutoComplete
            toplabel="Assigned To*"
            name="assignedTo"
            multiple={true}
            // values={selAssignees}
            listing={empDropdownOptions}
            getOptionLabel={(option) => option.label}
            onChangeDta={(e, value) => {
              setSelAssignees(value)
              setEmpDropdownOptions([]);
            }}
            size="small"
            sx={{ mb: 3 }}
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
          <MySelectAutoComplete
            toplabel="Reviewer*"
            name="reviewer"
            multiple={true}
            // values={selReviewer}
            sx={{ mb: 3 }}
            listing={empDropdownOptions}
            getOptionLabel={(option) => option.label}
            onChangeDta={(e, value) => {
              setSelReviewers(value)
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
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%',
              gap: 3 
            }} 
          >
            <Buttons
              variant="outlined"
              onClick={handleClose}
              name="Cancel"
              size="medium"
            />
            <Buttons
              variant="contained"
              onClick={handleSubmit}              
              size="medium"
              className="Sub-btn"
              name="Submit"
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
