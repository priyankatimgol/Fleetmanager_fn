import { getApiCall, postFormData } from "apiServices/apiUtils";
import { fetchError, showMessage, showWarning } from "./Common";
import moment from "moment";
import axios from "axios";

export const SET_MASTER_UPLOAD_DATA = 'SET_MASTER_UPLOAD_DATA';
export const SET_HISTORY_DATA = 'SET_HISTORY_DATA';
export const Add_FORMDATA = 'Add_FORMDATA';


export const setDropdownData = (payload: any) => ({
    type: SET_MASTER_UPLOAD_DATA,
    payload,
  });
export const setHistoryData = (payload: any) => ({
    type: SET_HISTORY_DATA,
    payload,
  });
export const addFormData = (payload: any) => ({
    type: Add_FORMDATA,
    payload,
  });

export const getDropdownData = () => {
    return  (dispatch) => {
        getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetDocumentMaster`)
        .then((response) => {
          dispatch(setDropdownData(response?.data));
            // dispatch(showMessage(response?.message));
          
        })
        .catch((error) => {
          dispatch(fetchError(error?.message));
        });
    };
  };

export const getHistoryData = (status) => {
    return  (dispatch) => {
        getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetDocUploadHistory?employee_ID=0&entityname=MasterUpload&documentType=Planning&Status=${status}`)
        .then((response) => {
          console.log("response ddc", response);
          let data = response.data?.map(v => ({...v , fileList : [{filename : v?.filename}]}))
        //   var data = groupByDocumentData(response?.data, "versionNumber");
          dispatch(setHistoryData(data));
            // dispatch(showMessage(response?.message));
          
        })
        .catch((error) => {
          dispatch(fetchError(error?.message));
        });
    };
  };

export const getHistoryCompletedData = () => {
    return  (dispatch) => {
        getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/FileUpload/GetDocCompltedHistory?employee_ID=0&entityname=MasterUpload&documentType=EmployeeMaster`)
        .then((response) => {
          console.log("response ddc", response);
          let data = response.data?.map(v => ({...v , fileList : [{filename : v?.filename}]}))
        //   var data = groupByDocumentData(response?.data, "versionNumber");
          dispatch(setHistoryData(data));
            // dispatch(showMessage(response?.message));
          
        })
        .catch((error) => {
          dispatch(fetchError(error?.message));
        });
    };
  };

export const getHistoryErrorData = () => {
    return  (dispatch) => {
        getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/FileUpload/GetDocErrorsHistory?employee_ID=0&entityname=MasterUpload`)
        .then((response) => {
          console.log("response ddc", response);
          let data = response.data?.map(v => ({...v , fileList : [{filename : v?.filename}]}))
        //   var data = groupByDocumentData(response?.data, "versionNumber");
          dispatch(setHistoryData(data));
            // dispatch(showMessage(response?.message));
          
        })
        .catch((error) => {
          dispatch(fetchError(error?.message));
        });
    };
  };

