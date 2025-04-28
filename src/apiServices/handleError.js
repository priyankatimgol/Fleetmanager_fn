// import { getApiCall } from "./apiUtils";

export const getRefressToken = () => {
  // const token = localStorage.getItem("accessToken") || "";
  const urlRedirect = "/signin";
  window.location.href = urlRedirect;
  // getApiCall(`/api/Login/RefreshToken?Token=${token}`)
  //   .then((response) => {
  //     if (response.status) {
  //       localStorage.setItem("accessToken", response?.data);
  //     } else {
  //       window.location.href = urlRedirect;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     window.location.href = urlRedirect;
  //   });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (error) => {
  const { response } = error;
  if (response) {
    let obj = {};
    switch (response.status) {
      case 500:
        obj = {
          title: "ERROR",
          message:
            response?.data?.data?.message ||
            "There was error in processing request.Please try again later",
          status: true,
        };
        break;
      case 400:
        obj = {
          title: "ERROR",
          message: "Bad Request",
          status: true,
        };
        break;
      case 404:
        obj = {
          title: "Resource You are trying to access is not available",
          message: "",
          status: true,
        };
        break;
      case 401:
        obj = {
          title: "ERROR",
          message: "UNAUTHROISED",
          status: true,
        };
        getRefressToken();
        break;
      default:
        obj = {
          title: "ERROR",
          message:
            "There was error in processing request.Please try again later",
          status: true,
        };
    }
    return obj;
  }
  return null;
};
