import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PowerIconGreen from '../../assets/icon/power.svg'
import PowerIconYellow from '../../assets/icon/power_Yellow.svg'
import PowerIconLightGreen from '../../assets/icon/power_Green.svg'
export const data = {
    section1 : [
        // {
        //     name: 'Wind Speed',
        //     caption: '49',
        //     unit:'m/s',
        //     icon: PowerIconGreen,
        //     color:'#36A98A',
        // },
        {
            name: 'Total Generation',
            caption: '117',
            unit:'MHw',
            icon: PowerIconGreen,
            color:'#36A98A',
        },
        {
            name: 'Current Active Power',
            caption: '1500',
            color:'red',
            unit:'Kw',
            icon: PowerIconYellow,
            color:'#FFBF00',
        },
        {
            name: 'Reactive Power',
            caption: '100',
            unit:'Kvar',
            icon: PowerIconLightGreen,
            color:'#69BC4B',
        },
     
    ],
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

export const KPIdata = {
    siteCharge:[
        {
            name: 'Site To Do List',
            caption: 'Protect',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'Digital logbook & Shift HOTO',
            caption: 'IEC IIA IIIS / S',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'Special Project Inspection',
            caption: 'Protect',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'Resource Planning',
            caption: '12 S/P',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'Work Order Management',
            caption: '12 S/P',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'PM Planning',
            caption: '12 S/P',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
        {
            name: 'Lubrication Planning',
            caption: '12 S/P',
            icon: <ArticleOutlinedIcon fontSize='small'/>
        },
    ]
}
export const Ib_Top_Kpi = {
    KPI:[
        // {
        //     name: 'CAMA (%)-H1',
        //     value:'80%',
        //     targetVal: '90%',
        //     greenIcon:"greenIcon",
        // },
        // {
        //     name: 'CAMA (%)-H2',
        //     value:'90%',
        //     targetVal: '70%',
        //     redIcon:"redIcon",
        // },
        // {
        //     name: 'WTG MH&MP-H1',
        //     value:'80%',
        //     targetVal: '90%',
        //     redIcon:"redIcon",
        // },
        // {
        //     name: 'WTG MH&MP-H2',
        //     value:'98%',
        //     targetVal: '78%',
        //     greenIcon:"greenIcon",
        // },
        {
            name: 'WTGs & DP',
            value:'60%',
            targetVal: '70%',
            greenIcon:"redIcon",
        },
        // {
        //     name: 'MTBF',
        //     value:'78%',
        //     targetVal: '69%',
        //      greenIcon:"greenIcon",
        // },
        // {
        //     name: 'MTTR',
        //     value:'87%',
        //     targetVal: '64%',
        //      redIcon:"greenIcon",
        // },
        
    ]
}
