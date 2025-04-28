import React, { useEffect } from "react";
import MainSection from "./components/Section2";
import './style.css'
import temp from '../../assets/images/temp.jpg';

function Home() {
  return(
    <div className="home-root">   
      <img src={temp} alt="" className="tempImg"/>
    </div>
  );
}

export default Home;
