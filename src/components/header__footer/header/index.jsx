import React, { Component } from "react";
import "./../../../css/header.css";
import Menu from "./menu";
import { Link } from "react-router-dom";
import SigninLoginBox from "./register/signin__login__box";
import Search from "./search";
import Basket from "./basket/basket.jsx";

class Header extends Component {
  state = {};

  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="header__content">
              <div className="header__right">
                <div className="logo">
                  <Link to="/">
                    <img
                      src={require("./../../../assets/icons/logo.png")}
                      alt="logo"
                    />
                  </Link>
                </div>
                <Search history={this.props.history}></Search>
              </div>
              <div className="header__left">
                <SigninLoginBox className1="regular"></SigninLoginBox>
                <Basket history={this.props.history}></Basket>
              </div>
            </div>
          </div>
        </header>
        <Menu></Menu>
      </div>
    );
  }
}

export default Header;
