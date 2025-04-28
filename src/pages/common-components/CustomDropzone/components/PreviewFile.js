import { useCallback, useEffect, useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import PDF_PREVIEW from "../../../../assets/images/pdf_preview.jpg";
import EXCEL_PREVIEW from "../../../../assets/images/Excel-Logo-Preview.png";
import { format } from "date-fns";
import { MdDelete, MdDownload } from "react-icons/md";
import { IconButtons } from "pages/common-components/Button";
import "../styles.css";
import moment from "moment";

const iconButtonSX = {
  "&.MuiIconButton-root": {
    p: "5px",
    backgroundColor: "#ffffff",
    boxShadow:
      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
    transition: 'all 150ms ease-in-out',
  },
  "&.MuiIconButton-root:hover": {
    transform: "scale(1.1)",
    color: "#000"
  }
};

const excelTypes = ["xls", "csv", "xlsx"];

const PreviewFile = ({ file: data, removeSelectedFile }) => {
  const [fileDetails, setFileDetails] = useState({
    type: "",
    name: "",
    date: "",
  });


  useEffect(() => {
    const extension = data.file.name.split(".");
    const fileExtension = extension[extension.length - 1];
    const date = moment(data?.file?.lastModifiedDate).format("DD-MM-YYYY");
    let name;
    if (data.file.name.length > 12) {
      name = `${data.file.name.substring(0, 12)}... .${fileExtension}`;
    } else {
      name = data.file.name;
    }

    setFileDetails((prev) => ({
      ...prev,
      type: fileExtension,
      name: name,
      date: date,
    }));
  }, [data]);

  return (
    <div className="preview-box">
      <div className="image-box">
        <img
          className={
            (fileDetails.type === "pdf" || excelTypes.includes(fileDetails.type)) ? "preview-pdf" : "preview-image"
          }
          src={
            fileDetails.type === "pdf" ? PDF_PREVIEW :
              excelTypes.includes(fileDetails.type) ? EXCEL_PREVIEW :
                data.objUrl
          }
        />
        <div className="file-action-buttons">
          <IconButtons
            onClick={() => {
              removeSelectedFile(data.file);
            }}
            icon={<MdDelete />}
            sx={iconButtonSX}
            size="small"
          />
          <a href={data.objUrl} download={data.file.name}>
            <IconButtons
              onClick={() => { }}
              icon={<MdDownload />}
              sx={iconButtonSX}
              size="small"
            />
          </a>
        </div>
      </div>
      <div className="file-details">
        <Tooltip title={data.file.name}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {fileDetails.name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {fileDetails.date}
        </Typography>
      </div>
    </div>
  );
};

export default PreviewFile;
