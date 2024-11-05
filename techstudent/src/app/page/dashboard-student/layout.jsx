
import React from "react";

import Header from "../../component/header/header";
import {Headerdashboardstudent1,Headerdashboardstudent2} from './headerdashboardstudent';


export default function Layoutdashboardstudent({children}){
    

    return (
        <>
        <Header/>
  <div className="dashboard-banner-area-wrapper mt-44">
    <div className="container">
      <div className="row">
        
      <Headerdashboardstudent1/>


      </div>
    </div>
  </div>
  {/* dashboard banner area end */}
  {/* rts dahboard-area-main-wrapper */}
  <div className="dashboard--area-main pt--100">
    <div className="container">
      <div className="row g-5">
      <Headerdashboardstudent2 page={"home"}/>
        {children}
      </div>
    </div>
  </div>
</>

    )
}