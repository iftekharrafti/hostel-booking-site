/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Style from './loadingSpinner.module.css'

const LoadingSpinner = () => {
    return (
        <div className={Style.loadingContainer}>
            {/* <img src="./loading.gif" alt="" className={Style.loadingGif} /> */}
            <div class={Style.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
    );
};

export default LoadingSpinner;