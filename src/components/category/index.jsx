import React, { Component, Fragment } from "react";
import HeaderFooter from "../header__footer";
import "./../../css/category.css";
import PopularModule from "../main__page/popular__module";
import Instagram from "../main__page/instagram";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Category extends Component {
  state = {};

  render() {
    const categoryId = this.props.match.params.id;
    let { allCategories } = this.props;
    let category = allCategories.filter((c) => c.id == categoryId)[0];
    let sub = allCategories.filter((c) => c.parentId == categoryId);
    return (
      <HeaderFooter history={this.props.history}>
        <div className="container">
          <div className="slide__and__menu">
            <div className="right__menu">
              <div className="title">
                <span className="partOne" > تمام دسته بندی های</span>
                &nbsp;
                <span>{` ${category.title}`}</span>
                {/* {`تمام دسته بندی های ${category.title}`} */}
              </div>
              <div className="content__menu">
                {sub.map((c) => (
                  <Link
                    to={`/last__category/${c.id}`}
                    style={{ width: "100%" }}
                  >
                    <div className="one">
                      <img src={c.iconPic} alt="" />
                      <div className="title__content">{c.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="left__slide">
              <img
                className="pic1"
                src={require("./../../assets/banners/6.jpg")}
                alt=""
              />
              {sub.length >= 8 && (
                <img
                  className={`pic2`}
                  src={require("./../../assets/banners/h5.jpg")}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>

        <PopularModule categoryId={categoryId} type={"visit"}></PopularModule>

        <div className="container">
          <div className="three__images2">
            <img className="one" src={require("./../../assets/banners/h1.jpg")} alt="" />
            <img className="two" src={require("./../../assets/banners/h2.jpg")} alt="" />
            <img className="three"  src={require("./../../assets/banners/h3.jpg")} alt="" />
          </div>
        </div>

        <PopularModule categoryId={categoryId} type={"sold"}></PopularModule>
        <Instagram></Instagram>
      </HeaderFooter>
    );
  }
}

const mapStateToProps = (state) => ({
  allCategories: state.api.apiattributeItem.categories,
});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
