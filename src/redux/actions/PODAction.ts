import { PRIORITY_LIST,POD_LIST, GET_PODTYPES, GET_PODSTATUSES, GET_PODTASKBYID } from "types/actions/POD";
import { deleteDataApi, getApiCall, postDataApi } from "apiServices/apiUtils";
import { fetchError, showMessage, showWarning } from "./Common";

export const setPriorityList = (payload: any) => ({
    type: PRIORITY_LIST,
    payload,
});

export const setPODList = (payload: any) => ({
    type: POD_LIST,
    payload,
});

export const setPODTypes = (payload: any) => ({
    type: GET_PODTYPES,
    payload,
});
export const setPODStatuses = (payload: any) => ({
  type: GET_PODSTATUSES,
  payload,
});

export const setPODTaskById = (payload: any) => ({
  type: GET_PODTASKBYID,
  payload,
});

export const getPriorityList = () => {
    return (dispatch) => {
        getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Priority`)
        .then(
        (response) => {
        if(response?.status && response?.code === 200 && response?.data){
            dispatch(setPriorityList(response?.data?.commonMasterLists || []));
        }
        }
    );
    };
};


export const getPODList = (date, siteName) => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetPOD_Main?date=${date}&siteName=${siteName}`)
        .then((response) => {        
            dispatch(setPODList(response?.data || [])); 
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getPODTypeDropdown = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/PodTaskDropdown`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setPODTypes(response?.data || []));
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getPODStatuses = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=PodStatus`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setPODStatuses(response?.data?.commonMasterLists || []));
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const addOrUpdatePODtask = (data, onCloseDrawer) => {
    return (dispatch) => {
      postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/AddUpdatePod`, data)
        .then((response) => {        
            if(response?.status){
              dispatch(getPODList(data?.podDate, data?.siteName)) 
              dispatch(  showMessage(response?.message || "Added POD task successfully") );
              onCloseDrawer()
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getPODTaskById = (id, onOpenDrawer) => {
    return (dispatch) => {
      dispatch(setPODTaskById({}));
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetPodById?id=${id}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                 dispatch(setPODTaskById(response?.data || {}));
                //  onOpenDrawer()
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const deletePODTask = (data, siteName) => {
    return (dispatch) => {
      deleteDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/DeletePOD_Main?Id=${data?.id}`)
        .then((response) => {
          if (response?.status) {
            dispatch(getPODList(data?.podDate, siteName)) 
            dispatch(
              showMessage(response?.message || "Delete POD Task successfully")
            );
          } else {
            dispatch(fetchError(response?.message || "Error"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  export const addRescheduleDate = (id, rescheduleDate, date, siteName) => {  
    return (dispatch) => {
      postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/PodDateChange?Id=${id}&date=${rescheduleDate}`)
        .then((response) => {
          if (response?.status) {
            dispatch(getPODList(date, siteName))
            dispatch(showMessage(response?.message || "Reschedule the plan of day successfully") );
          } else {
            dispatch(fetchError(response?.message || "Error"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const downloadPODExcel = (date, site, downloadFileName, ) => {
    return (dispatch) => {
      const url = `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/POD Report?Date=${date}&SiteName=${site}`
      getApiCall(url)
        .then((response) => {
          if (!response) {
            dispatch(fetchError("Error occurred in Export !!!"));
            return;
          }
          if (response?.code === 204) {
            dispatch(
              showWarning(
                response?.message ?? "No data available for selected date !"
              )
            );
            return;
          }
          if (response?.data) {
            var filename = `${downloadFileName}.xlsx`;
            if (filename && filename === "") {
              dispatch(fetchError("Error Occurred !"));
              return;
            }
            const binaryStr = atob(response?.data);
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
                showMessage(response?.message ?? "File downloaded successfully!")
              );
            }
          }
        })
        .catch((error) => {
          console.log(error?.message);
        });
    };
  };
  