import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Box, Button, Divider, Tooltip } from "@mui/material";
import BackIcon from "../../../../assets/icon/back-Icon.svg";

import AN from "../../utils/StateJson/andamannicobarislands.json";
import AP from "../../utils/StateJson/andhrapradesh.json";
import AR from "../../utils/StateJson/arunachalpradesh.json";
import AS from "../../utils/StateJson/assam.json";
import BH from "../../utils/StateJson/bihar.json";
import CH from "../../utils/StateJson/chandigarh.json";
import CT from "../../utils/StateJson/chhattisgarh.json";
import DL from "../../utils/StateJson/delhi.json";
import DN from "../../utils/StateJson/dnh-and-dd.json";
import GA from "../../utils/StateJson/goa.json";
import GJ from "../../utils/StateJson/gujarat.json";
import HR from "../../utils/StateJson/haryana.json";
import HP from "../../utils/StateJson/himachalpradesh.json";
import JH from "../../utils/StateJson/jharkhand.json";
import JK from "../../utils/StateJson/jammukashmir.json";
import KA from "../../utils/StateJson/karnataka.json";
import KR from "../../utils/StateJson/kerala.json";
import LA from "../../utils/StateJson/ladakh.json";
import LD from "../../utils/StateJson/lakshadweep.json";
import MP from "../../utils/StateJson/madhyapradesh.json";
import MH from "../../utils/StateJson/maharashtra.json";
import MN from "../../utils/StateJson/manipur.json";
import ML from "../../utils/StateJson/meghalaya.json";
import MZ from "../../utils/StateJson/mizoram.json";
import NL from "../../utils/StateJson/nagaland.json";
import OD from "../../utils/StateJson/odisha.json";
import PY from "../../utils/StateJson/puducherry.json";
import PB from "../../utils/StateJson/punjab.json";
import RJ from "../../utils/StateJson/rajasthan.json";
import SK from "../../utils/StateJson/sikkim.json";
import TN from "../../utils/StateJson/tamilnadu.json";
import TS from "../../utils/StateJson/telangana.json";
import TR from "../../utils/StateJson/tripura.json";
import UK from "../../utils/StateJson/uttarakhand.json";
import UP from "../../utils/StateJson/uttarpradesh.json";
import WB from "../../utils/StateJson/westbengal.json";
import SL from "../../utils/lka.topo.json";
import AreaHoverComp from "../Hover-Component/AreaHoverComp";
import { useSelector } from "react-redux";
import { StateData } from "pages/IndiaMap/utils/constants";


