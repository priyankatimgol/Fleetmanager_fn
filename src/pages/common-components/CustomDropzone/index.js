import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import PreviewFile from "./components/PreviewFile";
import { Box, Grid, Typography } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { deleteDocument } from "redux/actions/TaskManagmentActions";

function CustomDropzone({
  toplabel, // Label
  acceptFileTypes, // String of file types to accepted
  acceptFileExtensions, // Array of file extensions to be accepted
  setSelAttchments,
  taskDoccuments
}) {
  const dispatch = useDispatch()
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, open } =
    useDropzone({ noClick: true });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const removeSelectedFile = (file) => {
    const files = selectedFiles.filter((f) => f.file.name !== file?.name);
    setSelectedFiles([...files]);
     dispatch(deleteDocument(file?.id))
  };

  const state = useSelector((state) => state)
  const loading = state?.taskManager?.docLoading;

  useEffect(() => {
    if (taskDoccuments) {
      const fileObject = taskDoccuments?.map((d) => {
        const binaryData = atob(d?.base64Data);
        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const objectURL = URL.createObjectURL(blob);
        return {
          objUrl: objectURL,
          file: {
            name: d?.fileName,
            path: d?.fileName,
            lastModifiedDate: d?.createdDate,
            guid: d?.guid,
            id: d?.id,
            taskId: d?.taskId,
          }
        }
      });
      setSelectedFiles([])
      setSelectedFiles((prev) => [...prev, ...fileObject]);
    }
  }, [taskDoccuments])

  useEffect(() => {
    setSelAttchments(selectedFiles)
  }, [selectedFiles])

  useEffect(() => {
    if (acceptedFiles.length === 0) return;

    // Todo: Validate incoming files 
    const fileObjects = acceptedFiles.map((file) => {
      return {
        objUrl: URL.createObjectURL(file),
        file: file,
      };
    });

    setSelectedFiles((prev) => [...prev, ...fileObjects]);

    for (let i = 0; i <= acceptedFiles.length; i++) {
      URL.revokeObjectURL(acceptedFiles[i]);
    }

  }, [acceptedFiles?.length]);

  const SelectFileGrids = useCallback(() => {
    const total = selectedFiles.length;
    const rem = (5 -(total % 5));

    if (selectedFiles.length === 0 || rem === 5) {
      return null;
    }

    let grids = [];

    for(let i=0; i<=rem; i++) {
      const grid = <Grid item md={2.4} onClick={open} sx={{ cursor: 'pointer' }}></Grid>
      grids.push(grid)
    }

    return grids;
  }, [selectedFiles])

  return (
    <section>
      <div {...getRootProps()} onClick={open}>
        <Box sx={{ display: "inline-flex", gap: 2, cursor: 'pointer' }}>
          <Typography variant="body2" className="bold-600">
            {toplabel?.includes("*") ? (
              <>
                <span>{toplabel?.replace("*", "")}</span>
                <span className="color-red">*</span>
              </>
            ) : (
              toplabel //for top label
            )}
          </Typography>
          <input {...getInputProps()} multiple accept={acceptFileTypes} />
          {isDragActive ? (
            <Typography variant="body2">(Drop the files here ...)</Typography>
          ) : (
            <Typography variant="body2">
              (Drag 'n' drop some files here, or click to select files)
            </Typography>
          )}
        </Box>
        {selectedFiles?.length === 0 && (
          <Box className="upload-zone">
            <MdOutlineFileUpload />
          </Box>
        )}
      </div>
      <aside>
        <Grid container columnSpacing={2} >
          {loading ? <Box sx={{ justifyContent: "center", width: "100%", height: "200px" }}>
            <Spinner />
          </Box> : selectedFiles.length > 0 &&
          selectedFiles.map((file, ind) => (
            <Grid item md={2.4}>
              <PreviewFile
                key={ind}
                file={file}
                id={ind}
                removeSelectedFile={removeSelectedFile}
              />
            </Grid>
          ))}
          <SelectFileGrids />
        </Grid>
      </aside>
    </section>
  );
}

export default CustomDropzone;
