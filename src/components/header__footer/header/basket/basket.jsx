import React, { Component, Fragment } from "react";
import "./../../../../css/basket.css";
import { connect } from "react-redux";
import {
  tryToAddToCart,
  deletAllProduct,
  deleteSpeceficProduct,
} from "../../../../redux-slicers/addToCart";
import { Link } from "react-router-dom";

class Basket extends Component {
  state = {};

  deletSpecificProduct = (product) => {
    let size = product.size;
    let color = product.color;
    let id = product.product._id;
    let index = this.props.productsInCard.findIndex(
      (p) => p.size === size && p.color === color && p.product._id === id
    );
    this.props.deleteOneProduct(index);
  };
  numberWithCommas=(x)=> {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
  numberOfProdudcts = () => {
    let sum = 0;
    this.props.productsInCard.map((p) => (sum += p.number));
    return sum;
  };
  handleShop = () => {
    if (this.props.productsInCard.length > 0) {
      this.props.history.push(`/shoppingProcess`);
    }
  };

  render() {
    let { productsInCard } = this.props;
    return (
      <div className="basket" >
        <div className="basket__image" onClick={this.handleShop}>
          <img
            src={require("./../../../../assets/icons/cart2.png")}
            alt=""
            className="image__1"
          />
          <img
            src={require("./../../../../assets/icons/cart2.png")}
            alt="image__2"
            className="image__2"
          />
        </div>
        <span className="shop__item">{this.numberOfProdudcts()}</span>
        <div className="dropdown__basket">
          {productsInCard.length === 0 && (
            <div className="without__product">سبد خرید شما خالی است</div>
          )}
          {productsInCard.length > 0 && (
            <div className="dropdown__basket__main">
              <div className="dropdown__basket__header">
                <div className="number__of__commodity">
                  <span>{this.numberOfProdudcts()}</span>
                  &nbsp; کالا
                </div>
              </div>
              {productsInCard.slice(0, 3).map((product) => (
                <Fragment key={product.product._id}>
                  <div className="dropdown__basket__body">
                    <div className="dropdown__basket__body__right">
                      <Link to={`/product/${product.product._id}`}> 
                      <img
                        src={
                          product.product.productPic[
                            Object.keys(product.product.productPic)[0]
                          ]
                        }
                        alt="logo"
                      />
                      </Link>
                    </div>
                    <div className="dropdown__basket__body__left">
                      <span className="name">
                        {product.product.title.slice(0, 35)}
                      </span>
                      {product.product.title.length > 35 && <span>...</span>}
                      <span className="color">
                        {`رنگ : ${product.color[0]}`}{" "}
                      </span>
                      <span className="size">{`سایز : ${product.size}`}</span>

                      <div className="dropdown__basket__body__left__info">
                        <span className="number">{`تعداد : ${product.number}`}</span>
                        <div className="trash__button">
                          <img
                            src={require("./../../../../assets/icons/trash-2.png")}
                            alt="logo"
                            onClick={() => this.deletSpecificProduct(product)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown__basket__footer">
                    <div className="dropdown__basket__footer__top">
                      <span className="price__item">
                      {this.numberWithCommas(
                        product.product.off
                          ? ((parseInt(product.product.price) *
                              (100 - parseInt(product.product.off))) /
                              100) *
                            product.number
                          : product.product.price * product.number
                          )}
                          ,000 تومان
                      </span>
                    </div>
                  </div>
                </Fragment>
              ))}
              <div className="dropdown__basket__footer__bottom">
                {productsInCard.length > 3 && (
                  <div className="seeMore__button">
                                      <Link to="/shoppingProcess">
                    <span> همه ی کالاهای سبد خریدتو ببین </span>
                    </Link>

                  </div>
                )}
                <div className="success__button">
                  <img
                    src={require("./../../../../assets/icons/play4.png")}
                    alt="logo"
                  />
                  <Link to="/shoppingProcess">
                  <span> بزن بریم که وقته خریده!</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    allproducts: state.api.apiProducts.list,
    productsInCard: state.addToCart.products,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    AddToBasket: (product, color, size, number) =>
      dispatch(tryToAddToCart(product, color, size, number)),
    deleteAllProduct: () => dispatch(deletAllProduct()),
    deleteOneProduct: (index) => dispatch(deleteSpeceficProduct({ index })),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
