import React, { Component, Fragment } from "react";
import "./../../css/product.css";
import ImageGallery from "react-image-gallery";
import HeaderFooter from "../header__footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { WishList } from "./wish__list";
import RelatedProduct from "./related__product";
import Comment from "./comment";
import Specifications from "./Specifications";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  getAttributes,
  getStars,
  getcolors,
  changeImage,
  backToFirstImage,
  getSize,
  checkForStock,
} from "../common/functionsOfProducts";
import { Route, Link } from "react-router-dom";
import Review from "./review/Review";
import { loadattributeItem } from "../../redux-slicers/attributeItem";
import { loadAllProducts, addComment } from "../../redux-slicers/products";
import {
  tryToAddToCart,
  deleteSpeceficProduct,
} from "../../redux-slicers/addToCart";

class Product extends Component {
  state = {
    showIndex: false,
    showBullets: false,
    infinite: true,
    showThumbnails: true,
    showFullscreenButton: true,
    showGalleryFullscreenButton: true,
    showPlayButton: true,
    showGalleryPlayButton: true,
    showNav: true,
    isRTL: false,
    slideDuration: 450,
    slideInterval: 2000,
    slideOnThumbnailOver: false,
    thumbnailPosition: "bottom",
    showVideo: {},
    show__wirte__modal: false,
    product: undefined,
    CounterTime: [],
    count: 1,
    tabs: {
      review: false,
      specifications: false,
      comment: false,
    },
    comments: [],
    color: ["قرمز", "bg-orange"],
    size: "اسمال",
    categoryId: 0,
    choice: { color: {}, size: { description: "انتخاب کن" }, count: 100 },
  };
  setTabs = (name) => {
    let tabs = { Review: false, Specifications: false, Comment: false };
    tabs[name] = true;
    this.setState({ tabs });
  };

  componentDidMount() {
    let { allProducts, attribute } = this.props;
    const productId = this.props.match.params.id;
    let product = allProducts.filter((p) => p._id === productId);
    this.props.loadattributeItem();
    this.props.loadAllProducts();
    let comments = product[0].dailyRentalRate;
    let choice = { ...this.state.choice };
    choice.color = getcolors(product[0], attribute)[0];
    this.setState({ product: product[0], comments, choice });
  }
  setSize = (size) => {
    let choice = { ...this.state.choice };
    choice.size = size;
    let sizeColor = this.getSizeColor().filter(
      (a) => a.color.class === choice.color.class && a.size === size
    );
    choice.count = sizeColor[0].count;
    this.setState({ choice });
  };
  classNameOfSize = (size) => {
    let className = "regular2";
    let { choice } = this.state;
    let boolean = false;
    let sizeColor = this.getSizeColor().filter(
      (a) => a.color.class === choice.color.class && a.size === size
    );
    if (sizeColor[0]) {
      if (sizeColor[0].count === 0) {
        boolean = true;
      }
    }
    if (sizeColor.length === 0) boolean = true;

    if (size === choice.size) className += " chose";
    return { className, boolean };
  };
  setColor = (color) => {
    let choice = { ...this.state.choice };
    choice.color = color;
    choice.size = { description: "انتخاب کن" };
    choice.count = 100;
    this.setState({ choice });
  };
  classNameOfColor = (color) => {
    let className = color.class;
    if (color.class.trim() === this.state.choice.color.class.trim())
      className += " chose";
    return className;
  };
  getSizeColor = () => {
    if (this.state.product !== undefined) {
      let { categoryAttributes } = this.state.product;
      let { attribute } = this.props;
      let allSizeColor = [];
      let oneSizeColor = {};
      categoryAttributes.map((attribute) => {
        if (attribute.items[0].id == 1) {
          oneSizeColor.count = attribute.count;
          oneSizeColor.color = attribute.items[0].attItem;
          oneSizeColor.size = attribute.items[1].attItem;
          allSizeColor.push(oneSizeColor);
          oneSizeColor = {};
        }
      });
      let newAllSizeColor = [];
      let newOneSizeColor = {};
      allSizeColor.map((one) => {
        for (let index = 0; index < attribute.length; index++) {
          if (attribute[index].id == one.color)
            newOneSizeColor.color = attribute[index];
          if (attribute[index].id == one.size)
            newOneSizeColor.size = attribute[index];
        }
        newOneSizeColor.count = one.count;
        newAllSizeColor.push(newOneSizeColor);
        newOneSizeColor = {};
      });
      return newAllSizeColor;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const productId = this.props.match.params.id;
      let { allProducts, attribute } = this.props;
      let product = allProducts.filter((p) => p._id === productId);
      let comments = product[0].dailyRentalRate;
      let choice = { ...this.state.choice };
      choice.size = { description: "انتخاب کن" };
      choice.color = getcolors(product[0], attribute)[0];
      this.setState({ product: product[0], comments, choice });
      document.body.scrollTop = 180; // For Safari
      document.documentElement.scrollTop = 180; // For Chrome, Firefox, IE and Opera
      this.resetTabs();
    }
  }
  getPriceClasses2 = (product) => {
    let priceClasses = "poduct__price";
    priceClasses += product.off ? " before__discount__price" : "";
    // priceClasses += product.off && "discount__price";
    return priceClasses;
  };
  getClassNameOfTabs = (name) => {
    let className = "filter__title";
    let { tabs } = this.state;
    if (tabs[name] === true) className += " c-white bg-orange";
    return className;
  };

