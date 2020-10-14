import React, { Component, Fragment } from "react";
import "./../../../css/right__filters.css";
import Accordion from "react-bootstrap/Accordion";
import Input from "../../common/input";
import { getcolors,getAttributes } from "./../../common/functionsOfProducts";

class RightFilters extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    this.getCategory();
    this.getChildren();
  }

  getCategory = () => {
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
  getRangeOfPrice = (number, first, second) => {
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
    if (range.length > 0) return true;
    else if (RangePriceClassName[number].status) return true;
    else return false;
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
    console.log(className);
    return className;
  };
  getClassnameOfAccordian = (status) => {
    let className = "title__icon";
    if (status) {
      className += " close__accordian";
    }
    console.log(className);
    return className;
  };
  getRangeOfColor = () => {
    let {
      filtered,
      searchWords,
      products,
      allAttributeItemS,
      listOfColors2,
    } = this.props;
    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
      final = filtered;
    }
    let allColors = [];
    final.map((p) => allColors.push(...getcolors(p, allAttributeItemS)));
    let allofColors = [];
    products.map((p) => allofColors.push(...getcolors(p, allAttributeItemS)));
    let finalAdd = [];
    let add = listOfColors2.filter((c) => c.status === true);
    if (add.length > 0) {
      allofColors.map((c) => {
        for (let index = 0; index < add.length; index++) {
          if (c.class === add[index].name) finalAdd.push(c);
        }
      });
    }

    allColors.push(...finalAdd);
    allColors = [...new Set(allColors)];
    return allColors;
  };

  getClassnameOfColor = (name) => {
    let { listOfColors2 } = this.props;
    let oneColor = listOfColors2.filter((n) => n.name === name);
    let className = "check__box__image";
    if (oneColor.length > 0) {
      if (oneColor[0].status) {
        className += " visible";
      }
      console.log(className);
    }
    return className;
  };

  getAllAttributes=()=>{
    let {
      filtered,
      searchWords,
      products,
      allAttributeItemS,
      allAttributesSelected
    } = this.props;
let numberOfIdOfAttributes=[
  {name:"سایز" , id:2},
  {name:"جنس " , id:3},
  {name:"برند" , id:4},
  {name:"گروه سنی" , id:5},
  {name:"مناسب برای فصل" , id:6},
  {name:"تن خور " , id:7},
  {name:"نوع آستین" , id:8},

]
let final = [];
if (searchWords.length === 0) {
  final = products;
} else if (searchWords.length > 0) {
  final = filtered;
}
numberOfIdOfAttributes.map(att=>(


))
    let add=[]
    for (let key in allAttributesSelected) 
    if(allAttributesSelected[key]===true) add.push(key) 
let allOfSizes =[]
products.map((p) => allOfSizes.push(...getAttributes(p, allAttributeItemS,2)));
let finalAdd=[]
if (add.length > 0) {
  allOfSizes.map((c) => {
    for (let index = 0; index < add.length; index++) {
      if (c.title === add[index]) finalAdd.push(c);
    }
  });
}
    let allSizes=[]
      final.map((p) => allSizes.push(...getAttributes(p, allAttributeItemS,2)));
    console.log(allSizes);
    allSizes.push(...finalAdd);
    allSizes = [...new Set(allSizes)];
console.log(allSizes);

    let allAttributes=[];
    allAttributes.push(allSizes)
    console.log("amiiiiiiiiir",allAttributes);
    allAttributes = [...new Set(allAttributes)];
   
    return allAttributes
  }

  getClassnameOfallAttribiutes=(name)=>{
    let {allAttributesSelected}=this.props
    let className="check__box__image"
if (allAttributesSelected[name]===true){
  className+=" visible"

}
return className
  }
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
      color,
      handleColor,
      accordian,
      handleAccordian,
      handleAllAttributes
    } = this.props;
    return (
      <div className="right__search__filters">
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

                {this.getCategory() && <span>{this.getCategory().title}</span>}
              </li>
              {this.getChildren() &&
                this.getChildren().map((child) => (
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
                ))}
            </ul>
          </div>
        </div>
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
              {this.getRangeOfPrice("first", 1, 99) && (
                <li onClick={() => handleFilterOfPrice("first")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.first.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>زیر 100 تومان</span>
                </li>
              )}

              {this.getRangeOfPrice("second", 100, 149) && (
                <li onClick={() => handleFilterOfPrice("second")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.second.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>بین 100 تا 150 تومان</span>
                </li>
              )}

              {this.getRangeOfPrice("third", 150, 199) && (
                <li onClick={() => handleFilterOfPrice("third")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.third.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>بین 150 تا 200 تومان</span>
                </li>
              )}
              {this.getRangeOfPrice("forth", 200, 249) && (
                <li onClick={() => handleFilterOfPrice("forth")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.forth.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>بین 200 تا 250 تومان</span>
                </li>
              )}
              {this.getRangeOfPrice("fifth", 250, 299) && (
                <li onClick={() => handleFilterOfPrice("fifth")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.fifth.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>بین 250 تا 300 تومان</span>
                </li>
              )}
              {this.getRangeOfPrice("sixth", 300, 2000) && (
                <li onClick={() => handleFilterOfPrice("sixth")}>
                  <div className="check__box">
                    <div className="main__check__box">
                      <img
                        className={this.getClassnameOfBox(
                          RangePriceClassName.sixth.status
                        )}
                        src={require("./../../../assets/icons/tick_g.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <span>بالای 300 تومان</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* next__filter */}
        <div className="filter__4__categories">
          <div className="filter__title">
            <span>محدود کردن جستجو</span>
          </div>
          <div className="filter__content">
            <div onClick={() => handleStock(true)} className="whole__filter__1">
              <div className="main__box">
                <div
                  className={this.getClassnameOfStockandDiscount(stock)}
                ></div>
              </div>
              <span>فقط کالاهای موجود</span>
            </div>
            <div
              onClick={() => handleDiscount(true)}
              className="whole__filter__1"
            >
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
                  className={this.getClassnameOfAccordian(
                    accordian.color.status
                  )}
                  src={require("./../../../assets/icons/play.png")}
                  alt=""
                />
                <span>رنگ</span>
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <div className="filter__content">
                <ul>
                  {this.getRangeOfColor().map((c, index) => (
                    <li onClick={() => handleColor(c.class, c)}>
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
       {this.getAllAttributes().map(Attribut=>(
       <div className="filter__6__categories ">
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle eventKey="0">
              <div
                className="filter__title"
                onClick={() => {
                  handleAccordian("size");
                }}
              >
                <img
                  className={this.getClassnameOfAccordian(
                    accordian.size.status
                  )}
                  src={require("./../../../assets/icons/play.png")}
                  alt=""
                />
                <span>سایز</span>
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <div className="filter__content">
                <ul>
       {Attribut.map((item)=>(
                  <li
                  onClick={()=>handleAllAttributes("sizee",100,2,item.title,item)}
                  >
                    <div className="check__box">
                      <div className="main__check__box">
                        <img
                          className={this.getClassnameOfallAttribiutes(item.title)}
                          src={require("./../../../assets/icons/tick_g.png")}
                          alt=""
                        />
                      </div>
                    </div>

                    <span>{item.description}</span>
                  </li>
       ))}
                </ul>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
       ))}
      </div>
    );
  }
}

export default RightFilters;



{this.getRangeOfPrice("second", 100, 149) && (
  <li onClick={() => handleFilterOfPrice("second")}>
    <div className="check__box">
      <div className="main__check__box">
        <img
          className={this.getClassnameOfBox(
            RangePriceClassName.second.status
          )}
          src={require("./../../../assets/icons/tick_g.png")}
          alt=""
        />
      </div>
    </div>

    <span>بین 100 تا 150 تومان</span>
  </li>
)}

{this.getRangeOfPrice("third", 150, 199) && (
  <li onClick={() => handleFilterOfPrice("third")}>
    <div className="check__box">
      <div className="main__check__box">
        <img
          className={this.getClassnameOfBox(
            RangePriceClassName.third.status
          )}
          src={require("./../../../assets/icons/tick_g.png")}
          alt=""
        />
      </div>
    </div>

    <span>بین 150 تا 200 تومان</span>
  </li>
)}
{this.getRangeOfPrice("forth", 200, 249) && (
  <li onClick={() => handleFilterOfPrice("forth")}>
    <div className="check__box">
      <div className="main__check__box">
        <img
          className={this.getClassnameOfBox(
            RangePriceClassName.forth.status
          )}
          src={require("./../../../assets/icons/tick_g.png")}
          alt=""
        />
      </div>
    </div>

    <span>بین 200 تا 250 تومان</span>
  </li>
)}
{this.getRangeOfPrice("fifth", 250, 299) && (
  <li onClick={() => handleFilterOfPrice("fifth")}>
    <div className="check__box">
      <div className="main__check__box">
        <img
          className={this.getClassnameOfBox(
            RangePriceClassName.fifth.status
          )}
          src={require("./../../../assets/icons/tick_g.png")}
          alt=""
        />
      </div>
    </div>

    <span>بین 250 تا 300 تومان</span>
  </li>
)}
{this.getRangeOfPrice("sixth", 300, 2000) && (
  <li onClick={() => handleFilterOfPrice("sixth")}>
    <div className="check__box">
      <div className="main__check__box">
        <img
          className={this.getClassnameOfBox(
            RangePriceClassName.sixth.status
          )}
          src={require("./../../../assets/icons/tick_g.png")}
          alt=""
        />
      </div>
    </div>

    <span>بالای 300 تومان</span>
  </li>
)}