const StateMap = ({ selectedState, setStateName }) => {
  const state = useSelector((state) => state);
  // const { id, properties } = selectedState;
  const [properties, setProperties] = useState(StateData.find((s) => s.id === selectedState.id))
  const mapAreas = state?.IBLevel?.mapAreas ?? [];

  useEffect(() => {
    const state = StateData.find((s) => s.id === selectedState.id);
    // setProperties(state)
    // if(state.name === "GJ - Saurashtra") {
    //     const Guj_kutch ='GJ - Kutch';
    //     var kutchDetails = mapStates?.find((d)=>d.stateName === Guj_kutch)
    //     var stateDetails = mapStates?.find((d)=>d.stateName === state.name)

    // } else {
    //   var stateDetails = mapStates?.find((d)=>d.stateName === state.name)
    // }
  }, [selectedState.id, properties])

  const [geoUrl, setGeoUrl] = useState();
  const [centerMap, setCenterMap] = useState([79, 30]);
  const [scaleMap, setScaleMap] = useState(1400);
  const [stateColor, setStateColor] = useState();
  const [marker, setMarker] = useState([]);
  const [fill, setFill] = useState();
  const [siteContent, setSiteContent] = useState("");

  const filterMarkers = (stateName) => {
    if (stateName === "GJ - Saurashtra") {
      const Guj_kutch = 'GJ - Kutch';
      const kutchDetails = mapAreas.filter((data) => data.stateName === Guj_kutch)
      const saurashtraDetails = mapAreas.filter((data) => data.stateName === stateName)
      const mergeStateDetails = saurashtraDetails.concat(kutchDetails)
      return mergeStateDetails;
    } else {
      const filterData = mapAreas.filter((data) => data?.stateName === stateName)
      return filterData;
    }
  };

  const stateGeoUrl = () => {
    if (properties.name === "Andaman & Nicobar Island") {
      setGeoUrl(AN);
      setScaleMap(1000);
      setCenterMap([93, 10]);
      setStateColor("#95aae2");
      setMarker(filterMarkers(properties.name));
      setFill("#127f12");
    } else if (properties.name === "Andhra Pradesh") {
      setGeoUrl(AP);
      setScaleMap(4000);
      setCenterMap([80, 16]);
      setStateColor("#ce95b6");
      setMarker(filterMarkers(properties.name));
      setFill("#bf2b7f");
    } else if (properties.name === "Arunachal Pradesh") {
      setGeoUrl(AR);
      setScaleMap(6000);
      setCenterMap([94.5, 28]);
      setStateColor("#95aae2");
      setMarker(filterMarkers(properties.name));
      setFill("#2e5ca5");
    } else if (properties.name === "Assam") {
      setGeoUrl(AS);
      setScaleMap(6050);
      setCenterMap([92.9, 26]);
      setStateColor("#e6c5b5");
      setMarker(filterMarkers(properties.name));
      setFill("#d34e10");
    } else if (properties.name === "Bihar") {
      setGeoUrl(BH);
      setScaleMap(7000);
      setCenterMap([85.8, 25.7]);
      setStateColor("#9dbcaa");
      setMarker(filterMarkers(properties.name));
      setFill("#127f12");
    } else if (properties.name === "Chhattisgarh") {
      setGeoUrl(CT);
      setScaleMap(4400);
      setCenterMap([82, 21]);
      setStateColor("#90e7e2");
      setMarker(filterMarkers(properties.name));
      setFill("#13847d");
    } else if (properties.name === "NCT of Delhi") {
      setGeoUrl(DL);
      setScaleMap(48000);
      setCenterMap([77.15, 28.63]);
      setStateColor("#d2b48c");
      setMarker(filterMarkers(properties.name));
      setFill("#7a521d");
    } else if (properties.name === "Goa") {
      setGeoUrl(GA);
      setScaleMap(32000);
      setCenterMap([74.1, 15.35]);
      setStateColor("#e0bbad");
      setMarker(filterMarkers(properties.name));
      setFill("#d14410");
    } else if (properties.name === "GJ - Saurashtra") {
      setGeoUrl(GJ);
      setScaleMap(5300);
      setCenterMap([71.5, 22.4]);
      setStateColor("#ffeaab");
      setMarker(filterMarkers(properties.name));
      setFill("#c19007");
    } else if (properties.name === "Haryana") {
      setGeoUrl(HR);
      setScaleMap(7700);
      setCenterMap([76.3, 29.2]);
      setStateColor("#b5e498");
      setMarker(filterMarkers(properties.name));
      setFill("#4d9b1d");
    } else if (properties.name === "Himachal Pradesh") {
      setGeoUrl(HP);
      setScaleMap(8000);
      setCenterMap([77.4, 31.8]);
      setStateColor("#e3d3d3");
      setMarker(filterMarkers(properties.name));
      setFill("#d31b1b");
    } else if (properties.name === "Jammu & Kashmir") {
      setGeoUrl(JK);
      setScaleMap(7000);
      setCenterMap([75.3, 33.6]);
      setStateColor("#e98fa5");
      setMarker(filterMarkers(properties.name));
      setFill("#c62148");
    } else if (properties.name === "Jharkhand") {
      setGeoUrl(JH);
      setScaleMap(7000);
      setCenterMap([85.7, 23.6]);
      setStateColor("#D3D3D3");
      setMarker(filterMarkers(properties.name));
      setFill("#6b6464");
    } else if (properties.name === "Karnataka") {
      setGeoUrl(KA);
      setScaleMap(4100);
      setCenterMap([76.5, 15]);
      setStateColor("#00800082");
      setMarker(filterMarkers(properties.name));
      setFill("#127f12");
    } else if (properties.name === "Kerala") {
      setGeoUrl(KR);
      setScaleMap(6500);
      setCenterMap([76.3, 10.5]);
      setStateColor("#eddd8e");
      setMarker(filterMarkers(properties.name));
      setFill("#ce8516");
    } else if (properties.name === "Lakshadweep") {
      setGeoUrl(LD);
      setScaleMap(23000);
      setCenterMap([73, 11]);
      setStateColor("#e0eee0");
      setMarker(filterMarkers(properties.name));
      setFill("#127f12");
    } else if (properties.name === "Madhya Pradesh") {
      setGeoUrl(MP);
      setScaleMap(4700);
      setCenterMap([78.5, 24]);
      setStateColor("#e99fb1");
      setMarker(filterMarkers(properties.name));
      setFill("#c62148");
    } else if (properties.name === "Maharashtra & MP") {
      setGeoUrl(MH);
      setScaleMap(4500);
      setCenterMap([76.8, 19.3]);
      setStateColor("#c77be080");
      setMarker(filterMarkers(properties.name));
      setFill("#800080");
    } else if (properties.name === "Manipur") {
      setGeoUrl(MN);
      setScaleMap(11400);
      setCenterMap([93.8, 24.7]);
      setStateColor("#ebd3d8");
      setMarker(filterMarkers(properties.name));
      setFill("#d82448");
    } else if (properties.name === "Meghalaya") {
      setGeoUrl(ML);
      setScaleMap(11500);
      setCenterMap([91.3, 25.4]);
      setStateColor("#c4aead");
      setMarker(filterMarkers(properties.name));
      setFill("#ce2621");
    } else if (properties.name === "Mizoram") {
      setGeoUrl(MZ);
      setScaleMap(10700);
      setCenterMap([92.8, 23.25]);
      setStateColor("#e1e0cb");
      setMarker(filterMarkers(properties.name));
      setFill("#adc912");
    } else if (properties.name === "Nagaland") {
      setGeoUrl(NL);
      setScaleMap(12000);
      setCenterMap([94.3, 26.1]);
      setStateColor("#d1e1db");
      setMarker(filterMarkers(properties.name));
      setFill("#22bf83");
    } else if (properties.name === "Odisha") {
      setGeoUrl(OD);
      setScaleMap(5300);
      setCenterMap([84.4, 20.25]);
      setStateColor("#87a86d");
      setMarker(filterMarkers(properties.name));
      setFill("#73f20c");
    } else if (properties.name === "Punjab") {
      setGeoUrl(PB);
      setScaleMap(8300);
      setCenterMap([75.35, 31.1]);
      setStateColor("#90e7e2");
      setMarker(filterMarkers(properties.name));
      setFill("#13847d");
    } else if (properties.name === "Rajasthan") {
      setGeoUrl(RJ);
      setScaleMap(3900);
      setCenterMap([74, 26.46]);
      setStateColor("#d3caa3");
      setMarker(filterMarkers(properties.name));
      setFill("#dd8f08");
    } else if (properties.name === "Sikkim") {
      setGeoUrl(SK);
      setScaleMap(20000);
      setCenterMap([88.45, 27.6]);
      setStateColor("#b5c3b7");
      setMarker(filterMarkers(properties.name));
      setFill("#20a031");
    } else if (properties.name === "Tamilnadu") {
      setGeoUrl(TN);
      setScaleMap(5700);
      setCenterMap([78.25, 10.8]);
      setStateColor("#964b0085");
      setMarker(filterMarkers(properties.name));
      setFill("#964B00");
    } else if (properties.name === "Telangana") {
      setGeoUrl(TS);
      setScaleMap(7800);
      setCenterMap([79.5, 17.9]);
      setStateColor("#aad3df");
      setMarker(filterMarkers(properties.name));
      setFill("#20a031");
    } else if (properties.name === "Tripura") {
      setGeoUrl(TR);
      setScaleMap(17500);
      setCenterMap([91.75, 23.75]);
      setStateColor("#c0c3e2");
      setMarker(filterMarkers(properties.name));
      setFill("#3a47c1");
    } else if (properties.name === "Uttarakhand") {
      setGeoUrl(UK);
      setScaleMap(9500);
      setCenterMap([79.3, 30.15]);
      setStateColor("#c8c8cb");
      setMarker(filterMarkers(properties.name));
      setFill("#6b6060");
    } else if (properties.name === "Uttar Pradesh") {
      setGeoUrl(UP);
      setScaleMap(4400);
      setCenterMap([80.8, 27.06]);
      setStateColor("#95aae2");
      setMarker(filterMarkers(properties.name));
      setFill("#2e5ca5");
    } else if (properties.name === "West Bengal") {
      setGeoUrl(WB);
      setScaleMap(5200);
      setCenterMap([87.7, 24.2]);
      setStateColor("#90b9c5");
      setMarker(filterMarkers(properties.name));
      setFill("#0e7bd3");
    }
    //  else if (id.split(".")[0] === "LK") {
    //   setGeoUrl(SL);
    //   setScaleMap(5700);
    //   setCenterMap([80.65, 7.8]);
    //   setStateColor("#9fd1b4");
    //   setMarker(cordMarkers.filter((data) => data.state === "LK"));
    //   setFill("#127f12");
    // }
  };

  const cordMarkers = [
    {
      state: "Maharashtra",
      name: "Satara",
      cords: [74.000938, 17.691401],
    },
    {
      state: "Maharashtra",
      name: "Pune",
      cords: [73.856255, 18.516726],
    },
    {
      state: "Gujarat",
      name: "Ahemdabad",
      cords: [72.585022, 23.033863],
    },
    {
      state: "Gujarat",
      name: "Surat",
      cords: [72.831062, 21.17024],
    },
    {
      state: "Gujarat",
      name: "Rajkot",
      cords: [70.800705, 22.308155],
    },
    {
      state: "Tamil Nadu",
      name: "Chennai",
      cords: [80.237617, 13.067439],
    },
    {
      state: "Karnataka",
      name: "Udupi",
      cords: [74.742142, 13.340881],
    },
    {
      state: "Tamil Nadu",
      name: "Tiruchirappalli",
      cords: [78.686676, 10.79319],
    },
    {
      state: "LK",
      name: "Ampara",
      cords: [81.6747, 7.3018],
    },
    {
      state: "LK",
      name: "Kandy",
      cords: [80.6337, 7.2906],
    },
  ];

  useEffect(() => {
    stateGeoUrl();
  }, [selectedState]);

  return (
    <div>
      <Tooltip title={siteContent} followCursor placement="top">
        <Box className="map-wrepper" sx={{}}>
          <Button
            sx={{ minWidth: "auto", position: "absolute", top: 0, left: 0 }}
            onClick={() => setStateName("India")}
          >
            {" "}
            <img src={BackIcon} alt="" />
          </Button>
          <ComposableMap
            height={700}
            projection="geoMercator"
            projectionConfig={{ center: centerMap, scale: scaleMap }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="#FFF"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>
            {marker.map((mark) => (
              <Marker
                key={mark.areaName}
                coordinates={[parseInt(mark.longitude), parseInt(mark.latitude)]}
                onMouseEnter={() => {
                  setSiteContent(
                    <div>
                      {mark.areaName}
                      <Divider sx={{ borderColor: "#000" }} />
                      <AreaHoverComp data={mark.areaObj} />
                    </div>
                  );
                }}
                onMouseLeave={() => {
                  setSiteContent("");
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

export default StateMap;
