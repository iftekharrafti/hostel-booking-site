import React from "react";
import Style from "./button.module.css";

const Button = ({title}) => {
  return (
    <button
      className={`${Style.button} d-flex align-items-center`}
    >
      {title || "submit"}
    </button>
  );
};

export default Button;
