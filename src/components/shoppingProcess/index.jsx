import React, { Component, Fragment } from "react";
import "./../../css/shoppingProcess.css";
import HeaderFooter from "../header__footer";
import {
  deletAllProduct,
  tryToAddToCart,
  deleteSpeceficProduct,
  increamentOrDeacreament,
} from "../../redux-slicers/addToCart";
import { connect } from "react-redux";
import { getAttributes } from "../common/functionsOfProducts";
import { Link } from "react-router-dom";
class shoppingProcess extends Component {
  state = {
    count: [],
  };
  componentDidMount() {
    let { productsInCard } = this.props;
    let count = [...this.state.count];
    productsInCard.map((product, index) => (count[index] = product.number));
    this.setState({ count });
  }

   numberWithCommas=(x)=> {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  disableButton = (index,number,max) => {
    let { count } = this.state;
    let disable;
    if(number==="min"){
      if (count[index] === 1) disable = true;
      else disable = false;
      }
      if(number==="max"){
        if (count[index] === max) disable = true;
        else disable = false;
        }

    return disable;
  };

  addOrSubtract = (act, index, product) => {
    let count = [...this.state.count];
    if (act > 0) count[index] = count[index] + 1;
    else count[index] = count[index] - 1;
    this.setState({ count });

    let { size, color } = product;
    let id = product.product._id;
    let indexCart = this.props.productsInCard.findIndex(
      (p) => p.size === size && p.color === color && p.product._id === id
    );
    setTimeout(() => {
      this.props.increamentOrDeacreament(indexCart, this.state.count[index]);
    }, 1000);
  };

  deleteProduct = (product) => {
    let { size, color } = product;
    let { id } = product.product._id;
    let index = this.props.productsInCard.findIndex(
      (p) => p.size === size && p.color === color && p.product._id === id
    );
    this.props.deleteOneProduct(index);
  };
  numberOfProdudcts = () => {
    let sum = 0;
    this.props.productsInCard.map((p) => (sum += p.number));
    return sum;
  };
  priceOfAllProducts = () => {
    let sum = 0;
    this.props.productsInCard.map((p) => {
      if (p.product.off === null) {
        sum += p.product.price * p.number;
      } else
        sum +=
          ((parseInt(p.product.price) * (100 - parseInt(p.product.off))) /
            100) *
          p.number;
    });

    return sum;
  };
  discountOfAllProducts = () => {
    let sum = 0;
    this.props.productsInCard.map((p) => {
      if (p.product.off !== null) {
        sum +=
          ((parseInt(p.product.price) * parseInt(p.product.off)) / 100) *
          p.number;
      }
    });

    return sum;
  };

  regularPriceOfAllProducts = () => {
    let sum = 0;
    this.props.productsInCard.map((p) => (sum += p.product.price * p.number));
    return sum;
  };
  //       increamentProduct=(product)=>{
  //         let {size,color}=product
  //         let {id}=product.product._id
  //       let index = this.props.productsInCard.findIndex(p=>p.size===size&& p.color===color && p.product._id===id);
  // this.props.increament(index)
  //       }
  render() {
    let { productsInCard, attribute } = this.props;
    let allAttributeItems = attribute;
    return (
      <HeaderFooter history={this.props.history}>
        <div className="container" >

          <div className="top__offer__category ">
            <img
              className="icon"
              src={require("./../../assets/icons/groceries.png")}
              alt="logo"
              />
              <span> سبد خرید</span>
          </div>

          <div className="whole__shopping__process">
            <div className="whole__right__box">
              <div className="right__box">
                {productsInCard.length > 0 &&
                  productsInCard.map((Oneproduct, index) => (
                    <div className="one__product" key={index}>
                      <div className="pic__product__left">
                      <Link to={`/product/${Oneproduct.product._id}/Review`}>
                      <img
                          src={
                            Oneproduct.product.productPic[
                              Object.keys(Oneproduct.product.productPic)[0]
                            ]
                          }
                          alt="main_image"
                        />
                                            </Link>
                      </div>
                      <div className="detail__product__right">
                        <div className="title__and__price">
                          <div className="title">
                          <Link to={`/product/${Oneproduct.product._id}/Review`}>
                            <span>{Oneproduct.product.title}</span>
                           </Link>
                            <span className="english__name">
                            <Link to={`/product/${Oneproduct.product._id}/Review`}>
                              {Oneproduct.product.title_En}
                              </Link>
                            </span>
                          </div>
                        </div>

                        <div className="product__detail">
                          <div className="one-line">
                            {Oneproduct.product._id && (
                              <div className="id">
                                <span className="title">آیدی:</span>
                                <span className="description">
                                  {Oneproduct.product._id.slice(
                                    Oneproduct.product._id.length - 9,
                                    Oneproduct.product._id.length
                                  )}{" "}
                                </span>
                              </div>
                            )}
                            <div className="brand">
                              <span className="title">برند:</span>
                              <span className="description">
                                {
                                  getAttributes(
                                    Oneproduct.product,
                                    allAttributeItems,
                                    4
                                  )[0].title
                                }
                              </span>
                            </div>
                          </div>
                          <div className="one-line">
                            <div className="waranty">
                              <span className="title">گارانتی:</span>
                              <span className="description">
                                {Oneproduct.product.guarantee.hasGuarantee &&
                                  Oneproduct.product.guarantee.guranteeName}
                                {!Oneproduct.product.guarantee.hasGuarantee &&
                                  "24 ساعت گارانتی سایت"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="color__and__size">
                          <div className="product__box__color">
                            <div className="title__color">
                              <span className="title">رنگ:</span>
                              <span className="choose">
                                {Oneproduct.color[0]}
                              </span>
                            </div>
                            <ul>
                              <li className={Oneproduct.color[1]}></li>
                            </ul>
                          </div>
                          <div className="product__box__size">
                            <div className="title__size">
                              <span className="title">سایز:</span>
                              <span className="choose">{Oneproduct.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="buttons">
                          <div className="number__product">
                            <button
                            disabled={this.disableButton(index,"max",Oneproduct.max)}

                              onClick={() =>
                                this.addOrSubtract(1, index, Oneproduct)
                              }
                            >
                              +
                            </button>
                            <span className="quantity">
                              {this.state.count[index]}
                            </span>
                            <button
                              disabled={this.disableButton(index,"min",Oneproduct.max)}
                              onClick={() =>
                                this.addOrSubtract(0, index, Oneproduct)
                              }
                            >
                              -
                            </button>
                          </div>

                          <div className="delete">
                            <img
                              alt="delete"
                              src={require("./../../assets/icons/ui.png")}
                              onClick={() => this.deleteProduct(Oneproduct)}
                            />
                          </div>
                          <div className="price">
                            <span>قیمت:</span>
                            {!Oneproduct.product.off && (
                              <div className="regular__price">
                                {`${
                                  Oneproduct.product.price * Oneproduct.number
                                } هزار تومان`}
                              </div>
                            )}
                            {Oneproduct.product.off && (
                              <div className="all__price">
                              <div className="regular2__price">
                              {`${
                                Oneproduct.product.price * Oneproduct.number
                              } هزار تومان`}
                            </div>
                              <div className="discount__price">
                                {Math.ceil(
                                  (parseInt(Oneproduct.product.price) *
                                    (100 - parseInt(Oneproduct.product.off))) /
                                    100
                                ) * Oneproduct.number}
                            &nbsp;
                                 هزار تومان
                              </div>
                          </div>
                            )}
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="left__box">
              <div className="numbers">
                <span>{`قیمت کالاها (${this.numberOfProdudcts()})`}</span>
                <span>{` ${this.numberWithCommas(this.regularPriceOfAllProducts())},000 تومان`}</span>
              </div>
              <div className="discounts">
                <span>{`تخفیف کالاها `}</span>
                {this.discountOfAllProducts()!==0&&
                <span>{`${this.numberWithCommas(this.discountOfAllProducts())},000 تومان`}</span>
                }
                {this.discountOfAllProducts()===0&&
                <span>بدون تخفیف</span>
                }
              </div>
              <div className="line2"></div>
              <div className="result first">
                <span>{`جمع کل  `}</span>
                
                <span>{`${this.numberWithCommas(this.priceOfAllProducts())},000 تومان`}</span>
              </div>
              <div className="result second">
                <span>{` هزینه ارسال  `}</span>
                <span>{`رایگان`}</span>
              </div>

              <div className="line2"></div>

              <div className="result third">
                <span>{`مبلغ قابل پرداخت `}</span>
                <span>{`${this.numberWithCommas(this.priceOfAllProducts())},000 تومان`}</span>
              </div>

              <button type="button" class="btn btn-info custom__button">
                ادامه فرایند خرید
              </button>
            </div>
          </div>
        </div>
      </HeaderFooter>
    );
  }
}

function mapStateToProps(state) {
  return {
    allproducts: state.api.apiProducts.list,
    productsInCard: state.addToCart.products,
    attribute: state.api.apiattributeItem.attributeItem,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    AddToBasket: (product, color, size, number) =>
      dispatch(tryToAddToCart(product, color, size, number)),
    deleteAllProduct: () => dispatch(deletAllProduct()),
    deleteOneProduct: (index) => dispatch(deleteSpeceficProduct({ index })),
    increamentOrDeacreament: (index, number) =>
      dispatch(increamentOrDeacreament({ index, number })),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(shoppingProcess);
