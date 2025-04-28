import { Box, Typography } from "@mui/material";
import { MySelectAuto } from "pages/common-components/AutoSearchSelect";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTurbinesData, getUserSites } from "redux/actions/SiteHomeActions";

const SelectSite = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const SelSite = state.siteHomeKpi?.selSite;
  const PlantNames = state?.siteHomeKpi?.turbineData?.plantNames || [];

  const SitePlants = useCallback(() => {
    if (PlantNames?.length === 0) return null;

    return (
      <ul className="plantname-list">
        {PlantNames.map((p) => (
          <li key={p.name}>
            <Typography variant="h5">{p.name}</Typography>
          </li>
        ))}
      </ul>
    );
  }, [PlantNames?.length]);

  return (
    <Box className="inside-card" sx={{ height: "99px", overflow:"auto" }}>
      <Typography
        sx={{
          paddingLeft: "5px",
          fontWeight: 700, 
          color: "black" 
        }}
      >
        {SelSite}
      </Typography>
      <SitePlants />
    </Box>
  );
};

export default SelectSite;

