import React from "react";

import Banner from "./Banner/page";
import Main1 from "./main/main1";
import Main2 from "./main/main2";
import Header from "../../component/header/header";
import Footercomponent from "../../component/footer/footer";

export default function Becomeinstructor() {
    return (
        <>
            <Header />
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image mt-44">
                <div className="container">
                    <Banner />
                </div>
            </div>
            <div className="rts-section-gap">
                <div className="container-2">
                    <div className="row">
                        <div className="col-lg-12">
                            <Main1 />
                            <Main2 />
                        </div>
                    </div>
                </div>
            </div>
            <Footercomponent />
           
        </>
    )
}