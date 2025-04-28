import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import india from "../utils/in-states-topo.json";
import { Box, Divider, Tooltip } from "@mui/material";
import { StateData } from "../utils/constants";
import AreaHoverComp from "./Hover-Component/AreaHoverComp";
import StateHoverComp from "./Hover-Component/StateHoverComp";
import { useSelector } from "react-redux";

const DEFAULT_COLOR = "#EEE";

const markers = [
  {
    id: "MH",
    name: "Satara",
    cords: [74.000938, 17.691401],
    fill: "#800080",
  },
  {
    id: "MH",
    name: "Pune",
    cords: [73.856255, 18.516726],
    fill: "#800080",
  },
  {
    id: "GJ",
    name: "Ahemdabad",
    cords: [72.585022, 23.033863],
    fill: "#FFA500",
  },
  {
    id: "GJ",
    name: "Surat",
    cords: [72.831062, 21.17024],
    fill: "#FFA500",
  },
  {
    id: "GJ",
    name: "Rajkot",
    cords: [70.800705, 22.308155],
    fill: "#FFA500",
  },
  {
    id: "TN",
    name: "Chennai",
    cords: [80.237617, 13.067439],
    fill: "#964B00",
  },
  {
    id: "KA",
    name: "Udupi",
    cords: [74.742142, 13.340881],
    fill: "#127f12",
  },
  {
    id: "TN",
    name: "Tiruchirappalli",
    cords: [78.686676, 10.79319],
    fill: "#964B00",
  },
  {
    id: "TN",
    name: "Ampara",
    cords: [81.6747, 7.3018],
    fill: "#127f12",
  },
  {
    id: "TN",
    name: "Kandy",
    cords: [80.6337, 7.2906],
    fill: "#127f12",
  },
];

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

const IndiaMap = ({ setStateName }) => {
  const geoUrl = india;
  const state = useSelector((state) => state);
  const mapStates = state?.IBLevel?.mapStates ?? [];
  const mapAreas = state?.IBLevel?.mapAreas ?? [];
  const [data, setData] = useState(StateData);
  const [content, setContent] = useState("");
  const [stateData, setStateData] = useState({})

  return (
    <div>
      <Tooltip title={content} followCursor placement="top">
        <Box className="map-wrepper" sx={{}}>
          <ComposableMap
            height={1000}
            projection="geoMercator"
            projectionConfig={{
              center: [83, 16], // Change these coordinates for a different map center
              scale: 1290, // Adjust this value to control zoom level
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const current = data.find((s) => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      // fill={current ? current.color : DEFAULT_COLOR}
                      fill="transparent"
                      // fillOpacity="0.05"
                      onMouseEnter={() => {
                        const { name } = geo.properties;
                        const state = data.find((s) => s.id === geo.id);
                        if(state.name === "GJ - Saurashtra") {
                            const Guj_kutch ='GJ - Kutch';
                            var kutchDetails = mapStates?.find((d)=>d.stateName === Guj_kutch)
                            var stateDetails = mapStates?.find((d)=>d.stateName === state.name)
                            
                        } else {
                          var stateDetails = mapStates?.find((d)=>d.stateName === state.name)
                        }
                        setContent(
                          <div>
                            {state.name}
                            <Divider sx={{ borderColor: "#000" }} />
                            <StateHoverComp data={stateDetails?.stateObj} kutchData={kutchDetails?.stateObj}/>
                          </div>
                        );
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                      onClick={() => {
                        const { name } = geo.properties;
                        setStateName(geo);
                      }}
                      style={geographyStyle}
                      stroke="#fff"
                      strokeWidth={1} // Adjust the stroke width as needed
                    />
                  );
                })
              }
            </Geographies>
            {mapAreas &&  mapAreas?.map((mark) => (
              <Marker
                key={mark.areaName}
                coordinates={[parseInt(mark.longitude), parseInt(mark.latitude)]}
                onMouseEnter={() => {
                  setContent(
                    <div>
                      {mark.areaName}
                      <Divider sx={{ borderColor: "#000" }} />
                      <AreaHoverComp data={mark.areaObj}/>
                    </div>
                  );
                }}
                onMouseLeave={() => {
                  setContent("");
                }}
              >
                <circle r={6} fill='#800080' />
                <circle r={4} fill='#800080' stroke="#fff" strokeWidth={2} />
              </Marker>
            ))}
          </ComposableMap>
        </Box>
      </Tooltip>
    </div>
  );
};

export default IndiaMap;
