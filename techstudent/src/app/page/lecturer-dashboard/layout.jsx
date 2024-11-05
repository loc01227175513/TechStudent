
import React from "react";

import Header from "../../component/header/header";
import {Headerdashboardstudent1,Headerdashboardstudent2} from './headerdashboardlecturer';


export default function Layoutdashboardlecturer({children}){
    

    return (
        <>
        <Header/>
  <div className="mt-32 dashboard-banner-area-wrapper">
    <div className="container">
      <div className="row">
        
      {/* <Headerdashboardstudent1/> */}


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