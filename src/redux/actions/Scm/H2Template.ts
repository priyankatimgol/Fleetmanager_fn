import { getApiCall, getTempApiCall,postDataApi } from "../../../apiServices/apiUtils";
import { GET_SEARCH_LOGBOOKDATA, DOWNLOAD_TO_PDF} from "../../../types/actions/LogbookActions/downloadView";
import { DOWNLOAD_EXCEL,DOWNLOAD_EXCEL_ERROR,DOWNLOAD_EXCEL_SUCCESS } from "types/actions/Scm/H2template";
import { fetchError, showMessage, showWarning } from "../Common";

export const DownloadTemplateExcel = (data) => {
  
  
  return (dispatch) => {
    dispatch({
      type: DOWNLOAD_EXCEL,
    }); 
    getTempApiCall(`http://fleetmanager.mindnerves.com:10006/api/scm/${data.templateType}`, data.body)
      .then((response) => {
        if (!response) {
          dispatch(fetchError("Error occurred in Export !!!"));
          return;
        }
        if (response?.code === 204) {
          dispatch(showWarning(response?.message ?? "No data available for selected date !"));
          return;
        }
  
        console.log('response', response);
  
        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); // Set correct MIME type
        const blobURL = window.URL.createObjectURL(blob);
  
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", `${data.templateType}`); // Specify filename with extension
  
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
  
        document.body.appendChild(tempLink);
        tempLink.click();
  
        setTimeout(() => {
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
        }, 200);
  
        dispatch({ type: DOWNLOAD_EXCEL_SUCCESS });
        dispatch(showMessage("File downloaded successfully!"));
      })
      .catch((error) => {
        dispatch({
          type: DOWNLOAD_EXCEL_ERROR,
        }); 
        console.log(error?.message);
      });
  };
  
  };