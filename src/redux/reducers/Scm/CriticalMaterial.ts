import {
    // SLOW_MOVING_AND_NON_MOVING_CONFIG_DATA,
    // SLOW_MOVING_AND_NON_MOVING_CONFIG_ERROR,
    // SLOW_MOVING_AND_NON_MOVING_CONFIG_PENDING,
    // SLOW_MOVING_AND_NON_MOVING_DATA,
    // SLOW_MOVING_AND_NON_MOVING_ERROR,
    // SLOW_MOVING_AND_NON_MOVING_PENDING,
    CRITICAL_MATERIAL_DATA,
    CRITICAL_MATERIAL_PENDING,
    CRITICAL_MATERIAL_ERROR,
    CRITICAL_MATERIAL_CONFIG_ERROR,
    CRITICAL_MATERIAL_CONFIG_PENDING,
    CRITICAL_MATERIAL_CONFIG_DATA,
  } from "../../../types/actions/Scm/CriticalMaterial";
  
  const INIT_STATE = {
    pmCriticalMaterialData: [],
    loader: false,
    pmCriticalMateriaConfigData: [],
    pmCriticalMateriaConfigLoader: false,
  };
  
  const CriticalMaterial = (state = INIT_STATE, action) => {
    switch (action.type) {
      case CRITICAL_MATERIAL_DATA: {
        return {
          ...state,
          pmCriticalMaterialData: action?.payload || [],
          loader: false,
        };
      }
  
      case CRITICAL_MATERIAL_ERROR: {
        return {
          ...state,
          pmCriticalMaterialData: [],
          loader: false,
        };
      }
      case CRITICAL_MATERIAL_PENDING: {
        return {
          ...state,
          pmCriticalMaterialData: [],
          loader: true,
        };
      }
  
      case CRITICAL_MATERIAL_CONFIG_DATA: {
        return {
          ...state,
          pmCriticalMateriaConfigData: action?.payload || [],
          pmCriticalMateriaConfigLoader: false,
        };
      }
  
      case CRITICAL_MATERIAL_CONFIG_ERROR: {
        return {
          ...state,
          pmCriticalMateriaConfigData: [],
          pmCriticalMateriaConfigLoader: false,
        };
      }
      case CRITICAL_MATERIAL_CONFIG_PENDING: {
        return {
          ...state,
          pmCriticalMateriaConfigData: [],
          pmCriticalMateriaConfigLoader: true,
        };
      }
  
      default:
        return state;
    }
  };
  export default CriticalMaterial;
  