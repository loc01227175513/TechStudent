"use client";
import React from 'react';
import Roadmap from './courseLoTrinh';
import Header from '../../component/header/header';
import Footercomponent from '../../component/footer/footer';

export default function Page() {
    return (
        <>
            <Header />
            <div className='container  mb-60 px-4 mt-60'>
                <div className='row'>
                    <div className='col'>
                        <Roadmap />
                    </div>
                </div>
            </div>
            <Footercomponent />
        </>
    );
}