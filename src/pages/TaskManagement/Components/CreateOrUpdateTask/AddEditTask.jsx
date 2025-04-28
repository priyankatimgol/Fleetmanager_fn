import { Grid } from "@mui/material"
import TaskDetails from "./TaskDetails";
import TaskComments from "./TaskComments";
import { UPDATE_TASK } from "pages/TaskManagement/utils";
import "../../style.css";
import { getSites } from "redux/actions/logbook/DropdownAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddEditTask = ({ onCloseDrawer, mode }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state);
  const mainSiteDrop = state?.dropdownMaster?.siteListing;
  useEffect(() => {
    dispatch(getSites())
  }, [])
  return (
    <>
      <div
        className={`${mode === UPDATE_TASK ? "addTaskWrapperUpdate" : "addTaskWrapperCreate"
          } full-height`}
      >
        <Grid className="full-height" container columnSpacing={2}>
          <Grid item md={mode !== UPDATE_TASK ? 12 : 7.5}>
            <TaskDetails onCloseDrawer={onCloseDrawer} mode={mode} mainSiteDrop={mainSiteDrop}/>
          </Grid>
          {mode === UPDATE_TASK && (
            <Grid item md={4.5}>
              <TaskComments />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

export default AddEditTask;
