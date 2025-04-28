import { getApiCall, postDataApi } from "apiServices/apiUtils";

import { fetchError, showMessage } from "./Common";
import { HANDLE_LOADER_SITE_MAPPING, SET_ROLE_NAME, SET_SEARCH_SELECTIONS, SET_SITE_MAPPING, SET_USER_MAPPING } from "types/actions/UserSiteMapping";

export const setLoaderState = (payload: any) => ({
  type: HANDLE_LOADER_SITE_MAPPING,
  payload,
});

export const setSiteMapping = (payload: any) => ({
  type: SET_SITE_MAPPING,
  payload,
});

export const setUserMapping = (payload: any) => ({
  type: SET_USER_MAPPING,
  payload,
});

export const setSelectionData = (payload: any) => ({
    type: SET_SEARCH_SELECTIONS,
    payload,
  });
export const setRoleName = (payload: any) => ({
    type: SET_ROLE_NAME,
    payload,
  });
export const getUserMappingListing = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/GetAllUserSiteMapping`)
      .then((response) => {
        dispatch(setUserMapping(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserSiteMappings = (payload) => {
  return (dispatch) => {
    dispatch(setLoaderState(true));
    dispatch(setSiteMapping([]));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/GetSiteByUser?userName=${payload?.user}&employeeCode=${payload?.employeeCode}&countryName=${payload?.country||''}&stateName=${payload?.state||''}&areaName=${payload?.area||''}&siteName=${payload?.site||''}`)
      .then((response) => {
        dispatch(setSiteMapping(response?.data));
        dispatch(setLoaderState(false));
      })
      .catch((error) => {
        dispatch(setLoaderState(false));
        console.log(error);
      });
  };
};

export const getCountryData = () => {
    return (dispatch, getState) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetScCountryOmsPbi`)
        .then((response) => {
            const otherData = getState()?.UserSiteMapping?.searchAbleSelections;
          dispatch(setSelectionData({...otherData, country: response?.data || []}));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getStateData = (country) => {
    return (dispatch, getState) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetStateByCountryCode?countryCode=${country}`)
        .then((response) => {
            const otherData = getState()?.UserSiteMapping?.searchAbleSelections;
          dispatch(setSelectionData({...otherData, state: response?.data || []}));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getSiteData = (area) => {
    return (dispatch, getState) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetSiteByAreaCode?areaCode=${area}`)
        .then((response) => {
            const otherData = getState()?.UserSiteMapping?.searchAbleSelections;
          dispatch(setSelectionData({...otherData, site: response?.data || []}));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getAreaData = (state) => {
    return (dispatch, getState) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetAreaByStateCode?stateCode=${state}`)
        .then((response) => {
            const otherData = getState()?.UserSiteMapping?.searchAbleSelections;
          dispatch(setSelectionData({...otherData, area: response?.data || []}));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getUpdateUserSiteMapping = (payload, userName: string, refreshComponent) => {
    
    return (dispatch) => {
      postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/UpdateUserSite?userName=${userName}`, payload)
        .then((response) => {
          if (response?.status) {
            dispatch(
              showMessage(response?.message || "Updated the user site mapping successfully")
            );
            const responseData = response?.data[0]
            const { username: user, employeeCode } = responseData;
            const result = {
              user,
              employeeCode
          };
            dispatch(getUserSiteMappings(result))
            dispatch(getUserMappingListing());
            dispatch(setSiteMapping([]))
            refreshComponent();
          } else {
            dispatch(fetchError(response?.message || "Error"));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  export const getRoleName = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/GetAllRoles`)
        .then((response) => {
            
            dispatch(setRoleName(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
