import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { closeSearch, openSearch } from '../../../redux-slicers/burger-menu';
import "./../../../css/top__first__box.css"

class FirstBox extends Component {
    state = {  }


creatingAttribiute=()=>{  
  let {specificSelectedItems,indexHolder}=this.props
  let result=[]
  for (let key in specificSelectedItems ){
    let index = indexHolder.filter(c=>c.attribute===key)
    specificSelectedItems[key].map(filter=>{
      result.push([key,filter,index[0].index])
    })
  }
  return result
}
openCloseBurgerMenu=()=>{
  let {statusOfMenu}=this.props
   if(statusOfMenu===false) this.props.openSearch()
     else this.props.closeSearch()
     console.log(statusOfMenu);
 }

    render() { 
      console.log("first");
      let {getProducts,searchWords,deletFilterOfSearch,filteredByStock
        ,filteredByDiscount,discount,stock,deletFilterOfDiscountStock,
        RangePriceClassName,handleFilterOfPrice,colors,handleColor,handleAllAttributes,
        handelAllAttributesClick,
        handelPriceClick,
        handelClickInStock,
        handelClickDiscount,
        handelColorClick,
        openCloseBurgerMenu,
      } =this.props
      let showDiscount=false
      let showStock=false
    if(filteredByDiscount.length>0 || discount===true) showDiscount=true
    if(filteredByStock.length>0 || stock===true) showStock=true



        return ( 
          <div className="first__box">
            <div className="number__of__product">
            {getProducts().length>0&& 
            <Fragment>
            <span className="number">{getProducts().length}</span>
              <span>کالا یافت شد</span>
              </Fragment>
    }
               {getProducts().length===0&& 
            <Fragment>
              <span
              style={{marginRight:"10px"}}
              >هیچ کالایی یافت نشد  </span>
              </Fragment>
    }
            </div>

  <div className="advanced__search" onClick={openCloseBurgerMenu}>جستجوی پیشرفته</div>

          {searchWords.length>0 &&
            <div className="one__top__filter " onClick={deletFilterOfSearch}>
              <div className="separator"></div>
        <span className="name__of__filter">{searchWords}</span>
            </div>
          } 

    {RangePriceClassName.map((price,index)=>(
      <Fragment key={index}>
      {price.status===true&&
      <div className="one__top__filter" onClick={()=>handelPriceClick(index)}>
              <div className="separator"></div>
              <span className="name__of__filter">
              {index === 0 && (
                        <span>{`زیر ${price.secondRange} هزار تومان`}</span>
                      )}
                      {index === RangePriceClassName.length - 1 && (
                        <span>{`بالای ${price.firtRange} هزار تومان`}</span>
                      )}
                      {index === 1 && (
                        <span>
                          {`بین ${price.firtRange} تا ${
                            price.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {(index === 2) && (
                        <span>
                          {`بین ${price.firtRange} تا ${
                            price.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {index === 3 && (
                        <span>
                          {`بین ${price.firtRange} تا ${
                            price.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}
                      {index === 4 && (
                        <span>
                          {`بین ${price.firtRange} تا ${
                            price.secondRange + 1
                          } هزار تومان`}
                        </span>
                      )}

              </span>
            </div>
        
      }
      </Fragment>
    )
)}

                {showStock&&
                          <div className="one__top__filter"onClick={handelClickInStock}>

              <div className="separator"></div>
              <span className="name__of__filter">
                فقط کالاهای موجود
              </span>
            </div>
            }

            {showDiscount&&
                          <div className="one__top__filter" onClick={handelClickDiscount}>

              <div className="separator"></div>
              <span className="name__of__filter">
                فقط کالاهای با تخفیف 
              </span>
            </div>
            }

{colors.length>0&& colors.map((color,index)=>(
            <div className="one__top__filter" onClick={()=>handelColorClick(color)} key={index}>
              <div className="separator"></div>
              <span className="name__of__filter">
{`رنگ : ${color.title}`}
              </span>
            </div>

))
            }

{this.creatingAttribiute() && this.creatingAttribiute().map((main,index)=>(
<div className="one__top__filter" onClick={()=>handelAllAttributesClick(main[0],main[2],main[1].parentId,main[1].title,main[1])} key={index}>
    <div className="separator"></div>
    <span className="name__of__filter">
      {`${main[0]}:${main[1].title}`}
    </span>
  </div>

)
)}
 





          </div>

        );
    }
}
 
// const mapStateToProps = (state) => ({
//   statusOfMenu:state.menu.open2

// });

// function mapDispatchToProps(dispatch) {
//   return {
 
//     openSearch: () => dispatch(openSearch()),
//     closeSearch: () => dispatch(closeSearch()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FirstBox);
export default FirstBox;

