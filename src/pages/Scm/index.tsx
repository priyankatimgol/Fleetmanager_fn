import React,{useState} from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import {Grid} from '@mui/material';
import { TbPackageImport } from "react-icons/tb";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { MdOutlineInventory } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import { PiHourglassLowFill } from "react-icons/pi";
import { FaHouseUser } from "react-icons/fa";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { setSearchData } from 'redux/actions/TaskManagmentActions';
import CardComponent from './components/Card';
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { HiTemplate } from "react-icons/hi";
import { IoMdBatteryCharging } from "react-icons/io";
import { GiMaterialsScience } from "react-icons/gi";
import { BsCalendar2Week } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import './style.css';
const SCM = () => {

  const Tiles_data = [
    { id: 1, title: "Import H1", slug: "import-h1" ,icon:<TbPackageImport />,color:'#3939ee'},
    { id: 2, title: "Import H2", slug: "H2 Import",icon:<TbPackageImport />,color:'#009e88' },
    { icon:<FaHouseUser />, id: 3, title: "Domestic H1", slug: "domestic-h1",color:'#b02ad8' },
    { icon:<FaHouseUser />, id: 4, title: "Domestic H2", slug: "domestic-h2" ,color:'#d6940a'},
    { icon:<FaHandHoldingUsd />, id: 5, title: "Purchase Order", slug: "Purchase Orders",color:'#00b5c8' },
    { icon:<FaFileInvoiceDollar />, id: 6, title: "Purchase Requisition", slug: "purchase-requisition",color:'#ea2a94'},
    { icon:<LuBrainCircuit />, id: 7, title: "Top 50 Critical Material by consumption", slug: "top-50-critical-material",color:'#009e88' },
    { icon:<HiTemplate />, id: 8, title: "Consumption Templates", slug: "Consumption Templates",color:'#3939ee' },
    { icon:<LuBrainCircuit />, id: 9, title: "441 Critical Material", slug: "441-critical-material",color:'#b02ad8' },
    { icon:<IoMdBatteryCharging />, id: 10, title: "Battery Consumption Vs Return", slug: "battery-consumption-vs-return",color:'#d6940a' },
    { icon:<IoMdBatteryCharging />, id: 11, title: "Battery Threshold", slug: "battery-threshold",color:'#ea2a94' },
    { icon:<GiMaterialsScience />, id: 12, title: "SCM Critical Material", slug: "scm-critical-material",color:'#d6940a' },
    { icon:<GiMaterialsScience />, id: 13, title: "PM Critical Material Weekly", slug: "pm-critical-material-weekly",color:'#009e88' },
    { icon:<BsCalendar2Week />, id: 14, title: "Weekly LUB Reports", slug: "weekly-lub-reports",color:'#00b5c8' },
    { icon:<BiSolidReport />, id: 15, title: "Unpredictable Failure Reports", slug: "unpredictable-failure-reports",color:'#3939ee' },
    { icon:<PiHourglassLowFill />, id: 16, title: "Slow Moving/ Non Moving", slug: "slow-moving-non-moving",color:'#b02ad8' },
    { icon:<MdOutlineInventory />, id: 17, title: "Inventory Templates", slug: "Inventory Templates",color:'#ea2a94' }
  ];
  
  const [searchText, setSearchText] = useState('');
  const [tiles_data,setTilesData]=useState(Tiles_data)
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    let searchArray = Tiles_data.filter((val) => {
      return val.title.toLowerCase().includes(event.target.value.toLowerCase())
    })

    setTilesData(searchArray)
  };
  
  
  const handleSearch = (e:any) => {
    setSearchData(e.target.value)

  
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',  
      background:"#fff",   
     
    },
    textField: {
      flex: 1,
      marginRight: 12,
    },
    iconButton: {
      padding: 10,
    },
    input: {
      flex: 1,     
      border: 'none', // Remove border    
      '& fieldset':{
        border: "1px solid #d6d6d6", 
        borderRadius: "4px",
      }
    },
  }));

  
  
  

  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={2}>
      <Grid item sm={3} lg={3}> 
      <div className={classes.root}>
      <OutlinedInput
        className={`${classes.input} smallOutlinedInput`}
        placeholder='Search Template'
        value={searchText}
        onChange={handleSearchChange}
        endAdornment={
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        }
        notched={false}  style={{ height: '40px',paddingRight:0}}
      />      
    </div>     
    </Grid>
    </Grid>     
      <Box my={2} />
      <Grid container spacing={2}>        
      {
          tiles_data.map((card,index)=> {
            return<Grid item sm={3} lg={3} key={card.id} className="custom-width"> 
            <CardComponent  key={card.id} {...{title:card.title,slug:card.slug, id:card.id,icon:card.icon,color:card.color}} />
         </Grid>
          })
        }
      </Grid>
    </div>
  )
}

export default SCM
