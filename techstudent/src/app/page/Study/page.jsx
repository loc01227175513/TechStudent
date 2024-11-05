"use client";
import React from 'react'
import Page from './home/page.jsx';
import Header from '@/app/component/header/header.jsx';
import Footercomponent from '@/app/component/footer/footer.jsx';
export default function () {
    return (
        <>
            <Header />
            <Page />
            <Footercomponent />
        </>
    )
}
