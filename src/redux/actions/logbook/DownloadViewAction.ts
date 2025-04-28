
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_SEARCH_LOGBOOKDATA, DOWNLOAD_TO_PDF} from "../../../types/actions/LogbookActions/downloadView";
import { fetchError, showMessage, showWarning } from "../Common";

export const setSearchLogbookData = (payload: any) => ({
  type: GET_SEARCH_LOGBOOKDATA,
  payload,
});
export const setDownloadToPdf = (payload: any) => ({
  type: DOWNLOAD_TO_PDF,
  payload,
});

export const getAllSearchlogbookData = (data) => { 
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetLogbookRecords?siteName=${data?.siteName}&logFromDate=${data?.fromdate}&logToDate=${data?.todate}`)
      .then((response) => {
        dispatch(setSearchLogbookData(response?.data))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getDownloadPDF = (data, downloadFileName) => { 
return (dispatch) => {
  getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GeneratePDF?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
        if (!response) {
          dispatch(fetchError("Error occurred in Export !!!"));
          return;
        }
        if (response) {
          var filename = `${downloadFileName}.pdf`;
          if (filename && filename === "") {
            dispatch(fetchError("Error Occurred !"));
            return;
          }
          const binaryStr = atob(response);
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

export const downloadSummaryExcel = (data, downloadFileName) => {
  
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GenerateLogBookExcel?StateName=${data?.state}&AreaName=${data?.area}&SiteName=${data?.siteName}&FromDate=${data?.fromDate}&ToDate=${data?.toDate}`)
      .then((response) => {
        if (!response) {
          dispatch(fetchError("Error occurred in Export !!!"));
          return;
        }
        if (response?.code === 204) {
          dispatch(showWarning(response?.message ?? "No data available for selected date !"));
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