  resetTabs = () => {
    let tabs = { Review: true, Specifications: false, Comment: false };
    this.setState({ tabs });
  };

  getParents = () => {
    let { allCategories, allProducts } = this.props;
    let productId = this.props.match.params.id;
    let allParentsId = [];
    let nextParentId = [];
    let categoryId = allProducts.filter((c) => c._id === productId)[0]
      .categoryId;
    while (categoryId !== undefined) {
      let nextParentId = allCategories.filter((c) => c.id === categoryId)[0];
      if (nextParentId.parentId !== undefined) {
        allParentsId.push(nextParentId);
      }
      categoryId = nextParentId.parentId;
    }
    allParentsId.reverse();
    return allParentsId;
  };
  setImages = (product) => {
    let images = [];
    let newImages = { original: "", thumbnail: "" };
    for (let key in product.productPic) {
      newImages.original = product.productPic[key];
      newImages.thumbnail = product.productPic[key];
      images.push(newImages);
      newImages = [];
    }
    return images;
  };

  addToCard = () => {
    let { product, choice, count } = this.state;
    if (choice.size.description === "انتخاب کن") {
      toast.error(" سایز رو باید انتخاب کنی ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    toast.success("با موفقیت انداختیش تو سبد خریدت", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    let color = [choice.color.title.trim(), `bg-${choice.color.class}`];
    this.props.AddToBasket(
      product,
      color,
      choice.size.description,
      count,
      choice.count
    );
  };
  calculteDiscountTime = (product) => {
    let now = new Date();
    let discount = new Date(product.offerTime);
    let leftTime = discount - now;
    let status = leftTime > 0 ? true : false;

    let days = parseInt(leftTime / 86400000);
    let hours = parseInt((leftTime - days * 86400000) / 3600000);
    let minutes = parseInt(
      (leftTime - days * 86400000 - hours * 3600000) / 60000
    );
    let seconds = parseInt(
      (leftTime - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000
    );
    let result = [
      status,
      [
        ["روز", days],
        ["ساعت", hours],
        ["دقیقه", minutes],
        ["ثانیه", seconds],
      ],
    ];

    return result;
  };
  disableButton = (number) => {
    let { count } = this.state;
    let disable;
    if (number === "min") {
      if (count === 1) disable = true;
      else disable = false;
    }
    if (number === "max") {
      let { count: max } = this.state.choice;
      if (count === max) disable = true;
      else disable = false;
    }

    return disable;
  };

  adddRate = () => {
    let allProducts = [...this.props.allProducts];
    const productId = this.props.match.params.id;
    let product = allProducts.filter((p) => p._id === productId)[0];
    if (product !== undefined) {
      let comments = product.dailyRentalRate;
      let sum = 0;
      let numbers = comments.length;
      comments.map((c) => (sum += c.vote));
      let finalAaverage = 0;
      if (numbers !== 0) finalAaverage = sum / numbers;
      finalAaverage = finalAaverage.toFixed(1);
      finalAaverage = parseFloat(finalAaverage);

      let numberInStock = { ...product.numberInStock };
      numberInStock.visited += 1;
      numberInStock.popularity = finalAaverage;
      this.props.addRate(
        product.dailyRentalRate,
        product._id,
        product.title,
        numberInStock
      );
    }
  };
  classNameOfAddToCart=()=>{
    let className="add__to__cart"
    if(false){
      className+=" animation"
    }
    return className
  }

  render() {
    this.getSizeColor();

    this.adddRate();
    let { allCategories, attribute } = this.props;
    let allAttributeItems = attribute;
    let { product } = this.state;
    let status, time, brand, categoryId;

    if (product !== undefined) {
      status = this.calculteDiscountTime(product)[0];
      brand = getAttributes(product, allAttributeItems, 4)[0].title.trim();
      categoryId = product.categoryId;
    }
    if (status) {
      time = this.calculteDiscountTime(product)[1];
    }
    if(status){

    // setInterval(() => {
    //    this.setState({CounterTime:time});
    // }, 1000);
    }
    return (
      <HeaderFooter history={this.props.history}>
        <div className="main">
          <div className="top__page">
            <div className="container">
              <div className="breadcrumb1">
                {this.state.product !== undefined && (
                  <Breadcrumb>
                    <Breadcrumb.Item href="#">صفحه اصلی </Breadcrumb.Item>
                    {this.getParents().map((c) => {
                      if (c.id !== this.state.product.categoryId) {
                        return (
                          <Breadcrumb.Item>
                            <Link to={`/category/${c.id}`}>
                              &nbsp; {c.title}
                            </Link>
                          </Breadcrumb.Item>
                        );
                      } else {
                        return (
                          <Breadcrumb.Item active>
                            <Link to={`/last__category/${c.id}`}>
                              &nbsp; {c.title}
                            </Link>
                          </Breadcrumb.Item>
                        );
                      }
                    })}
                  </Breadcrumb>
                )}
              </div>
              {product !== undefined && (
                <div className="top__right__and__left">
                  <div className="detail__product__right">
                    <div className="title__and__price">
                      <div className="title">
                        <span>{product.title}</span>
                        <span className="english__name">
                          {product.title_En}
                        </span>
                      </div>
                      <div className="price">
                        <span className={this.getPriceClasses2(product)}>
                          {`${product.price} هزار تومان`}
                        </span>
                        {product.off && (
                          <Fragment>
                            <span className="discount__price">
                              {Math.ceil(
                                (parseInt(product.price) *
                                  (100 - parseInt(product.off))) /
                                  100
                              )}
                              هزار تومان
                            </span>
                            <span className="percentage__discount">
                              {product.off}
                            </span>
                            <div className="discount__icon ">
                              <img
                                src={require("./../../assets/icons/sale.png")}
                                alt="logo"
                              />
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                    <div className="review">
                      <ul>
                        {getStars(this.state.comments).map((star) => {
                          if (star >= 1) {
                            return (
                              <li className="star__icon">
                                <svg
                                  className="without__color positive "
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
                              <li className="star__icon">
                                <img
                                  src={require("./../../assets/icons/half-star.png")}
                                  alt="star"
                                  style={{ height: "22px", width: "22px" }}
                                />
                              </li>
                            );
                          }

                          if (star <= 0) {
                            return (
                              <li className="star__icon">
                                <svg
                                  className="without__color "
                                  viewBox="0 -10 511.98685 511"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                </svg>
                              </li>
                            );
                          }
                        })}
                      </ul>
                      {this.state.comments.length == 0 && <span>بدون نقد</span>}
                      {this.state.comments.length > 0 && (
                        <span>{`${this.state.comments.length} نقد`}</span>
                      )}
                    </div>
                    {status && (
                      <div className="the__box__of__discount">
                        <div className="title">
                          عجله کن! این تخفیف تموم میشه در:
                        </div>
                        <div className="discount__box">
                          {time.map((time) => (
                            <div className="box">
                              <span className="number">{time[1]}</span>
                              <span>{time[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="product__detail">
                      <div className="one-line">
                        {product._id && (
                          <div className="id">
                            <span className="title">آیدی:</span>
                            <span className="description">
                              {product._id.slice(
                                product._id.length - 9,
                                product._id.length
                              )}{" "}
                            </span>
                          </div>
                        )}
                        <Link to={`/last__category/1/optionalFilter=${brand}`}>
                          <div className="brand">
                            <span className="title">برند:</span>
                            <span className="description">{brand}</span>
                          </div>
                        </Link>
                        <Link to={`/last__category/${categoryId}`}>
                          <div className="category">
                            <span className="title ">دسته بندی: </span>
                            <span className="description">
                              {
                                allCategories.filter(
                                  (c) => c.id === product.categoryId
                                )[0].title
                              }
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="one-line">
                        <div className="waranty">
                          <span className="title">گارانتی:</span>
                          <span className="description">
                            {product.guarantee.hasGuarantee &&
                              product.guarantee.guranteeName}
                            {!product.guarantee.hasGuarantee &&
                              "24 ساعت گارانتی سایت"}
                          </span>
                        </div>
                        <div className="stock">
                          <span className="title">موجودی در انبار:</span>
                          {this.state.choice.count >= 20 && (
                            <span className="description">
                              {`بیش از ${this.state.choice.count} عدد`}
                            </span>
                          )}
                          {this.state.choice.count < 20 && (
                            <span
                              style={{ color: "red" }}
                              className="description"
                            >
                              {`تنها ${this.state.choice.count} عدد مانده`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="color__and__size">
                      <div className="product__box__color">
                        <div className="title__color">
                          <span className="title">رنگ:</span>
                          <span className="choose">
                            {this.state.choice.color.title.trim()}
                          </span>
                        </div>
                        <ul>
                          {getcolors(product, attribute).map((a) => (
                            <li
                              key={a.class}
                              className={this.classNameOfColor(a)}
                              onClick={() => {
                                this.setColor(a);
                              }}
                              // onMouseEnter={() =>
                              //   changeImage(product, 'index2', a.class, product._id)
                              // }
                              // onMouseLeave={() =>
                              //   backToFirstImage(product, 'index2', a.class, product._id)
                              // }
                            >
                              {/* <div className="out__of__stock"></div> */}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="product__box__size">
                        <div className="title__size">
                          <span className="title">سایز:</span>
                          <span className="choose">
                            {this.state.choice.size.description}
                          </span>
                        </div>
                        <ul>
                          {getSize(product, attribute).map((a) => {
                            if (!this.classNameOfSize(a).boolean) {
                              return (
                                <li
                                  className={this.classNameOfSize(a).className}
                                  onClick={() => {
                                    this.setSize(a);
                                  }}
                                >
                                  {" "}
                                  {a.title.trim()}
                                </li>
                              );
                            } else {
                              return (
                                <li className="not__allowed">
                                  {" "}
                                  {a.title.trim()}
                                  <div className="out__of__stock"></div>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="buttons">
                      <div className="wish__list">
                        <WishList />
                      </div>
                      {checkForStock(product) && (
                        <div
                          className={this.classNameOfAddToCart()}
                          onClick={() => {
                            this.addToCard();
                          }}
                        >
                          <img
                            className="icon"
                            src={require("./../../assets/icons/bag-4.png")}
                            alt=""
                          />
                          <span>بنداز تو سبد خرید</span>
                          <img
                            className="pluse"
                            src={require("./../../assets/icons/plus.png")}
                            alt=""
                          />
                        </div>
                      )}
                      {!checkForStock(product) && (
                        <span className="out__of__stock">
                          متاسفانه این کالا رو تموم کردیم
                        </span>
                      )}
                      {checkForStock(product) && (
                        <div className="number__product">
                          <button
                            className="button"
                            disabled={this.disableButton("max")}
                            onClick={() =>
                              this.setState({ count: this.state.count + 1 })
                            }
                          >
                            +
                          </button>
                          <span className="quantity">{this.state.count}</span>
                          <button
                            className="button"
                            disabled={this.disableButton("min")}
                            onClick={() =>
                              this.setState({ count: this.state.count - 1 })
                            }
                          >
                            -
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="guid">
                      <div className="size__info">
                        <img
                          className="icon"
                          src={require("./../../assets/icons/size-guide.png")}
                          alt=""
                        />
                        <span>جدول سایز</span>
                      </div>
                      <div className="shipping__info">
                        <img
                          className="icon"
                          src={require("./../../assets/icons/delivery-2.png")}
                          alt=""
                        />
                        <span>اطلاعات ارسال</span>
                      </div>
                      <div className="terms__of__returns">
                        <img
                          className="icon"
                          src={require("./../../assets/icons/box-4.png")}
                          alt=""
                        />
                        <span>شرایط پس دادن</span>
                      </div>
                    </div>
                    <div className="share">
                      <span>این کالا رو به اشتراک بذار:</span>
                      <img
                        className="icon1"
                        src={require("./../../assets/icons/telegram.png")}
                        alt=""
                      />
                      <img
                        className="icon1"
                        src={require("./../../assets/icons/whatsapp.png")}
                        alt=""
                      />
                      <img
                        className="icon1"
                        src={require("./../../assets/icons/gmail.png")}
                        alt=""
                      />
                      <img
                        className="icon1"
                        src={require("./../../assets/icons/twitter.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="image__galery__left">
                    <div className="galery">
                      <ImageGallery
                        items={this.setImages(product)}
                        infinite={this.state.infinite}
                        showBullets={this.state.showBullets}
                        showFullscreenButton={
                          this.state.showFullscreenButton &&
                          this.state.showGalleryFullscreenButton
                        }
                        showPlayButton={
                          this.state.showPlayButton &&
                          this.state.showGalleryPlayButton
                        }
                        showThumbnails={this.state.showThumbnails}
                        showIndex={this.state.showIndex}
                        showNav={this.state.showNav}
                        isRTL={this.state.isRTL}
                        thumbnailPosition={this.state.thumbnailPosition}
                        slideDuration={parseInt(this.state.slideDuration)}
                        slideInterval={parseInt(this.state.slideInterval)}
                        slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="middle__page">
            <RelatedProduct product={this.state.product}></RelatedProduct>
          </div>
          {product !== undefined && (
            <div className="buttom__page__tabs">
              <div className="container">
                <div className="tabs">
                  <div className="custom">
                    <Link to={`/product/${product._id}/Review`} className="tab">
                      <div className={this.getClassNameOfTabs("Review")}>
                        <img
                          className="title__icon"
                          src={require("./../../assets/icons/fun-glasses.png")}
                          alt=""
                        />

                        <span>نقد و بررسی</span>
                      </div>
                    </Link>
                    <Link
                      to={`/product/${product._id}/Specifications`}
                      className="tab"
                    >
                      <div
                        className={this.getClassNameOfTabs("Specifications")}
                      >
                        <img
                          className="title__icon"
                          src={require("./../../assets/icons/writing.png")}
                          alt=""
                        />
                        <span>مشخصات</span>
                      </div>
                    </Link>
                    <Link
                      to={`/product/${product._id}/Comment`}
                      className="tab"
                    >
                      <div className={this.getClassNameOfTabs("Comment")}>
                        <img
                          className="title__icon"
                          src={require("./../../assets/icons/interaction.png")}
                          alt=""
                        />
                        <span>نظرات</span>
                      </div>
                    </Link>
                  </div>
                </div>

                <Route
                  path="/product/:id/Specifications"
                  render={(props) => (
                    <Specifications
                      product={product}
                      setTabs={this.setTabs}
                      allAttribute={this.props.attribute}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/product/:id/Review"
                  render={(props) => (
                    <Review
                      product={product}
                      setTabs={this.setTabs}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/product/:id/Comment"
                  render={(props) => (
                    <Comment
                      product={product}
                      comments={this.state.comments}
                      setTabs={this.setTabs}
                      {...props}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </HeaderFooter>
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
  return {
    loadattributeItem: () => dispatch(loadattributeItem()),
    loadAllProducts: () => dispatch(loadAllProducts()),
    AddToBasket: (product, color, size, number, max) =>
      dispatch(tryToAddToCart(product, color, size, number, max)),
    deleteOneProduct: (index) => dispatch(deleteSpeceficProduct({ index })),
    addRate: (comment, productId, title, allRates) =>
      dispatch(addComment(comment, productId, title, allRates)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
