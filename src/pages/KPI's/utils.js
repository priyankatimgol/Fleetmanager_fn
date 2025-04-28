import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PowerIconGreen from '../../assets/icon/power.svg'
import PowerIconYellow from '../../assets/icon/power_Yellow.svg'
import PowerIconLightGreen from '../../assets/icon/power_Green.svg'

export const utilData = {
    section1 : {
        'Total Generation': {
            unit:'GHw',
            icon: PowerIconGreen,
            color:'#36A98A',
        },
        'Current Active Power': {
            unit:'Kw',
            icon: PowerIconYellow,
            color:'#FFBF00',
        },
        'Reactive Power': {
            unit:'Kvar',
            icon: PowerIconLightGreen,
            color:'#69BC4B',
        },
     
    },
    section2 : {
        turbine_actions:[
            {
                color:'#69BC4B',
                name:'2 Operation'
            },
            {
                color:'#FF0000',
                name:'2 Down'
            },
            {
                color:'#FFBF00',
                name:'2 No comm'
            },
            {
                color:'#FFF ',
                name:'32 Total WTG'
            },
            {
                color:'#306BFF',
                name:'3 Manual Stop'
            },
        ],
        listing:[
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },   
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },       

            {             
                name:'CH8765',
                color:'suzlonGreen',    
            },
            {             
                name:'AB8765',
                color:'blue',                   
            },
            {             
                name:'CH8765',
                 
            },
            {             
                name:'AB8765',
                color:'lightGreen',   
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },


            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'KJ8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'AB8765',                  
            },
            {             
                name:'CH8765',                  
            },
            {             
                name:'KJ8765',                  
            },  {             
                name:'AB8765',                  
            },
            
        ],
    }
}

export const TURBINE_API = "Turbine"

export const APIParams = {
    "Total Generation" : "TotalGeneration", 
    "Current Active Power" : "CurrentActivePower", 
    "Reactive Power" : "ReactivePower",
}

export const MTBFData = [
    {
        Id: 1,
        Value: 495.56,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S111",
        KPIType:"MTBF"
    },
    {
        Id: 2,
        Value: 397.20,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S120",
        KPIType: "MTBF"
    },
    {
        Id: 3,
        Value: 0,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S128",
        KPIType: "MTBF"
    },
    {
        Id: 4,
        Value: 1750.72,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S133",
        KPIType: "MTBF"
    },
    {
        Id: 5,
        Value: 314.73,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S52",
        KPIType: "MTBF"
    },
    {
        Id: 6,
        Value: 283.36,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S64",
        KPIType: "MTBF"
    },
    {
        Id: 7,
        Value: 629.05,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S64 Mark II",
        KPIType: "MTBF"
    },
    {
        Id: 8,
        Value: 256.88,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S66",
        KPIType: "MTBF"
    },
    {
        Id: 9,
        Value: 361.93,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S66 Mark II",
        KPIType: "MTBF"
    },
    {
        Id: 10,
        Value: 187.21,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S70",
        KPIType: "MTBF"
    },
    {
        Id: 11,
        Value: 232.64,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S82",
        KPIType: "MTBF"
    },
    {
        Id: 12,
        Value: 0,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S87",
        KPIType: "MTBF"
    },
    {
        Id: 13,
        Value: 338.82,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S88",
        KPIType: "MTBF"
    },
    {
        Id: 14,
        Value: 369.97,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S95",
        KPIType: "MTBF"
    },
    {
        Id: 15,
        Value: 453.84,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S97",
        KPIType: "MTBF"
    },
]

export const MTTRData = [
    {
        Id: 1,
        Value: 6.21,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S111",
        KPIType:"MTTR"
    },
    {
        Id: 2,
        Value: 1.57,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S120",
        KPIType: "MTTR"
    },
    {
        Id: 3,
        Value: 0,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S128",
        KPIType: "MTTR"
    },
    {
        Id: 4,
        Value: 17.60,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S133",
        KPIType: "MTTR"
    },
    {
        Id: 5,
        Value: 6.46,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S52",
        KPIType: "MTTR"
    },
    {
        Id: 6,
        Value: 6.61,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S64",
        KPIType: "MTTR"
    },
    {
        Id: 7,
        Value: 1.51,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S64 Mark II",
        KPIType: "MTTR"
    },
    {
        Id: 8,
        Value: 4.35,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S66",
        KPIType: "MTTR"
    },
    {
        Id: 9,
        Value: 4.95,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S66 Mark II",
        KPIType: "MTTR"
    },
    {
        Id: 10,
        Value: 6.06,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S70",
        KPIType: "MTTR"
    },
    {
        Id: 11,
        Value: 8.15,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S82",
        KPIType: "MTTR"
    },
    {
        Id: 12,
        Value: 0,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S87",
        KPIType: "MTTR"
    },
    {
        Id: 13,
        Value: 6.04,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S88",
        KPIType: "MTTR"
    },
    {
        Id: 14,
        Value: 5.69,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S95",
        KPIType: "MTTR"
    },
    {
        Id: 15,
        Value: 4.84,
        ColName: "26-10-2023",
        Sequence: 1,
        FilterType: "S97",
        KPIType: "MTTR"
    },
]