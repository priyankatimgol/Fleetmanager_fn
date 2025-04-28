import { GET_KPI_BOXES,REQUEST_CALL,GET_CONSMPTION_BY_PLANT_YEAR,COMPARE_CONSUMPTION_QUANTITY,CONSUMPTION_AMOUNT_FOR_LAST_THREE,CONSUMPTION_AMOUNT_FOR_CURRENCY,TOP10_CONSUMPTION_VALUE,GET_CONSUMPTION,GET_COLUMN_CONFIG,GET_CONSUMPTION_QUARTER} from "types/actions/Scm/TopFifty/index";
    

const INIT_STATE = {
    KPI_tiles:[],
    TotalConsumptionForYear:[],
    CompareConsumptionQuantity:[],
    ConsumptionAmountForLastThree:[],
    ConsumptionAmountForCurrentFy:[],
    Top10ConsumptionValue:[],
    Consumption:[],
    ColumnDef:[],
    ConsumptionForQuarter:[],
    columnLoading:true,
    loading: true
};

const TopfiftyReducer = (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case REQUEST_CALL: {
            return {
                ...state,
                loading:true,
              
            }
        };
        case GET_KPI_BOXES: {
            return {
                ...state,
                loading: false,
                KPI_tiles: action?.payload
            }
        };
        
        case GET_CONSMPTION_BY_PLANT_YEAR: {
            return {
                ...state,
                loading: false,
                TotalConsumptionForYear: action?.payload
            }
        };
        //
        case COMPARE_CONSUMPTION_QUANTITY: {
            return {
                ...state,
                loading: false,
                CompareConsumptionQuantity: action?.payload
            }
        };
        //CONSUMPTION_AMOUNT_FOR_LAST_THREE
        case CONSUMPTION_AMOUNT_FOR_LAST_THREE: {
            return {
                ...state,
                loading: false,
                ConsumptionAmountForLastThree: action?.payload
            }
        };
        //CONSUMPTION_AMOUNT_FOR_CURRENCY
        case CONSUMPTION_AMOUNT_FOR_CURRENCY: {
            return {
                ...state,
                loading: false,
                ConsumptionAmountForCurrentFy: action?.payload
            }
        };
        //TOP10_CONSUMPTION_VALUE
        case TOP10_CONSUMPTION_VALUE: {
            return {
                ...state,
                loading: false,
                Top10ConsumptionValue: action?.payload
            }
        };
        
        case GET_CONSUMPTION:{
            return {
                ...state,
                loading: false,
                Consumption: action?.payload
            }
        }
        //GET_COLUMN_CONFIG
        case GET_COLUMN_CONFIG:{
            return {
                ...state,
                loading: false,
                ColumnDef: action?.payload
            }
        }

        //GET_CONSUMPTION_QUARTER
        case GET_CONSUMPTION_QUARTER:{
            return {
                ...state,
                loading: false,
                ConsumptionForQuarter: action?.payload
            }
        }
     default:
            return state;
    }
};
export default TopfiftyReducer;

