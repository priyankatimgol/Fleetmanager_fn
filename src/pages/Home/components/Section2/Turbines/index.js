import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import TubineHeader from "./components/tubineHeader";
import TurbinCard from "./components/turbinCard";

function Turbines({ data }) {
  return (
    <div className="turbin">
        <TubineHeader data={data}/>
         <TurbinCard data={data}/>
    
    </div>
  );
}

export default Turbines;
