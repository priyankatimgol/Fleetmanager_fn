import React, { useEffect } from "react";
import MainSection from "./components/Section2";
import './style.css'
import temp from '../../assets/images/temp.jpg';
import { useDispatch, useSelector } from "react-redux";
import { getPlanningKpiData } from "redux/actions/SiteHomeActions";

function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const SelSite = state.siteHomeKpi?.selSite;

  useEffect(() => {
    if(SelSite){
      dispatch(getPlanningKpiData(SelSite));
    }
  }, [SelSite, dispatch]);
  
  return(
    <div className="home-root">   
      <MainSection />
      {/* <img src={temp} alt="" className="tempImg"/> */}
    </div>
  );
}

export default Home;
