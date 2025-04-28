import {
  getApiCall,
   
  
  postDataApi,
} from "../../../apiServices/apiUtils";
import { GETMATERIALCATEGORY, GETMATERIAL ,GETMATERIALEMPTY,GETREQUEST} from "types/actions/Scm/DropDown";

export const setMaterialCategory = (payload: any) => ({
  type: GETMATERIALCATEGORY,
  payload: payload,
});

export const setMaterialType = (payload: any) => ({
  type: GETMATERIAL,
  payload: payload,
});

export const setMaterialTypeEmpty = () => ({
  type: GETMATERIALEMPTY,
   
});

export const setMaterialTypeLoading = () => ({
  type: GETREQUEST,
   
});


export const getMaterialCategory = () => {
  return (dispatch) => {
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getMaterials?FilterType=Material category`
    )
      .then((response) => {
        const parsedData = JSON.parse(response.responseObject);
        
        console.log("response", JSON.parse(parsedData.results));
        const results = JSON.parse(parsedData.results)
        dispatch(setMaterialCategory(results));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMaterialType = (category,codeFilter="") => {
  return (dispatch) => {
    dispatch(setMaterialTypeLoading())
    if(codeFilter !=""){
       
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/SCM/getMaterials?FilterType=Material&Category=${category}&SearchText=${codeFilter}`
      )
        .then((response) => {
          const parsedData = JSON.parse(response.responseObject);
          console.log("response", JSON.parse(parsedData.results));
          const results = JSON.parse(parsedData.results)
         dispatch(setMaterialType( results)); // Dispatching action with parsed data
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      dispatch(setMaterialTypeEmpty())
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/SCM/getMaterials?FilterType=Material&Category=${category}`
      )
        .then((response) => {
          const parsedData = JSON.parse(response.responseObject);
          console.log("response", JSON.parse(parsedData.results));
          const results = JSON.parse(parsedData.results)
         dispatch(setMaterialType( results)); // Dispatching action with parsed data
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  };
};

