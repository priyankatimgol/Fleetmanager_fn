import api from "apiServices";

const getHeadersForFileUpload = () => {
  return {
    headers: { "Content-Type": "multipart/form-data",
    ...(getAccessToken() && {
      authorization: `Bearer ${getAccessToken()}`,
    }),
  },
  };
};

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export const getHeaders = () => {
  return {
    headers: {
      "ngrok-skip-browser-warning": true,
      ...(getAccessToken() && {
        authorization: `Bearer ${getAccessToken()}`,
      }),
    },
  };
};

const createFormData = (body) => {
  const apiFormData = new FormData();
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      if (body[key] instanceof Array) {
        apiFormData.append(key, JSON.stringify(body[key]));
      } else {
        apiFormData.append(key, body[key]);
      }
    }
  });
  return apiFormData;
};

export const postFormData = (path, formData) => {
  return new Promise((resolve, reject) => {
    api
      .post(
        `${process.env.REACT_APP_BASEURL}${path}`,
        createFormData(formData),
        getHeadersForFileUpload()
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {});
  });
};

const createMultipleFormData = (body) => {
  const apiFormData = new FormData();
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      if (body[key] instanceof Array) {
        body[key]?.forEach((i) => {
          apiFormData.append(key, i);
        })
      } else {
        apiFormData.append(key, body[key]);
      }
    }
  });
  return apiFormData;
};


export const postMultipleFormData = (path, formData) => {
  return new Promise((resolve, reject) => {
    api
      .post(
        `${process.env.REACT_APP_BASEURL}${path}`,
        createMultipleFormData(formData),
        getHeadersForFileUpload(),
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {});
  });
};

export const getApiCall = (path, data) => {
  return new Promise((resolve, reject) => {
    api
      .get(`${process.env.REACT_APP_BASEURL}${path}`, getHeaders())
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {});
  });
};

//
export const getTempApiCall = (path, data) => {
  return new Promise((resolve, reject) => {
    api
      .get(`${path}`, data)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {});
  });
};

export const postDataApi = (path, data) => {
  return new Promise((resolve, reject) => {
    api
      .post(`${process.env.REACT_APP_BASEURL}${path}`, data, getHeaders())
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {});
  });
};

export const deleteDataApi = (path, data) => {
  return new Promise((resolve, reject) => {
    const headers = getHeaders();
    api
      .delete(`${process.env.REACT_APP_BASEURL}${path}`, { ...headers, data })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};