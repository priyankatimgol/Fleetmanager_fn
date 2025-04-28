import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import "./styles.css";
import MapChart from "./components/MapChart";
import { Box, Button, Grid } from "@mui/material";
import StateMap from "./components/StateMaps/StateMap";
import GridPage from "./components/GridPage/GridPage";
import GridIcon from '../../assets/icon/grid-icon.svg';
import MapIcon from '../../assets/icon/map-Icon.svg';
import { useDispatch, useSelector } from "react-redux";
import { GetMapTableDetails } from "redux/actions/IBLevel";

function Map() {
  const dispatch = useDispatch()
  const [stateName, setStateName] = useState("India");
  const [gridPage, setGridPage] = useState(false);

  useEffect(() => {
    dispatch(GetMapTableDetails())
  }, [])

  return (
    <Box sx={{ position: 'relative' }} >
      <Button onClick={() => setGridPage(value => !value)} sx={{ minWidth: 'auto', position: 'absolute', top: 0, right: 0 }}>{gridPage ? <img src={MapIcon} alt="" /> : <img src={GridIcon} alt="" />}</Button>
      {stateName === "India" && gridPage === false && (<MapChart setStateName={setStateName} />)}
      {stateName !== "India" && gridPage === false && (<StateMap selectedState={stateName} setStateName={setStateName} />)}
      {gridPage === true && (<GridPage />)}
    </Box>

  );
}

export default Map;
