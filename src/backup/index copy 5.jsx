import React, { Component, Fragment } from "react";
import "./../../../css/right__filters.css";
import Accordion from "react-bootstrap/Accordion";
import Input from "../../common/input";
import { getcolors, getAttributes } from "./../../common/functionsOfProducts";
import { Link } from "react-router-dom";

class RightFilters extends Component {
  state = {
    initialAccordion:{}
   };

  componentDidMount() {
    setTimeout(() => {
      // this.importURlFilters();
      // this.importURlColors();
    }, 100);
  }
  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.optionalFilters!==this.props.optionalFilters) this.importURlFilters();
    this.getCategory();
    this.getChildren();
  }

// handelColorClick=(completeColor)=>{
//   let {PresentURL,handleColor}=this.props
//   let stringFilter=PresentURL.stringFilter
//     let color = completeColor.class;
//     let length="color".length+1
//     let index=  stringFilter.indexOf("color")
//     let index2=stringFilter.indexOf(color)
//     let common = stringFilter.toLowerCase().includes(color.toLowerCase())
//     let length2=color.length
//    handleColor(completeColor.class, completeColor)
//    this.handleAllClick("color",index,length,color,index2,length2,common)
// }
// handelClickDiscount=()=>{
//   let {PresentURL,handleDiscount}=this.props
//   let stringFilter=PresentURL.stringFilter
//   console.log(PresentURL,stringFilter);
//     let length="discount".length+1
//     let index=  stringFilter.indexOf("discount")
//     let index2=stringFilter.indexOf("true")
//     let common = stringFilter.toLowerCase().includes("true".toLowerCase())
//     let length2="true".length
//     handleDiscount()
//    this.handleAllClick("discount",index,length,"true",index2,length2,common)
// }
// handelClickInStock=()=>{
//   let {PresentURL,handleStock}=this.props
//   let stringFilter=PresentURL.stringFilter
//     let length="inStock".length+1
//     let index=  stringFilter.indexOf("inStock")
//     let index2=stringFilter.indexOf("positive")
//     let common = stringFilter.toLowerCase().includes("positive".toLowerCase())
//     let length2="positive".length
//     handleStock()
//    this.handleAllClick("inStock",index,length,"positive",index2,length2,common)
// }
// handelPriceClick=(indexOfPrice)=>{
//   let {PresentURL,handleFilterOfPrice}=this.props
//   let stringFilter=PresentURL.stringFilter
//     let length="range".length+1
//     let index=  stringFilter.indexOf("range")
//     let index2=stringFilter.indexOf(indexOfPrice)
//     console.log(index2);
//     let common = stringFilter.toLowerCase().includes(indexOfPrice)
//     let length2=indexOfPrice.toString().length
//     handleFilterOfPrice(indexOfPrice)
//    this.handleAllClick("range",index,length,indexOfPrice,index2,length2,common)
// }
// handelAllAttributesClick=( nameOfAttribute,indexOfAttribut,id,titleItem,item)=>{
//   let {PresentURL,handleAllAttributes}=this.props
//   handleAllAttributes(nameOfAttribute,indexOfAttribut,id,titleItem,item)
//   titleItem=titleItem.trim()
//   console.log(titleItem);
//   let stringFilter=PresentURL.stringFilter
//     let length="optionalFilter".length+1
//     let index=  stringFilter.indexOf("optionalFilter")
//     let index2=stringFilter.indexOf(titleItem)
//     console.log(index2);
//     let common = stringFilter.toLowerCase().includes(titleItem)
//     let length2=titleItem.length
//    this.handleAllClick("optionalFilter",index,length,titleItem,index2,length2,common)
// }


//   handleAllClick=(filterTitle,indexOfFilterTitle,lengthOfFilterTitle,filter,indexOffilter,lengthOfFilter,common)=>{
//     console.log("filter",filter,"filterTitle",filterTitle,"indexOfFilterTitle",indexOfFilterTitle,"lengthOfFilterTitle",lengthOfFilterTitle,"indexOffilter",indexOffilter,"lengthOfFilter",lengthOfFilter,"common",common);
//     let {stringFilter,id}=this.props.PresentURL
//     let newStringFilter=""
// if(indexOfFilterTitle!==-1){
//   if(common===false){
//     newStringFilter=stringFilter.slice(0,indexOfFilterTitle+lengthOfFilterTitle)+`${filter}_`+stringFilter.slice(indexOfFilterTitle+lengthOfFilterTitle)
//     console.log(11111111111,newStringFilter);
//   }
//   if(common===true){
//     let length=0
//     console.log(stringFilter.charAt(indexOffilter+lengthOfFilter));
//     if(stringFilter.charAt(indexOffilter+lengthOfFilter)==="_") length=indexOffilter+lengthOfFilter+1
// else length=indexOffilter+lengthOfFilter

//     newStringFilter=stringFilter.slice(0,indexOffilter)+ stringFilter.slice(length)
//     console.log(22222222222,newStringFilter,indexOffilter,length,indexOffilter,lengthOfFilter,indexOffilter+lengthOfFilter);
// }
// }
// else{
//   newStringFilter=stringFilter+`&${filterTitle}=${filter}`
//   console.log(33333333,newStringFilter);
// }

// this.props.history.push(`/last__category/${id}/${newStringFilter}`)

  // }
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
    let { accordian,initialAccordion } = this.props;
    // let initialAccordion={...this.state.initialAccordion}
    if(initialAccordion[name]===true) {
      initialAccordion[name]=false
      className = "title__icon"
      // this.setState({initialAccordion});
    }
    else if (accordian[name]) {
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



  // importURlFilters = (mood="import") => {
  //   let { optionalFilters, handleAllAttributes, handleAccordian } = this.props;
  //   let others = this.getAllAttributes();
  //   let filters = [];
  //   for (let key in optionalFilters) {
  //     others.map((arrays, index) =>
  //       arrays[0].map((array) => {
  //         if (array.title.trim() === optionalFilters[key].trim()) {
  //           filters.push([
  //             arrays[1].name,
  //             index,
  //             arrays[1].id,
  //             array.title,
  //             array,
  //           ]);
  //         }
  //       })
  //     );
  //   }
  //   if(mood==="import"){
  //     let initialAccordion={...this.state.initialAccordion}
  //     filters.map((filter) => {
  //       handleAllAttributes(
  //         filter[0],
  //         filter[1],
  //         filter[2],
  //         filter[3],
  //         filter[4]
  //         );
  //         handleAccordian(filter[0]);
  //         initialAccordion[filter[0]]=true
  //       });
        
  //       this.setState({initialAccordion});
  //   }
  //   else{
  //     return filters;

  //   }
  // };

  // checkFilter = (name) => {
  //   let className=""
  //   let { accordian } = this.props;
  //   if (accordian[name] ===false) {
  //     console.log(accordian[name]);
  //     console.log("mustclose");
  //     return className
  //   } 
  //   let filters=this.importURlFilters("check")
  //   filters.map(filter => {
  //     if (filter[0]===name) {
  //       className="collapse show amir"
  //       console.log(accordian[name]);
  //       console.log("must open");

  //     }
  //   })
  //   return className
  // };

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
      PresentURL
    } = this.props;
    let others = [];
    // if (this.getAllAttributes()[0].length) {
    others = getAllAttributes();
    console.log(PresentURL);
    // }
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
                this.getChildren().map((child, index) => (
                  <Link to={`/last__category/${child.id}/${PresentURL.stringFilter}`} key={index}>
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

        {others.map((Attribut, index) => (
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
