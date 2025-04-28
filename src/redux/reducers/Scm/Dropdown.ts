import { GETMATERIAL, GETMATERIALCATEGORY,GETMATERIALEMPTY,GETREQUEST} from "../../../types/actions/Scm/DropDown";
    

const INIT_STATE = {
    MaterialCategoryList:[],
    MaterialList:[],
    dropdownLoading: null
};

const MaterialDropdownMaster = (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case GETMATERIALCATEGORY: {
            return {
                ...state,
                MaterialCategoryList: action?.payload
            }
        };

        case GETMATERIAL: {
            return {
                ...state,
                dropdownLoading: false,
                MaterialList: action?.payload
            }
        };
        case GETMATERIALEMPTY: {
            return {
                ...state,
                MaterialList: []
            }
        };

        case GETREQUEST :{
            return {
                ...state,
                dropdownLoading: true
            }
        }
        
     default:
            return state;
    }
};
export default MaterialDropdownMaster;
