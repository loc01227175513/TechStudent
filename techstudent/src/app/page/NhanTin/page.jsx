import React from 'react'
import Header from '../../component/Header/Header';
import Footercomponent from '../../component/Footer/Footer';
import NhanTin from './NhanTin';

export default function page() {
  return (
    <>
      <Header/>
      <div className=' p-4 rounded-lg shadow m-60 border border-gray-300'>
        <NhanTin/>
      </div>
      <Footercomponent/>
    </>
  )
}