import React from "react";
import Style from './topTitle.module.css'

const TopTitle = ({title, textAlign}) => {
  return (
    <div className={Style.headerTitle}>
      <h3 class={`${Style.headerTitleMain}`} style={{ fontFamily: "Merriweather", textAlign: textAlign }}>
        {title}
      </h3>
    </div>
  );
};

export default TopTitle;
