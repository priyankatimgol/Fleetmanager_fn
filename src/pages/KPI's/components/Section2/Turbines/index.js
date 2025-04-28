import { Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TubineHeader from "./components/tubineHeader";
import TurbinCard from "./components/turbinCard";
import { useDispatch, useSelector } from "react-redux";
import { getTurbinesData } from "redux/actions/SiteHomeActions";

function Turbines() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const TurbineData = state.siteHomeKpi?.turbineData;
  const SelSite = state.siteHomeKpi?.selSite;
  const SelCustomer = state.siteHomeKpi?.selCustomer;

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if(selected) return;

    if(TurbineData?.turbineStatuses?.length && TurbineData?.turbineStatuses[0]?.statusCode && TurbineData?.turbineStatuses[0]?.value > 0) {
      setSelected((TurbineData?.turbineStatuses[0]?.statusCode) || "");
    } else if(TurbineData?.turbineStatuses?.length && TurbineData?.turbineStatuses[1]?.statusCode) {
      setSelected((TurbineData?.turbineStatuses[1]?.statusCode) || "");
    }
  }, [TurbineData?.turbineStatuses, selected])

  useEffect(() => {
    if (!SelSite) return;
    setSelected("");
  }, [SelSite, SelCustomer]);

  useEffect(() => {
    if (!SelSite) return;
    const customerFilter = SelCustomer === 0 ? "" : SelCustomer;
    dispatch(getTurbinesData(search, customerFilter, SelSite, selected));
    const intervalCall = setInterval(() => {
      dispatch(getTurbinesData(search, customerFilter, SelSite, selected));
    }, 60000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [search, SelCustomer, SelSite, selected, dispatch]);

  return (
    <div className="turbin">
      <TubineHeader data={TurbineData?.turbineStatuses} setSearch={setSearch} selected={selected} setSelected={setSelected} />
      <TurbinCard data={TurbineData?.turbineNames} />
    </div>
  );
}

export default Turbines;
