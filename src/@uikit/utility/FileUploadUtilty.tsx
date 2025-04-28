import { getHeaders } from "apiServices/apiUtils";
import axios from "axios";
import { fetchError, showMessage } from "redux/actions";
import { store } from "redux/store";
declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

const supportedFormats = [
  "message/rfc822",
  "",
  "text/csv",
  "text/xml",
  "application/msword",
  "application/x-zip-compressed",
  "application/rtf",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/x-7z-compressed",
  "video/mp4",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const _validationMaxFileSizeUpload = (e, dispatch) => {
  const selectableMaxFileSize = 1024 * 1024 * 10;
  let initialFileSize: number = 0;
  const chosenFiles = Array.prototype.slice.call(e.target.files);
  var fileNameList =
    chosenFiles &&
    chosenFiles?.filter((item) => {
      var regex = new RegExp(/^[a-zA-Z 0-9]+$/);
      var fileName = item?.name;
      fileName = fileName?.split(".");
      fileName = fileName?.[0];
      if (regex.test(fileName) === false) {
        return item;
      }
      return null;
    });
  fileNameList = fileNameList?.map((item) => item !== null);
  if (e.target.files) {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file && file.type) {
        if (0 > supportedFormats.indexOf(file.type)) {
          dispatch(
            fetchError(
              "The uploaded file is not supported. Invalid file format !!!"
            )
          );
          e.target.value = null;
          return;
        }
      }
      initialFileSize += file.size;
    }
    if (initialFileSize > selectableMaxFileSize) {
      e.target.value = null;
      dispatch(fetchError("The file size should not be more than 10 MB"));
      return;
    }
  }
  if (fileNameList && fileNameList?.length > 0) {
    dispatch(
      fetchError("File Name should not contain special characters")
    );
    e.target.value = null;
    return;
  }

  return true;
};

export const fileValidation = (e, file, dispatch) => {
  let data = file?.filter(v => v.type === 'application/vnd.ms-excel' || v.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  if (data.length === file.length) {
    return true;
  }
  else {
    e.target.value = null;
    dispatch(
      fetchError("Please select an Excel file!")
    );
    return;
  }
}

export const downloadTemplate = (docType) => {
  if (docType && docType.documentName !== "") {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_BASE_EXTENTION}/api/ImageStorage/DownloadTemplate?documenttype=${docType?.documentType || "Vendor Invoice"}`,
        getHeaders()
      )
      .then((response: any) => {
        if (!response) {
          store.dispatch(fetchError("Error Occurred !"));
          return;
        }
        if (response?.data) {
          var filename = response.data.filename;
          if (filename && filename === "") {
            store.dispatch(fetchError("Error Occurred !"));
            return;
          }
          const binaryStr = atob(response?.data?.base64String);
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

            store.dispatch(
              showMessage("Document Template is downloaded successfully!")
            );
          }
        }
      })
      .catch((e: any) => {
        store.dispatch(fetchError("Error Occurred !"));
      });
  } else {
    store.dispatch(fetchError("Document Type requried !  "));
  }
};

export const downloadFile = (value, mandateId, dispatch) => {
  if (value && value?.fileList?.length === 1) {
    if (value && value?.filename !== "") {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetUploadedFile?recordId=${value?.recordId}&employee_ID=${value?.mandateId}&DocumentType=${value?.documenttype}`, getHeaders()
        )
        .then((response: any) => {
          if (!response) {
            dispatch(fetchError("Error occurred in downloading file !!!"));
            return;
          }

          if (response?.data) {
            var filename = response?.data?.data?.filename;
            if (filename && filename === "") {
              dispatch(fetchError("Error Occurred !"));
              return;
            }
            if (response?.data?.data?.base64String == undefined) {
              dispatch(fetchError("Error Occurred !"));
              return;
            }
            const binaryStr = atob(response?.data?.data?.base64String);
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

              dispatch(showMessage("Document is downloaded successfully!"));
            }
          }
        })
        .catch((e: any) => {
          dispatch(fetchError("Error Occurred !"));
        });
    }
  } else {
    var fileList = value && value?.fileList;
    var list: any = [];
    fileList &&
      fileList?.length > 0 &&
      fileList.map((item) => {
        list?.push(item?.filename);
      });
    if (list && list.length === 0) {
      dispatch(fetchError("No files available to download"));
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_BASE_EXTENTION}/api/FileUpload/DownloadFile?employee_ID=${value?.employee_Id}&recordId=${value?.recordId}&DocumnetType=${value?.documentType}`
      )
      .then((response: any) => {
        if (!response) {
          dispatch(fetchError("Error occurred in downloading file !!!"));
          return;
        }
        if (response?.data) {
          var filename = response.data.filename;
          if (filename && filename === "") {
            dispatch(fetchError("Error Occurred !"));
            return;
          }
          const binaryStr = atob(response?.data?.base64String);
          const byteArray = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            byteArray[i] = binaryStr.charCodeAt(i);
          }
          var blob = new Blob([byteArray], { type: "application/zip" });
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

            dispatch(showMessage("Document is downloaded successfully!"));
          }
        }
      })
      .catch((e: any) => {
        dispatch(fetchError("Error Occurred !"));
      });
  }
};
