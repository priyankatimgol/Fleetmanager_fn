import {CREATE_EMPLOYEES, GET_ALL_EMPLOYEES, SELECTEDEMP } from "../../../types/actions/LogbookActions/EmployeeDetails";

const INIT_STATE = {
    employeeListing: [],
    employees:{},
    selectedEmployee:{}
};

const EmployeeDetails = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES: {
            return {
                ...state,
                employeeListing: action?.payload?.data
                
            }
        };
        case CREATE_EMPLOYEES: {
            return {
                ...state,
            }
        };
        case SELECTEDEMP: {
            return {
                ...state,
                selectedEmployee:action?.payload
            }
        }
        default:
            return state;
    }
};
export default EmployeeDetails;
