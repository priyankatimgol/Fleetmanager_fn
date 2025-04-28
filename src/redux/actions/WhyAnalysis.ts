import { deleteDataApi, getApiCall, postDataApi } from "apiServices/apiUtils";
import { fetchError, showMessage, showWarning } from "./Common";
import {
  GET_BREAKDOWN_DATA,
  GET_DROPDOWN,
  GET_ANALYSIS_PARAMS,
  SET_LOADING,
  SET_LOADING_BREAKDOWN_DATA,
  GETWHYDROPDOWN,
  SETUPDATEDID,
  GET_SYNERGYYEAR,
  GET_EDITWHYSDROPDOWN,
} from "types/actions/WhyAnalysis";

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload,
});

export const setLoadingBreakDownData = (payload: boolean) => ({
  type: SET_LOADING_BREAKDOWN_DATA,
  payload,
});

export const setBreakdownData = (payload) => ({
  type: GET_BREAKDOWN_DATA,
  payload,
});

export const setTypeDropdownData = (payload, category: string) => ({
  type: GET_DROPDOWN,
  payload: { [category]: payload },
});

export const setAnalysisParams = (payload) => ({
  type: GET_ANALYSIS_PARAMS,
  payload,
});
export const setWhyDropdown = (payload, parameter) => ({
  type: GETWHYDROPDOWN,
  payload,
  parameter
});
export const setUpdatedId = (payload) => ({
  type: SETUPDATEDID,
  payload,
});

export const setSynergyYear = (payload) => ({
  type: GET_SYNERGYYEAR,
  payload,
});

export const setEditWhysDropdown = (payload) => ({
  type: GET_EDITWHYSDROPDOWN,
  payload,
});

export const getBreakdownData = (date, updatedId) => {
  return (dispatch) => {
    dispatch(setLoadingBreakDownData(true));
    dispatch(setBreakdownData([]));
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWhyAnalysis?getDate=${date}`)
      .then((response) => {
        let actualArray = [];
        if(updatedId){
          const selectedValue = response?.data.filter(val => {
            if (val.sapCode === updatedId) return val;
        });
        
        const restValue = response?.data.filter(val => {
            if (val.sapCode !== updatedId) return val;
        });
        
         actualArray = [...selectedValue, ...restValue];
        //  dispatch(setBreakdownData(actualArray));
         dispatch(setBreakdownData(response?.data));
        } else {
          dispatch(setBreakdownData(response?.data));
        }
        dispatch(setLoadingBreakDownData(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingBreakDownData(false));
      });
  };
};

export const getBreakdownDataByWeek = (week, updatedId, weekYear) => {
  return (dispatch) => {
    dispatch(setLoadingBreakDownData(true));
    dispatch(setBreakdownData([]));
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWhyAnalysis?getWeek=${week}&getYear=${weekYear}`)
      .then((response) => {
        let actualArray = [];
        if(updatedId){
          const selectedValue = response?.data.filter(val => {
            if (val.sapCode === updatedId) return val;
        });
        
        const restValue = response?.data.filter(val => {
            if (val.sapCode !== updatedId) return val;
        });
        
         actualArray = [...selectedValue, ...restValue];
        //  dispatch(setBreakdownData(actualArray));
         dispatch(setBreakdownData(response?.data));
        } else {
          dispatch(setBreakdownData(response?.data));
        }
        
        dispatch(setLoadingBreakDownData(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingBreakDownData(false));
      });
  };
};

export const getTypeDropdwonData = (category: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=${category}`)
      .then((response) => {
        dispatch(setTypeDropdownData(response?.data, category));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAnalysisDetails = (id: number) => {
  return (dispatch) => {
    dispatch(setAnalysisParams([]));
    dispatch(setLoading(true));
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWhyAnalysisDetail?id=${id}`)
      .then((response) => {
        dispatch(setAnalysisParams(response?.data));
        setTimeout(() => dispatch(setLoading(false)), 500);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
};

export const addUpdateAnalysisDetails = (payload, closeDetails, refreshComponent) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateWhyAnalysis`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(
            showMessage(
              response?.message || "Analysis details saved successfully"
            )
          );
          closeDetails();
          refreshComponent();
        } else {
          dispatch(fetchError(response?.message || "Something went wrong!"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchError("Something went wrong!"));
      });
  };
};

export const downloadExcel = (value, downloadFileName, label) => {
  return (dispatch) => {
    const url = label === "Week" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GenerateExcel?week=${value}` : `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GenerateExcel?analysisDate=${value}`
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

export const getWhyDropdowns = (parameter) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/WhyReasonMaster?filter=${parameter}`)
      .then((response) => {
        dispatch(setWhyDropdown(response?.data, parameter));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSynergyYear = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetYear`)
      .then((response) => {
         dispatch(setSynergyYear(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const getEditWhysDrop = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWhyTypeMaster`)
      .then((response) => {
        dispatch(setEditWhysDropdown(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addWhyType = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddWhyType?WhyType=${payload}`)
      .then((response) => {
        dispatch(getEditWhysDrop())
        if (response) {
          dispatch( showMessage(response?.message || "WhyType Added Successfully"));
        } else {
          dispatch(fetchError(response?.message || "Something went wrong!"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchError("Something went wrong!"));
      });
  };
};

export const deleteWhyType = (id) => {
  return (dispatch) => {
    deleteDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteWhyType?id=${id}`)
      .then((response) => {
        if (response) {
          dispatch(getEditWhysDrop())
          dispatch( showMessage(response?.message || "whyType data deleted successfully"));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
