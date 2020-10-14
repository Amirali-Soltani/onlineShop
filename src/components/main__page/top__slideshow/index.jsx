import React, { Component } from "react";
import Slider from "react-slick";
import "./../../../css/top__slideshow.css";

class TopSlideshow extends Component {
  state = {};
  render() {
    var settings1 = {
      rtl: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
    };

    return (
      <div className="container">
        <div className="main__header">
          <div className="header__right__slider">
            <Slider {...settings1}>
              <div>
                <img
                  src={require("./../../../assets/banners/3.jpg")}
                  alt="logo"
                />
              </div>
              <div>
                <img
                  src={require("./../../../assets/banners/4.jpg")}
                  alt="logo"
                />
              </div>
              <div>
                <img
                  src={require("./../../../assets/banners/1.jpg")}
                  alt="logo"
                />
              </div>
            </Slider>
          </div>
          <div className="header__left__images">
            <div className="top__image">
              <img
                src={require("./../../../assets/banners/left-header-1.jpg")}
                alt="logo"
                className="main__pic"
              />
              <div className="effect"></div>
            </div>
            <div className="buttom__image">
              <img
                src={require("./../../../assets/banners/5.jpg")}
                alt="logo"
              />
              <div className="effect"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopSlideshow;