export const handleUploadFiles = (e, files, recId, status) => {
  return  (dispatch, getState) => {
    const stateData = getState()?.masterUpload?.formData
    // console.log("stateData", {stateData,files})
  const uploaded = [];
  let fileLimit = false
  let limitExceeded = false;
  files &&
    files?.some((file) => {
      if (
        uploaded &&
        uploaded?.findIndex((f) => f.name === file.name) === -1
      ) {
        uploaded.push(file);
        if (uploaded?.length === 8) fileLimit = true
        if (uploaded?.length > 8) {
          dispatch(
            fetchError(
              `You can only add a maximum of ${8} files` || ""
            )
          );
          fileLimit = false
          limitExceeded = true;
          return;
        }
      }
    });

  if (limitExceeded) {
    dispatch(
      fetchError(`You can only add a maximum of ${8} files` || "")
    );

    return;
  }

  const formData = {
    mandate_id : "0",
    entityname : "MasterUpload",
    DocumentType : stateData?.docType?.documentName,
    file : uploaded[key],
    RecordId : recId,
    remarks :"testing",
  }
  const formDataTemp = {
    MasterName : stateData?.docType?.documentName,
    RecordId : recId,
    UserName:"Admin"
  }
 
  for (var key in uploaded) {
    formData["file"] = uploaded[key]
  }
  for (var keys in uploaded) {
    formDataTemp["files"] = uploaded[keys]
  }

  if (uploaded?.length === 0) {
    fileLimit = false
    dispatch(fetchError("Error Occurred !"));
    return;
  }
  console.log("formData",formData)
  if (formData) {

    dispatch(
      showWarning(
        "Upload is in progress, please wait"
      )
    );

    postFormData(
        `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/FileUpload`,
        formData
      )
      .then((response) => {
        console.log("Upload",response)
        dispatch(getHistoryData(status))
        if (!response) {
          fileLimit = false
          dispatch(fetchError("Error Occurred !"));
          return;
        }
        if (response?.data == null) {
          fileLimit = false
          dispatch(fetchError("Documents are not uploaded!"));
          return;
        } else if (response?.code === 200) {
          fileLimit = false
          postFormData(
              `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/UploadAndSaveExcelData`,
              formDataTemp
            )
            .then((res) => {
              console.log("response 2", response)
              if (!res) {
                e.target.value = null;
                dispatch(fetchError("Error Occured when uploading file !!!"));
                return;
              }
              if(res?.status == null){
                e.target.value = null;
                dispatch(fetchError(res?.data));
                return;
              }
              e.target.value = null;
              if (res?.status) {
                dispatch(getDropdownData())
                dispatch(getHistoryData(status))
                dispatch(showMessage(res?.message));
              }
            })
            .catch((err) => {
            });
        }
      })
      .catch((e) => {
        dispatch(fetchError("Error Occurred !"));
      });
  }
}
};

 
export const getRecData = (e, files,status) => {
    return  (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GenerateRecordId`)
    .then(async(response) => {
      if (!response) return;
      if (
        response
      ) {
        var recId = response?.data;
       await dispatch(handleUploadFiles(e, files, recId, status));
      } else {
        e.target.value = null;
        dispatch(fetchError("Error Occurred !"));
        return;
      }
    })
    .catch((e) => {
      console.log("stateData", e)
      dispatch(fetchError("Error Occurred !"));
    });
    };
  };

export const getDownloadTemplate = (docType) => {
    return  (dispatch) => {
       try {
            if (docType) {
              var filename = docType?.filename || 'PlanningTemplate.xlsx';
              if (filename && filename === "") {
                dispatch(fetchError("Error Occurred !"));
                return;
              }
              const binaryStr = atob(docType?.base64Data);
              const byteArray = new Uint8Array(binaryStr.length);
              for (let i = 0; i < binaryStr.length; i++) {
                byteArray[i] = binaryStr.charCodeAt(i);
              }    
              var blob = new Blob([byteArray], {
                type: "application/octet-stream",
              });
              if (typeof window.navigator.msSaveBlob !== "undefined") {
                window.navigator.msSaveBlob(blob, filename);
              } else {
                var blobURL =
                  window.URL && window.URL.createObjectURL
                    ? window.URL.createObjectURL(blob)
                    : window.webkitURL.createObjectURL(blob);
                var tempLink = document.createElement("a");
                tempLink.style.display = "none";
                tempLink.href = blobURL;
                tempLink.setAttribute("download", filename);
                if (typeof tempLink.download === "undefined") {
                  tempLink.setAttribute("target", "_blank");
                }
    
                document.body.appendChild(tempLink);
                tempLink.click();
    
                setTimeout(function () {
                  document.body.removeChild(tempLink);
                  window.URL.revokeObjectURL(blobURL);
                }, 200);
    
                dispatch(
                  showMessage("Document Template is downloaded successfully!")
                );
              }
            }
          }
          catch(e) {
            dispatch(fetchError("Error Occurred !"));
          };
    };
  };

  export const downloadLogFile = (data, value) => {
    return  (dispatch, getState) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetExcelErrorLog?recordId=${data?.recordId}&type=${data?.status === "Failed" ? "Error":data?.status}`)
      .then((response) => {
        if (!response) {
          dispatch(fetchError("Error Occurred !"));
          return;
        }
        if (response) {
          var filename = data?.filename
          if (!filename) {
            dispatch(fetchError("Error Occurred !"));
            return;
          }
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            let byteChar = atob(response?.data);
            let byteArray = new Array(byteChar.length);
            for (let i = 0; i < byteChar.length; i++) {
              byteArray[i] = byteChar.charCodeAt(i);
            }
            let uIntArray = new Uint8Array(byteArray);
            let blob = new Blob([uIntArray], { type: "application/vnd.ms-excel" });
            window.navigator.msSaveBlob(blob, filename);
          } else {
            const source = `data:application/vnd.ms-excel;base64,${response?.data}`;
            const link = document.createElement("a");
            link.href = source;
            link.download = filename;
            link.click();
            dispatch(showMessage("The Master Bulk Upload Log file is downloaded successfully"));
          }
        }
      })
      .catch((e) => {
        dispatch(fetchError("Error Occurred !"));
      });
    }}

    export const downloadReport = (data) => {
      return  (dispatch) => {
        getApiCall(
          `/api/Reports/DownloadReport?ReportType=${data?.report}&FromDate=${data?.fromDate}&ToDate=${data?.toDate}`,
        )
        .then((response) => {
          if (response === null) {
            dispatch(fetchError("Record not found!"));
            return;
          }
          if (response) {
            var filename = `${data?.report} ${moment().format("ddd DD/MM/YYYY hh:mm:ss A")}.xlsx`
            if (!filename) {
              dispatch(fetchError("Error Occurred !"));
              return;
            }
            if (typeof window.navigator.msSaveBlob !== "undefined") {
              let byteChar = atob(response);
              let byteArray = new Array(byteChar.length);
              for (let i = 0; i < byteChar.length; i++) {
                byteArray[i] = byteChar.charCodeAt(i);
              }
              let uIntArray = new Uint8Array(byteArray);
              let blob = new Blob([uIntArray], { type: "application/vnd.ms-excel" });
              window.navigator.msSaveBlob(blob, filename);
            } else {
              const source = `data:application/vnd.ms-excel;base64,${response}`;
              const link = document.createElement("a");
              link.href = source;
              link.download = filename;
              link.click();
              dispatch(showMessage("The Report file is downloaded successfully"));
            }
    
    
          }
        })
        .catch((e) => {
          dispatch(fetchError("Error Occurred !"));
        });
      }}

