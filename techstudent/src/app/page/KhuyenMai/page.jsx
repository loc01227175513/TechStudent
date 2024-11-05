"use client";
import React from 'react';
import VoucherShop from './magiamgia/magiamgia';
import Header from '../../component/header/header';
import Footercomponent from '../../component/footer/footer';

export default function Page() {
  return (
    <>
      <Header />

      <div className="flex h-screen mt-60 mb-60">
        <VoucherShop />
      </div>


      <Footercomponent />


    </>
  );
}