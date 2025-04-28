import React from "react";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useDispatch } from "react-redux";
import { Buttons, IconButtons } from "pages/common-components/Button";
import { getDownloadPDF } from "redux/actions/logbook/DownloadViewAction";
import { FaRegFilePdf } from "react-icons/fa";
import moment from "moment";

function DownloadPDF(props) {
  const dispatch = useDispatch();
  const cellValue = props?.data;
  const handleEdit = () => {
    const date = moment(props?.data?.logDate).format("DD-MM-YYYY");
    const shift = props?.data?.shiftCycle;
    const downloadFileName = `Logbook_${shift}_${date}`
    dispatch(getDownloadPDF(cellValue, downloadFileName))
  };
  return (
    // <IconButtons
    //   onClick={handleEdit}
    //   icon={<FaRegFilePdf style={{ color: 'red' }} fontSize="24px" />}
    // />
    <Buttons
      variant="contained"
      type="submit"
      size="small"
      fontSize="11px"
      className="Sub-btn"
      name="Download logbook"
      onClick={handleEdit}
    />
  );
}

export default DownloadPDF;