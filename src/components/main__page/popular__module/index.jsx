import React, { Component } from "react";
import "./../../../css/popular__module.css";
import Slider from "react-slick";
import { connect } from "react-redux";
import {
  getcolors,
  getPriceClasses,
  changeImage,
  backToFirstImage,
  findingChildren, checkForStock
} from "./../../common/functionsOfProducts";
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

class PopularModule extends Component {
  state = {
    allAttributeItemS: [],
    mostVisitedProduct: [],
    type: "",
    color: "",
  };

  getMOstVisitedProduct = () => {
    let { categoryId, type } = this.props;
    this.setState({ type });
    categoryId = parseInt(categoryId);
    if (isNaN(categoryId)) categoryId = 0;
    let { allProducts } = this.props;
    let { allCategories } = this.props;
    let allIdies = findingChildren(categoryId, allCategories);
    let products = [];
    allProducts=allProducts.filter(p=>checkForStock(p))
    allProducts.filter((p) => {
      for (let index = 0; index < allIdies.length; index++) {
        if (allIdies[index] == p.categoryId) products.push(p);
      }
    });

    let result = [];
    if (type === "visit") {
      result = products.map((p) => p.numberInStock.visited);
      this.setState({ color: "orange" });
    }
    if (type === "sold") {
      result = products.map((p) => p.numberInStock.sold);
      this.setState({ color: "blue" });
    }
    let number = [];
    if (result.length > 5) {
      while (number.length <= 5) {
        let max = Math.max(...result);
        number.push(...result.filter((m) => m === max));
        result = result.filter((m) => m !== max);
      }
    }
    number = [...new Set(number)];
    let finalResult = [];
    products.map((product) => {
      for (let index = 0; index < number.length; index++) {
        if (type === "visit") {
          if (number[index] === product.numberInStock.visited) {
            finalResult.push(product);
          }
        }
        if (type === "sold") {
          if (number[index] === product.numberInStock.sold) {
            finalResult.push(product);
          }
        }
      }
    });
    this.setState({ mostVisitedProduct: finalResult });
  };

  componentDidMount() {
    let attribute = this.props.attribute;
    let allAttributeItemS = attribute;
    this.setState({ allAttributeItemS });
    this.getMOstVisitedProduct();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryId !== this.props.categoryId)
      this.getMOstVisitedProduct();
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
    let { mostVisitedProduct: products, type, color } = this.state;
    let { categoryId } = this.props;


    return (
      <div className="last__offer">
        <div className="container">
          <div className="main__offer">
            <div className="top__offer">
              <div className={`top__offer__category ${color}`}>
                <img
                  className="icon"
                  src={require("./../../../assets/icons/fire.png")}
                  alt="logo"
                />
                {type === "visit" && <span> محصولات پر بازدید اخیر</span>}
                {type === "sold" && <span> محصولات پر فروش اخیر</span>}
                {type === "visit" &&
                <Link to={`/last__category/${categoryId}`}  className="plus">
           <span style={{fontSize:"29px",color:"white"}}> + </span>
           </Link>
           }
                           {type === "sold" &&
                <Link to={`/last__category/${categoryId}/order=numberInStock.sold_desc`} className="plus">
           <span style={{fontSize:"29px",color:"white"}}> + </span>
           </Link>
           }
              </div>
            </div>

            <div className="middle__offer__slider"></div>
            <div className="buttom__offer__slider">
              <Slider {...settings2}>
                {products.map((product, index) => (
                  <div className="one__product" key={product._id}>
                    {product.off && (
                      <div className="tag__discount">{product.off}</div>
                    )}
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
                          id={`popular${product._id}`}
                        />
                      </div>
                    </Link>
                    <div className="product__detail">
                      <div className="product__box__color">
                        <ul>
                          {getcolors(product, this.state.allAttributeItemS).map(
                            (a) => (
                              <li
                                key={a.class}
                                className={a.class}
                                onMouseEnter={() =>
                                  changeImage(
                                    product,
                                    index,
                                    a.class,
                                    `popular${product._id}`
                                  )
                                }
                                onMouseLeave={() =>
                                  backToFirstImage(
                                    product,
                                    index,
                                    a.class,
                                    `popular${product._id}`
                                  )
                                }
                              ></li>
                            )
                          )}
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
                                            <Link to={`/product/${product._id}`}>
                        <span className="add__to__cart">
                          بریم ببینیم این کالا رو
                        </span>
                          </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
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
    attribute: state.api.apiattributeItem.attributeItem,
    allCategories: state.api.apiattributeItem.categories,
  };
}

export default connect(mapStateToProps, null)(PopularModule);
