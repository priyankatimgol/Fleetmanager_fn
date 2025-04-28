import React from "react";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useDispatch } from "react-redux";
import { getRoleListingById, setAddEditRoleMaster } from "redux/actions/RoleMasterActions";
import { IconButtons } from "pages/common-components/Button";

function Edit(props) {
  const dispatch = useDispatch();
  const cellValue = props?.data?.id;
  const handleEdit = () => {
    dispatch(getRoleListingById(cellValue));
  };
  return (
    <IconButtons
      onClick={handleEdit}
      icon={<ModeEditOutlineRoundedIcon style={{ color: '#019e89' }} fontSize="small" />}
    />
  );
}

export default Edit;
