import "./../../../css/related__product.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { checkForStock, getcolors, getPriceClasses } from "./../../common/functionsOfProducts";
import { Link } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

class RelatedProduct extends Component {
  state = {
    allAttributeItemS: [],
    getRelatedProduct: [],
    fake: "",
  };
  image = React.createRef();

  getRelatedProduct = () => {
    let { allProducts, product } = this.props;
    let category = allProducts.filter(
      (p) => p.categoryId === product.categoryId
    );
    let result = category.filter((p) => p._id !== product._id);
    result=result.filter(p=>checkForStock(p))
    return result;
  };

  changeImage = (product, index, color) => {
    if (product.productPic[color] !== undefined) {
      let image = document.getElementById(`number${index}`);
      image.src = product.productPic[color];
    }
  };
  backToFirstImage = (product, index, color) => {
    let image = document.getElementById(`number${index}`);
    image.src = product.productPic[Object.keys(product.productPic)[0]];
  };
  componentDidMount() {
    let attribute = this.props.attribute;
    let allAttributeItemS = attribute;
    this.setState({ allAttributeItemS });
  }

  render() {
    var settings2 = {
      rtl: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    let products = [];
    if (this.props.product !== undefined) {
      products = this.getRelatedProduct();
    }

    return (
      <div className="last__offer">
        <div className="container">
          <div className="main__offer">
            <div className="top__offer">
              <div className="top__offer__category orange">
                <img
                  className="icon"
                  src={require("./../../../assets/icons/product-2.png")}
                  alt="logo"
                />
                <span> محصولات مرتبط</span>
              </div>
            </div>

            <div className="middle__offer__slider"></div>
            {products.length > 0 && (
              <div className="buttom__offer__slider">
                <Slider {...settings2}>
                  {products.map((product, index) => (
                    <div className="one__product" key={index}>
                      {product.off && <div className="tag__discount">{product.off}</div>}
                      <Link to={`/product/${product._id}/Review`}>
                        <div className="product__images">
                          <div className="overlay__name">
                            <span>
                              {product.title.slice(0, 29)}
                              {product.title.length > 28 && <span> ...</span>}
                            </span>
                          </div>
                          <img
                            src={
                              product.productPic[
                                Object.keys(product.productPic)[0]
                              ]
                            }
                            alt="main_image"
                            id={`number${index}`}
                          />
                        </div>
                      </Link>

                      <div className="product__detail">
                        <div className="product__box__color">
                          <ul>
                            {getcolors(
                              product,
                              this.state.allAttributeItemS
                            ).map((a,index2) => (
                              <li
                              key={index2}
                                className={a.class}
                                onMouseEnter={() =>
                                  this.changeImage(product, index, a.class)
                                }
                                onMouseLeave={() =>
                                  this.backToFirstImage(product, index, a.class)
                                }
                              ></li>
                            ))}
                          </ul>
                        </div>

                        <div className="product__price__and__icon">
                          <div className="icon__basket">
                            <img
                              className="add__basket"
                              src={require("./../../../assets/icons/bag-4.png")}
                              alt=""
                            />
                            <img
                              className="pluse"
                              src={require("./../../../assets/icons/plus.png")}
                              alt=""
                            />
                          </div>
                          <span className={getPriceClasses(product)}>
                            {product.price} هزار تومان
                          </span>
                          {product.off && (
                            <span className="discount__price__main">
                              {(parseInt(product.price) *
                                (100 - parseInt(product.off))) /
                                100}
                              هزار تومان
                            </span>
                          )}
                                                <Link to={`/product/${product._id}/Review`}>

                          <span className="add__to__cart">
                            بریم ببینیم این کالا رو{" "}
                          </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    allProducts: state.api.apiProducts.list,
    attribute: state.api.apiattributeItem.attributeItem,
    allCategories: state.api.apiattributeItem.categories,
  };
}


export default connect(mapStateToProps, null)(RelatedProduct);
