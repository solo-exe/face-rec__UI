// import React, { Component } from 'react';
import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <p 
                className='f3 link dim black underline pa3 pointer bg-transparent bw1'
                onClick={() => onRouteChange('signout')}
                >
                    Sign out 
                </p>
            </nav>
        )
    }  
    else {
        return (
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <p 
                className='f3 link dim black underline pa3 pointer bg-transparent  bw1'
                onClick={() => onRouteChange('Signin')}
                >
                    Sign In 
                </p>
                <p 
                className='f3 link dim black underline pa3 pointer bg-transparent  bw1'
                onClick={() => onRouteChange('register')}
                >
                    Register 
                </p> 
            </nav>
        )
    }   
}



export default Navigation;