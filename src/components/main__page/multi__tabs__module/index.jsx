import React, { Component } from "react";
import Slider from "react-slick";
import "./../../../css/multi__tabs__module.css";
import { connect } from "react-redux";
import { loadattributeItem } from "../../../redux-slicers/attributeItem";
import {
  getSpecificProduct,
  loadAllProducts,
} from "../../../redux-slicers/products";
import {
  getStars,
  changeImage,
  backToFirstImage,
  getcolors,
  getPriceClasses, checkForStock
} from "../../common/functionsOfProducts";
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

class MultiTabsModule extends Component {
  state = {
    allAttributeItemS: [],
    multitabCategories: [],
    multitabsProduct: [],
    show: 7,
    line: "bg-lemon",
  };

  getCategories = () => {
    let allCategories = this.props.categories;
    let choises = [16, 12, 8, 7, 11];
    const multitabCategories = [];
    allCategories.map((category) => {
      for (let index = 0; index < choises.length; index++) {
        if (category.id === choises[index]) {
          multitabCategories.push(category);
        }
      }
    });
    this.setState({ multitabCategories });
  };

  getProducts = (category) => {
    let producysOfCategory = this.props.productsOfSpecificCategory(category.id);
    producysOfCategory=producysOfCategory.filter(p=>checkForStock(p))
    this.setState({
      multitabsProduct: producysOfCategory,
      show: category.id,
      line: category.backgroundcolor,
    });
  };

  componentDidMount() {
    this.props.loadattributeItem();
    this.getCategories();
    let allAttributeItemS = this.props.attribute;
    let multitabsProduct = this.props.productsOfSpecificCategory(7);
    this.setState({ multitabsProduct, allAttributeItemS });
  }

  render() {
    let allAttributeItemS = this.props.attribute;
    var settings2 = {
      rtl: true,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div className="amazing__offer">
        <div className="container">
          <div className="main__offer">
            <div className="top__offer">
              {this.state.multitabCategories.map((category) => (
                <div
                  onClick={() => this.getProducts(category)}
                  className={`top__offer__category ${category.backgroundcolor}`}
                  key={category.id}
                >
                  <img className="icon" src={category.iconPic} alt="category" />
                  <span> {category.title}</span>
                  {this.state.show === category.id && (
                    <svg
                      className={`arrow arrow__${category.backgroundcolor}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 494.148 494.148"
                      space="preserve"
                    >
                      <path
                        d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
			c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
			C432.632,229.572,422.964,213.288,405.284,201.188z"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="middle__offer__slider">
              <div className={`line ${this.state.line}`}></div>
            </div>

            <div className="buttom__offer__slider">
              <Slider {...settings2}>
                {this.state.multitabsProduct.map((product, index) => (
                  <div className="one__product" key={product._id}>
                    {product.off && (
                      <div className="tag__discount">{product.off}</div>
                    )}
                    <Link to={`/product/${product._id}/Review`}>
                      <div className="product__images">
                        <div className="overlay">
                          <div className="product__star">
                            <ul>
                              {getStars(product.dailyRentalRate).map(
                                (star, index) => {
                                  if (star >= 1) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color positive number${
                                            5 - index
                                          } `}
                                          style={{ zIndex: `${5 - index}` }}
                                          viewBox="0 -10 511.98685 511"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                        </svg>
                                      </li>
                                    );
                                  }
                                  if (star > 0 && star < 1) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <img
                                          className={`without__color number${
                                            5 - index
                                          } `}
                                          src={require("./../../../assets/icons/half-star-2.png")}
                                          alt="star"
                                          style={{
                                            height: "25px",
                                            width: "24px",
                                          }}
                                        />
                                      </li>
                                    );
                                  }

                                  if (star <= 0) {
                                    return (
                                      <li className="star__icon" key={index}>
                                        <svg
                                          className={`without__color number${
                                            5 - index
                                          } `}
                                          viewBox="0 -10 511.98685 511"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                        </svg>
                                      </li>
                                    );
                                  }
                                }
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="pic">
                          <img
                            className="main__pic"
                            src={
                              product.productPic[
                                Object.keys(product.productPic)[0]
                              ]
                            }
                            alt="product"
                            id={`multi${product._id}`}
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="product__detail">
                      <div className="product__box__color">
                        <ul>
                          {getcolors(product, allAttributeItemS).map((a) => (
                            <li
                              key={a.class}
                              className={a.class}
                              onMouseEnter={() =>
                                changeImage(
                                  product,
                                  index,
                                  a.class,
                                  `multi${product._id}`
                                )
                              }
                              onMouseLeave={() =>
                                backToFirstImage(
                                  product,
                                  index,
                                  a.class,
                                  `multi${product._id}`
                                )
                              }
                            ></li>
                          ))}
                        </ul>
                      </div>

                      <div className="product__name">
                        {product.title.slice(0, 32)}
                        {product.title.length > 31 && <span> ...</span>}
                      </div>
                      <div className="product__price__and__icon">
                        <span className={getPriceClasses(product)}>
                          {product.price} هزار تومان
                        </span>

                        {product.off && (
                          <span className="discount">
                            {(parseInt(product.price) *
                              (100 - parseInt(product.off))) /
                              100}{" "}
                            هزار تومان
                          </span>
                        )}
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
    loginState: state.authorization.isLoggedIn.login,
    products: state.api.apiProducts.list,
    attribute: state.api.apiattributeItem.attributeItem,
    categories: state.api.apiattributeItem.categories,

    productsOfSpecificCategory: (categoryId) =>
      getSpecificProduct(categoryId)(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadattributeItem: () => dispatch(loadattributeItem()),
    loadAllProducts: () => dispatch(loadAllProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiTabsModule);
