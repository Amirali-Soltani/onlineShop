import React, { Component } from "react";
import "./../../../css/whole__style__offer.css";
import { connect } from "react-redux";
import { getcolors, getPriceClasses } from "../../common/functionsOfProducts";
import { Link } from "react-router-dom";

class WholeStyleOffer extends Component {
  state = {
    allAttributeItemS: [],
  };
  componentDidMount() {
    let allAttributeItemS = this.props.attribute;
    this.setState({ allAttributeItemS });
  }

  position = (x, y) => {
    let position = { top: `${y}px`, left: `${x}px` };
    return position;
  };

  makingProduct = (p) => {
    let { allAttributeItemS } = this.state;
    let first = Object.keys(p.productPic)[0];
    return (
      <div className="add__to__cart__float">
        <div className="add__to__cart__pic__name__color__price">
          <Link to={`/product/${p._id}`}>
            <div className="pic">
              <img src={p.productPic[first]} alt="logo" id="white__image" />
            </div>
          </Link>
          <div className="whole__detail">
            <div className="top__detail">
              <div className="product__detail">
                <div className="product__name">
                  {p.title.slice(0, 32)}
                  {p.title.length > 31 && <span> ...</span>}
                </div>
                <div className="product__price__and__icon">
                  {!p.off && (
                    <span className={getPriceClasses(p)}>
                      {p.price} هزار تومان
                    </span>
                  )}
                  {p.off && (
                    <span className="discount">
                      {(parseInt(p.price) * (100 - parseInt(p.off))) / 100} هزار
                      تومان
                    </span>
                  )}
                </div>
                <div className="product__box__color">
                  <ul>
                    {getcolors(p, allAttributeItemS).map((a) => (
                      <li className={a.class} key={a.class}></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="icon">
          <img
            className="basket"
            src={require("./../../../assets/icons/bag-4.png")}
            alt="logo"
            id="white__image"
          />
          <img
            className="plus"
            src={require("./../../../assets/icons/plus.png")}
            alt="logo"
            id="white__image"
          />
          <Link to={`/product/${p._id}`}>
            <span> بریم ببینیمش </span>
          </Link>
        </div>
      </div>
    );
  };
  render() {
    let { allProducts } = this.props;
    let product1 = allProducts.filter(
      (p) => p._id === "5f49b250511247546ce38fc3"
    )[0];
    let product2 = allProducts.filter(
      (p) => p._id === "5f49b20d511247546ce38fc0"
    )[0];
    let product3 = allProducts.filter(
      (p) => p._id === "5f49b2ea511247546ce38fc9"
    )[0];
    let product4 = allProducts.filter(
      (p) => p._id === "5f49b265511247546ce38fc4"
    )[0];
    let product5 = allProducts.filter(
      (p) => p._id === "5f49b2fe511247546ce38fca"
    )[0];
    let product6 = allProducts.filter(
      (p) => p._id === "5f499693511247546ce38fb6"
    )[0];
    let product7 = allProducts.filter(
      (p) => p._id === "5f499693511247546ce38fb6"
    )[0];
    let product8 = allProducts.filter(
      (p) => p._id === "5f499693511247546ce38fb6"
    )[0];
    let product9 = allProducts.filter(
      (p) => p._id === "5f499693511247546ce38fb6"
    )[0];
    return (
      <div className="whole__style__offer">
        <div className="container">
          <div className="main__offer">
            <div className="top__offer">
              <div className="title">
                <div className={`top__offer__category`}>
                  <img
                    className="icon"
                    src={require("./../../../assets/icons/all.png")}
                    alt="logo"
                  />
                  <span> کل استایل را یکجا بخرید</span>
                </div>
              </div>
            </div>
            <div className="buttom__offer__slider">
              <div className="one__product product1">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-1.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle" style={this.position(176, 111)}>
                    {this.makingProduct(product1)}
                  </div>
                  <div className="circle" style={this.position(228, 222)}>
                    {this.makingProduct(product2)}
                  </div>
                  <div className="circle" style={this.position(129, 299)}>
                    {this.makingProduct(product3)}
                  </div>
                </div>
              </div>
              <div className="one__product product2">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-3.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle" style={this.position(150, 132)}>
                    {this.makingProduct(product4)}
                  </div>
                  <div className="circle" style={this.position(129, 267)}>
                    {this.makingProduct(product5)}
                  </div>
                  <div className="circle" style={this.position(243, 374)}>
                    {this.makingProduct(product6)}
                  </div>
                </div>
              </div>
              <div className="one__product product3">
                <div className="product__images">
                  <img
                    src={require("./../../../assets/products/model-4.jpg")}
                    alt="logo"
                    id="white__image"
                  />
                </div>
                <div className="circle__and__add__to__cart">
                  <div className="circle " style={this.position(164, 139)}>
                    {this.makingProduct(product7)}
                  </div>
                  <div className="circle " style={this.position(218, 234)}>
                    {this.makingProduct(product8)}
                  </div>
                  <div className="circle" style={this.position(149, 367)}>
                    {this.makingProduct(product9)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.api.apiProducts.list,
    allCategories: state.api.apiattributeItem.categories,
    attribute: state.api.apiattributeItem.attributeItem,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(WholeStyleOffer);
