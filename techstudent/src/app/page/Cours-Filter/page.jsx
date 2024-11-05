import React from 'react'
import Header from '../../component/header/header'
import Footercomponent from '../../component/footer/footer'
import Page from './course/page'
export default function page() {
    return (
        <>
            <Header />
            <div className='mt-20'>
                <Page />
            </div>

            <Footercomponent />
        </>
    )
}
