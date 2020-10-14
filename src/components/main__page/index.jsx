import "./../../css/main__page.css";
import React, { Component } from "react";
import HeaderFooter from "../header__footer";
import MultiTabsModule from "./multi__tabs__module";
import TopSlideshow from "./top__slideshow";
import ThreeImages from "./three__images";
import PopularModule from "./popular__module";
import ParallexPic from "./parallex__pic";
import BackToTop from "./back__to__top";
import WholeStyleOffer from "./whole__style__offer";
import Instagram from "./instagram";

class Main__page extends Component {
  state = {};

  render() {
    return (
      <HeaderFooter history={this.props.history}>
        <TopSlideshow></TopSlideshow>

        <MultiTabsModule> </MultiTabsModule>

        <ThreeImages></ThreeImages>

        <PopularModule categoryId="0" type={"visit"}></PopularModule>
        <ParallexPic></ParallexPic>

        <BackToTop></BackToTop>

        <Instagram> </Instagram>
        <WholeStyleOffer></WholeStyleOffer>

      </HeaderFooter>
    );
  }
}

export default Main__page;
