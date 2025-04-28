import { ROLE_DROPDOWN, SHIFT_CYCLE_DROPDOWN, ERROR_DROPDOWN, FEEDER_DROPDOWN, TERBINE_DROPDOWN,
    ACTIVITY_DROPDOWN,PASS_USAGE_DROPDOWN,GRID_REASON_DROPDOWN, PASS_USAGEBY_DROPDOWN, 
    ISSUE_DESC_DROPDOWN, SHIFT_HANDED_DROPDOWN, SHIFT_TAKEN_DROPDOWN,CLOSURE_DROPDOWN, WTGCLOSURE_DROPDOWN, EMPCODE_DROPDOWN,
    GETMAINSITES, GETALLSTATES, GETALLAREAS, GETSITES, SCHEDULE_TURBINE, LOGBOOKCONFIG, BREAKDOWNCATEGORY, MANUALTURBINEDROP, TURBINEVALIDATION, SCHEDULEACTCARD, DROPDOWNLOADING} from "../../../types/actions/LogbookActions/DropdownMaster";
    

const INIT_STATE = {
    shiftCycleListing: [],
    roleListing: [],
    terbineListing: [],
    errorListing: [],
    passUsageListing: [],
    scheduleActCard: [],
    dropdownLoading: false
};

const DropdownMaster = (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case SHIFT_CYCLE_DROPDOWN: {
            return {
                ...state,
                shiftCycleListing: action?.payload
            }
        };
        case ROLE_DROPDOWN: {
            return {
                ...state,
                roleListing: action?.payload
            }
        };
        case TERBINE_DROPDOWN: {
            return {
                ...state,
                terbineListing: action?.payload
            }
        };

        case SCHEDULE_TURBINE: {
            return {
                ...state,
                scheduleTerbineListing: action?.payload
            }
        };
        case ERROR_DROPDOWN: {
            return {
                ...state,
                errorListing: action?.payload
            }
        };
        case PASS_USAGE_DROPDOWN: {
            return {
                ...state,
                passUsageListing: action?.payload
            }
        };
        case PASS_USAGEBY_DROPDOWN: {
            return {
                ...state,
                passUsageByListing: action?.payload
            }
        };
        case ACTIVITY_DROPDOWN: {
            return {
                ...state,
                activityListing: action?.payload
            }
        };
        case FEEDER_DROPDOWN: {
            return {
                ...state,
                feederListing: action?.payload
            }
        };
        case GRID_REASON_DROPDOWN: {
            return {
                ...state,
                gridResonListing: action?.payload
            }
        };
        case ISSUE_DESC_DROPDOWN: {
            return {
                ...state,
                issueDescListing: action?.payload
            }
        };
        case SHIFT_HANDED_DROPDOWN: {
            return {
                ...state,
                shiftHandedListing: action?.payload
            }
        };
        case SHIFT_TAKEN_DROPDOWN: {
            return {
                ...state,
                shiftTakenListing: action?.payload
            }
        };
        case WTGCLOSURE_DROPDOWN: {
            return {
                ...state,
                wtgClosureListing: action?.payload
            }
        };
        case CLOSURE_DROPDOWN: {
            return {
                ...state,
                closureListing: action?.payload
            }
        };

        case EMPCODE_DROPDOWN: {
            return {
                ...state,
                empDropdown: action?.payload !== null ? action?.payload : []
            }
        }
        case GETMAINSITES: {
            return {
                ...state,
                getMainSites: action?.payload !== null ? action?.payload : []
            }
        }
        case GETALLSTATES: {
            return {
                ...state,
                stateListing: action?.payload
            }
        };
        case GETALLAREAS: {
            return {
                ...state,
                areaListing: action?.payload
            }
        }
        case GETSITES: {
            return {
                ...state,
                siteListing: action?.payload
            }
        };
        case LOGBOOKCONFIG: {
            return {
                ...state,
                logbookConfig: action?.payload
            }
        }
        case BREAKDOWNCATEGORY: {
            return {
                ...state,
                breakdownCategory: action?.payload
            }
        }

        case MANUALTURBINEDROP: {
            return {
                ...state,
                manualDrop: action?.payload
            }
        }
        case TURBINEVALIDATION: {
            return {
                ...state,
                turbineValidation: action?.payload
            }
        }
        case SCHEDULEACTCARD: {
            return {
                ...state,
                scheduleActCard: action?.payload
            }
        }
        case DROPDOWNLOADING: {
            return {
                ...state,
                dropdownLoading:action?.payload
            }
        };

        default:
            return state;
    }
};
export default DropdownMaster;
