import React from "react";
import "./Ribbon.css"

function Ribbon(props) {

  return (
  <div className="container one">

  <div className="bk l">
    <div className="arrow top"></div>
    <div className="arrow bottom"></div>
  </div>

  <div className="skew l"></div>

  <div className="main">
    <div>{props.children}</div>
  </div>

  <div className="skew r"></div>

  <div className="bk r">
    <div className="arrow top"></div>
    <div className="arrow bottom"></div>
  </div>

</div>
  );
}

export default Ribbon;
