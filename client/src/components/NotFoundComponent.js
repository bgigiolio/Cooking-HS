import React from 'react';
import '../styles/defaults.css'

function NotFound() {
    return( 
        <>
            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_jitmvb71.json" background="transparent"  speed="1"  style={{width: "100%", height: "440px", marginTop: "20px", zIndex: "0"}} loop autoplay></lottie-player>
            <h1 className='text-align-center'>Recipe not found</h1>
        </>
    )

}

export default NotFound;