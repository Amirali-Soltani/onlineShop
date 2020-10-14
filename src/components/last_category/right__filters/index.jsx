import React, { Component, Fragment } from "react";
import "./../../../css/right__filters.css";
import Accordion from "react-bootstrap/Accordion";
import Input from "../../common/input";
import { getcolors, getAttributes } from "./../../common/functionsOfProducts";
import { Link } from "react-router-dom";

class RightFilters extends Component {
  state = {
    initialAccordion: {},
  };

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.optionalFilters!==this.props.optionalFilters) this.importURlFilters();
    this.getCategory();
    this.getChildren();
  }

  getCategoryFirst = () => {
    let { allCategories, categoryId } = this.props;
    let result = allCategories.filter((c) => c.id === categoryId);
    let category = result[0];
    return category;
  };
  getChildren = () => {
    let { allCategories, categoryId } = this.props;
    let children = allCategories.filter((c) => c.parentId === categoryId);
    return children;
  };
  getRangeOfPrice = (number, first, second, index) => {
    let { filtered, searchWords, products, RangePriceClassName } = this.props;

    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
      final = filtered;
    }
    let prices = [];
    final.map((p) =>
      p.off
        ? prices.push((parseInt(p.price) * (100 - parseInt(p.off))) / 100)
        : prices.push(p.price)
    );
    let range = prices.filter((p) => p <= second && p >= first);
    if (range.length > 0) {
      return true;
    } else if (RangePriceClassName[index].status) {
      return true;
    } else {
      return false;
    }
  };

  getClassnameOfBox = (status) => {
    let className = "check__box__image";
    if (status) {
      className += " visible";
    }
    //  className+= status && " visible"
    return className;
  };

  getClassnameOfStockandDiscount = (status) => {
    let className = "move__box";
    if (status) {
      className += " bg-orange left2px";
    }
    return className;
  };
  getClassnameOfAccordian = (name) => {
    let className = "title__icon";
    let { accordian, initialAccordion } = this.props;
    // let initialAccordion={...this.state.initialAccordion}
    if (initialAccordion[name] === true) {
      initialAccordion[name] = false;
      className = "title__icon";
      // this.setState({initialAccordion});
    } else if (accordian[name]) {
      if (accordian[name] === true) {
        className += " close__accordian";
      }
    }
    return className;
  };

  getClassnameOfColor = (name) => {
    let { listOfColors } = this.props;
    let className = "check__box__image";
    if (listOfColors[name] !== undefined) {
      if (listOfColors[name] === true) {
        className += " visible";
      }
    }
    return className;
  };

  getClassnameOfallAttribiutes = (name) => {
    let { allAttributesSelected } = this.props;
    let className = "check__box__image";
    if (allAttributesSelected[name] === true) {
      className += " visible";
    }
    return className;
  };
  getCategory = () => {
    let { allCategories, products, originalSearch } = this.props;
    let child = [];
    let parent = [];
    products = products.filter(
      (m) =>
        m.title.toLowerCase().includes(originalSearch.toLowerCase()) ||
        m.title_En.toLowerCase().includes(originalSearch.toLowerCase())
    );
    allCategories.filter((c) => {
      for (let index = 0; index < products.length; index++) {
        if (c.id === products[index].categoryId) {
          child.push(c);
          parent.push(this.getParent(c));
        }
      }
    });
    child = [...new Set(child)];
    parent = [...new Set(parent)];
    return { parent, child };
  };
  getParent = (category) => {
    let parentId = category.parentId;
    let { allCategories } = this.props;
    let parent = allCategories.filter((c) => c.id === parentId);
    return parent[0];
  };

  getchildrene = (parent) => {
    let { allCategories } = this.props;
    let allchildrene = allCategories.filter((c) => c.parentId === parent.id);
    let child = this.getCategory().child;
    let childrene = allchildrene.filter((value) => child.includes(value));
    return childrene;
  };

  renderInput(name, label, placeholder, ref, className, type = "text") {
    const { searchBoxValue, handleValue } = this.props;

    return (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={searchBoxValue[name]}
        label={label}
        onChange={handleValue}
        ref={ref}
        className={className}
      />
    );
  }

  render() {
    let {
      RangePriceClassName,
      handleFilterOfPrice,
      handleStock,
      stock,
      discount,
      handleDiscount,
      handleColor,
      handleAccordian,
      handleAllAttributes,
      getRangeOfColor,
      getAllAttributes,
      handleAllClick,
      handelAllAttributesClick,
      handelPriceClick,
      handelClickInStock,
      handelClickDiscount,
      handelColorClick,
      PresentURL,
      categoryId,
      originalSearch,
    } = this.props;
    let others = [];
    others = getAllAttributes();
    return (
      <div className="right__search__filters">
        {categoryId !== 0 && (
          <div className="filter__1__categories">
            <div className="filter__title">
              <span> در این دسته بندی هستید</span>
            </div>
            <div className="filter__content">
              <ul>
                <li>
                  <div className="check__box ">
                    <div className="main__check__box">
                      <img
                        className="check__box__image visible"
                        src={require("./../../../assets/icons/tick.png")}
                        alt=""
                      />
                    </div>
                  </div>
                  <img
                    className="arrow"
                    src={require("./../../../assets/icons/play.png")}
                    alt=""
                  />

                  {this.getCategoryFirst() && (
                    <span>{this.getCategoryFirst().title}</span>
                  )}
                </li>
                {this.getChildren() &&
                  this.getChildren().map((child, index) => (
                    <Link
                      to={`/last__category/${child.id}/${PresentURL.stringFilter}`}
                      key={index}
                    >
                      <li className="last__category">
                        <div className="check__box">
                          <div className="main__check__box">
                            <img
                              className="check__box__image"
                              src={require("./../../../assets/icons/tick.png")}
                              alt=""
                            />
                          </div>
                        </div>
                        <img
                          className="arrow last__category__icon"
                          src={require("./../../../assets/icons/play.png")}
                          alt=""
                        />
                        <span>{child.title}</span>
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        )}
        {categoryId === 0 && (
          <div className="filter__1__categories">
            <div className="filter__title">
              <span> دسته بندی های یافت شده</span>
            </div>
            <div className="filter__content">
              {this.getCategory() && (
                <Fragment>
                  {this.getCategory().parent.map((parent) => (
                    <ul>
                      <Link
                        to={`/last__category/${parent.id}/${PresentURL.stringFilter}`}
                      >
                        <li>
                          <div className="check__box ">
                            <div className="main__check__box">
                              <img
                                className="check__box__image visible"
                                src={require("./../../../assets/icons/tick.png")}
                                alt=""
                              />
                            </div>
                          </div>
                          <img
                            className="arrow"
                            src={require("./../../../assets/icons/play.png")}
                            alt=""
                          />
                          <span>{parent.title}</span>
                        </li>
                      </Link>

                      {this.getchildrene(parent).map((child) => (
                        <Link
                          to={`/last__category/${child.id}/${PresentURL.stringFilter}`}
                        >
                          <li className="last__category">
                            <div className="check__box">
                              <div className="main__check__box">
                                <img
                                  className="check__box__image"
                                  src={require("./../../../assets/icons/tick.png")}
                                  alt=""
                                />
                              </div>
                            </div>
                            <img
                              className="arrow last__category__icon"
                              src={require("./../../../assets/icons/play.png")}
                              alt=""
                            />
                            <span>{child.title}</span>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ))}
                </Fragment>
              )}
            </div>
          </div>
        )}
        {/* next__filter */}
        <div className="filter__2__categories">
          <div className="filter__title">
            <span>جستجو در نتایج</span>
          </div>
          <div className="filter__content">
            {this.renderInput(
              "internalSearchBox",
              null,
              "",
              this.searchBox,
              "search__input form-control"
            )}
            <img
              className="icon__search"
              src={require("./../../../assets/icons/search-3.png")}
              alt=""
            />
          </div>
        </div>
        {/* next__filter */}
        <div className="filter__3__categories">
          <div className="filter__title">
            <span>محدوده قیمت مورد نظر</span>
          </div>
          <div className="filter__content">
            <ul>
              {RangePriceClassName.map((range, index) => (
                <Fragment key={index}>
                  {this.getRangeOfPrice(
                    range.name,
                    range.firtRange,
                    range.secondRange,
                    index
                  ) && (
                    // <li onClick={() => handleFilterOfPrice(index)}>
                    <li onClick={() => handelPriceClick(index)}>
                      <div className="check__box">
                        <div className="main__check__box">
                          <img
                            className={this.getClassnameOfBox(
                              RangePriceClassName[index].status
                            )}
                            src={require("./../../../assets/icons/tick_g.png")}
                            alt=""
                          />
                        </div>
                      </div>
                      {index === 0 && (
                        <span>{`زیر ${range.secondRange} هزار تومان`}</span>
                      )}
                      {index === RangePriceClassName.length - 1 && (
                        <span>{`بالای ${range.firtRange} هزار تومان`}</span>
                      )}
                      {index === 1 && (
                        <span>
                          {`بین ${range.firtRange} تا ${
                            range.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {index === 2 && (
                        <span>
                          {`بین ${range.firtRange} تا ${
                            range.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {index === 3 && (
                        <span>
                          {`بین ${range.firtRange} تا ${
                            range.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {index === 4 && (
                        <span>
                          {`بین ${range.firtRange} تا ${
                            range.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>

        {/* next__filter */}
        <div className="filter__4__categories">
          <div className="filter__title">
            <span>محدود کردن جستجو</span>
          </div>
          <div className="filter__content">
            <div onClick={handelClickInStock} className="whole__filter__1">
              <div className="main__box">
                <div
                  className={this.getClassnameOfStockandDiscount(stock)}
                ></div>
              </div>
              <span>فقط کالاهای موجود</span>
            </div>
            <div onClick={handelClickDiscount} className="whole__filter__1">
              <div className="main__box">
                <div
                  className={this.getClassnameOfStockandDiscount(discount)}
                ></div>
              </div>
              <span>فقط کالاهای با تخفیف</span>
            </div>
          </div>
        </div>

        {/* next__filter */}
        <div className="filter__5__categories">
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle eventKey="0">
              <div
                className="filter__title"
                onClick={() => {
                  handleAccordian("color");
                }}
              >
                <img
                  className={this.getClassnameOfAccordian("color")}
                  src={require("./../../../assets/icons/play2.png")}
                  alt=""
                />
                <span>رنگ</span>
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <div className="filter__content">
                <ul>
                  {getRangeOfColor().map((c, index) => (
                    <li onClick={() => handelColorClick(c)} key={index}>
                      {/* <li onClick={() => handleColor(c.class, c)} key={index}> */}

                      <div className="check__box__color">
                        <div className={`main__check__box ${c.class}`}>
                          <img
                            className={this.getClassnameOfColor(c.class)}
                            src={require("./../../../assets/icons/tick-gray.png")}
                            alt=""
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
        {/* next__filter */}
        {categoryId !== 0 &&
          others.map((Attribut, index) => (
            <Fragment>
              {Attribut[0].length > 0 && (
                <div className="filter__6__categories ">
                  <Accordion>
                    <Accordion.Toggle eventKey="0">
                      <div
                        className="filter__title"
                        onClick={() => {
                          handleAccordian(Attribut[1].name);
                        }}
                      >
                        <img
                          className={this.getClassnameOfAccordian(
                            Attribut[1].name
                          )}
                          src={require("./../../../assets/icons/play2.png")}
                          alt=""
                        />
                        <span>{Attribut[1].name}</span>
                      </div>
                    </Accordion.Toggle>

                    <Accordion.Collapse
                      eventKey="0"
                      // className={this.checkFilter(Attribut[1].name)}
                    >
                      <div className="filter__content">
                        <ul>
                          {Attribut[0].map((item) => (
                            <li
                              onClick={() =>
                                handelAllAttributesClick(
                                  Attribut[1].name,
                                  index,
                                  Attribut[1].id,
                                  item.title,
                                  item
                                )
                              }
                            >
                              <div className="check__box">
                                <div className="main__check__box">
                                  <img
                                    className={this.getClassnameOfallAttribiutes(
                                      item.title
                                    )}
                                    src={require("./../../../assets/icons/tick_g.png")}
                                    alt=""
                                  />
                                </div>
                              </div>

                              <span>{item.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    );
  }
}

export default RightFilters;
