import React,{useState} from 'react'
 
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { setSearchData } from 'redux/actions/TaskManagmentActions';
import { Typography } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

const CardComponent = ({title,slug,id,icon,color}) => {
    const useStyles = makeStyles((theme) => ({
        
        // Card:{
        //   boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
        //    fontSize:"1.5rem",                  
        //     padding:'15px 12px',
           
        //     background:'#fcfcfc',
            
        //     borderRadius: '5px',
        //     transition: 'box-shadow 0.3s ease-in-out',
        //     display: 'flex',
        //     alignItems: 'center',
        //     fontWeight:600,
        //     color:'#505050',
        //     minHeight:'77px',           
        //     '& span.icon':{             
        //       color: "white",
        //       padding: "6px",
        //       width: "40px",
        //       height: "40px",
        //       borderRadius: "4px",
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center"
        //     },      
        //    '&:hover':{
        //        boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
        //       cursor:'pointer',
        //       background: '#ececec',
        //     },
        //     '& h5':{
        //         fontWeight:600,
        //         fontSize:'.9rem',
        //         marginLeft:'15px',
        //         textAlign:'left',               
        //         paddingBottom: "10px",
        //     },
        //     '& .borderLine':{
        //       borderBottom: "2px solid",
        //       display: "block",
        //       width: "80px",
        //       marginLeft: "15px",
        //       borderRadius:'10px',
            
        //     },
        Card:{
          boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
           fontSize:"1.5rem",                  
            padding:'13px 12px',
           
            background:'#fcfcfc',
            
            borderRadius: '5px',
            transition: 'box-shadow 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            fontWeight:600,
            color:'#505050',
          
            flexDirection:'column',          
            '& span.icon':{             
              color: "white",
              padding: "6px",
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },      
           '&:hover':{
               boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
              cursor:'pointer',
              background: '#ececec',
            },
            '& h5':{
                fontWeight:600,
                fontSize:'.9rem',
                margintop:'10px',
                textAlign:'center',               
                padding: "5px",
            },
            '& .borderLine':{
              borderBottom: "2px solid",
              display: "block",
              width: "80px",
              margin:'0 auto',
              borderRadius:'10px',
            
            },
        }
      }));
    ///scm/:slug
      const classes = useStyles()
      const navigate = useNavigate() 

      const routeToGrid = (title:string)=>{

        let url = title.toLowerCase().replace(/\s+/g, '-')
        navigate(`/scm/templates/${url}`)

        console.log('navigate',url)
      }

  return (
    // <Box  onClick={()=>routeToGrid(slug)} className={classes.Card}>     
    //  <span className='icon' style={{backgroundColor: `${color}`}}>{icon}</span>
    //  <Box>
    //  <Typography variant='h4' align='center' component='h5'>{title}</Typography>
    //  <span className='borderLine' style={{borderColor: `${color}`}}></span></Box>   
     
    // </Box>
    <Box  onClick={()=>routeToGrid(slug)} className={`${classes.Card} card-height`}>     
    <span className='icon' style={{backgroundColor: `${color}`}}>{icon}</span>
    <Box>
    <Typography variant='h4' align='center' component='h5'>{title}</Typography>
    <span className='borderLine' style={{borderColor: `${color}`}}></span></Box>   
    
   </Box>
  )
}

export default CardComponent
