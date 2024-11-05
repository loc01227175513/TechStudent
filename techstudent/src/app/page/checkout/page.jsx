"use client";
import React from 'react';
import Page from './home/page'; // Ensure this matches the default export
import Header from "../../../../src/app/component/header/header";
import Footercomponent from "../../../../src/app/component/footer/footer";

export default function page() {
    return (
        <>
            <Header />
            <Page />
            <Footercomponent />
        </>
    );
}