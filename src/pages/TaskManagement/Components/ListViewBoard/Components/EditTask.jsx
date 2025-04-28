import React from "react";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useDispatch } from "react-redux";
import { IconButtons } from "pages/common-components/Button";
import { UPDATE_TASK } from "pages/TaskManagement/utils";
import { getTicketsDetailsById } from "redux/actions/TaskManagmentActions";

function EditTask( onOpenDrawer, setMode, props) {
  const dispatch = useDispatch();
  const taskId = props?.data?.id;
  const handleEdit = () => {
    if(taskId){
      setMode(UPDATE_TASK);
      dispatch(getTicketsDetailsById(taskId, onOpenDrawer))
    }
  };
  return (
    <IconButtons
      onClick={handleEdit}
      icon={<ModeEditOutlineRoundedIcon style={{ color: '#019e89' }} fontSize="small" />}
    />
  );
}

export default EditTask;
