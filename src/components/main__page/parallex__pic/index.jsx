import React, { Component } from "react";
import "./../../../css/parallex__pic.css";

class ParallexPic extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="parallex__background__image">
          <div className="text__in__parallex">
            <div className="top__text">پوشاک زمستانه رو الان با تخفیف بخر</div>
            <div className="buttom__text">هم اکنون بخرید</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ParallexPic;
