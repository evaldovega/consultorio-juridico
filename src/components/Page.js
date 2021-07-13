import React from 'react';
import Footer from 'components/Footer'
import HeaderPage from "components/Header";

const Page=({children,fullWidth=false})=>{
    return (
        <>
        <HeaderPage />
        {!fullWidth && <div className='content-body'>
            {children}
        </div>}
        {fullWidth && children}
        <Footer/>
        </>
    )
}

export default Page