import React, { Component } from "react";
import "./../../../css/three__images.css";
import { Link } from "react-router-dom";

class ThreeImages extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="three__images">
          <div className="right__images">
            <Link to={`/last__category/1/optionalFilter=تابستان`}>
              <div className="top__right__images">
                <img
                  src={require("./../../../assets/banners/h84.jpg")}
                  alt=""
                />
                <div className="detail__image">
                  <span className="title"></span>
                </div>
                <span className="button">کالکشن تابستانه زنانه</span>
              </div>
            </Link>
            <Link to={`/last__category/1/range=1`}>
              <div className="buttom__right__images">
                <img
                  src={require("./../../../assets/banners/h85.jpg")}
                  alt=""
                />
                <div className="detail__image">
                  <span className="title"></span>
                </div>
                <span className="button">کالکشن لباس زنانه زیر 150 تومان </span>
              </div>
            </Link>
          </div>
          <div className="left" >
              <Link to={`/last__category/1/discount=true`} > 
            <div className="left__image">
              <img src={require("./../../../assets/banners/h86.jpg")} alt=""
              />
              <div className="detail__image">
                <span className="title"></span>
              </div>
              <span className="text"></span>
              <span className="button">جشنواره تخفیف پاییزه</span>
            </div>
              </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default ThreeImages;
