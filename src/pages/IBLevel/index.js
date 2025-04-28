import React from "react";
import MainSection from "./components/Section2";
import './style.css'
import temp from '../../assets/images/temp.jpg';
function IBLevel() {
  return(
    <div className="home-root">   
      <MainSection />
      {/* <img src={temp} alt="" className="tempImg"/> */}
    </div>
  );
}

export default IBLevel;
