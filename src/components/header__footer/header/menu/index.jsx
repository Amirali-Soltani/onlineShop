import React, { Component } from "react";
import "./../../../../css/menu.css";
import { connect } from "react-redux";
import { Fragment } from "react";
import { loadattributeItem } from "../../../../redux-slicers/attributeItem";
import { loadAllProducts } from "../../../../redux-slicers/products";
import { Link } from "react-router-dom";
import SigninLoginBox from "./../register/signin__login__box";
import { closeMenu, openMenu } from "../../../../redux-slicers/burger-menu";

class Menu extends Component {
  state = {
    allCategories: [],
  };

  componentDidMount() {
    this.props.loadattributeItem();
    this.props.loadAllProducts();
    let { allCategories } = this.props;
    this.setState({ allCategories });
  }

  background = (i1) => {
    let background;
    if (i1.id === 1) background = "background1";
    if (i1.id === 2) background = "background2";
    if (i1.id === 3) background = "background3";
    return background;
  };

  openCloseBurgerMenu = () => {
    let { statusOfMenu } = this.props;
    if (statusOfMenu === false) this.props.openMenu();
    else this.props.closeMenu();
  };
  render() {
    let { allCategories } = this.state;
    return (
      <div className="main__menu">
        <div className="container">
          <div className="mobile__menu">
            <img
              src={require("./../../../../assets/icons/menu-2.png")}
              onClick={this.openCloseBurgerMenu}
              alt=""
            />
            <SigninLoginBox></SigninLoginBox>
          </div>
          <div className="menu1">
            <ul>
              {allCategories
                .filter((c1) => c1.parentId === 0)
                .map((i1) => (
                  <li style={{ fontWeight: "500" }} key={i1.id}>
                    <Link to={`/category/${i1.id}`}>{i1.title}</Link>
                    <ul className={this.background(i1)}>
                      {allCategories
                        .filter((c2) => c2.parentId === i1.id)
                        .map((i2) => (
                          <li key={i2.id}>
                            <Link to={`/category/${i2.id}`}>
                              <div className="cat__name">{i2.title}</div>
                            </Link>

                            <ul className="sub__cat__name">
                              {allCategories.filter(
                                (c3) => c3.parentId === i2.id
                              ).length <= 7 &&
                                allCategories
                                  .filter((c3) => c3.parentId === i2.id)
                                  .map((i3) => (
                                    <Link
                                      to={`/last__category/${i3.id}`}
                                      key={i3.id}
                                    >
                                      <li>{i3.title}</li>
                                    </Link>
                                  ))}

                              {allCategories.filter(
                                (c3) => c3.parentId === i2.id
                              ).length > 7 && (
                                <Fragment>
                                  {allCategories
                                    .filter((c3) => c3.parentId === i2.id)
                                    .slice(0, 5)
                                    .map((i3) => (
                                      <Link
                                        to={`/last__category/${i3.id}`}
                                        key={i3.id}
                                      >
                                        <li>{i3.title}</li>
                                      </Link>
                                    ))}
                                  {allCategories
                                    .filter((c3) => c3.parentId === i2.id)
                                    .slice(5, 10)
                                    .map((i3) => (
                                      <Link
                                        to={`/last__category/${i3.id}`}
                                        key={i3.id}
                                      >
                                        <li>{i3.title}</li>
                                      </Link>
                                    ))}
                                </Fragment>
                              )}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allCategories: state.api.apiattributeItem.categories,
  statusOfMenu: state.menu.open,
});

function mapDispatchToProps(dispatch) {
  return {
    loadattributeItem: () => dispatch(loadattributeItem()),
    loadAllProducts: () => dispatch(loadAllProducts()),
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
