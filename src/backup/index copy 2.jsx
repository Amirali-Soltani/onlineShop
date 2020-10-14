import React, { Component } from "react";
import Header__Footer from "../header__footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./../../css/last_category.css";
import RightFilters from "./right__filters";
import FirstBox from "./top__first__box";
import SecondBox from "./top__second__box";
import WholeProduct from "./products";
import Pagination from "./pagination__box";
import { connect } from "react-redux";
import { getSpecificProduct } from "../../redux-slicers/products";


class Last_category extends Component {
  state = {
    products:[],
    allAttributeItemS:[],
    allCategories:[],
    categoryId:"",
    data:{internalSearchBox:""},
    filtered:[],
    notFound:{
      filterdByPrice:{status:false},
      filteredByStock:{status:false},
      filteredByDiscount:{status:false},
      filteredByColor:{status:false},
    },
    RangePriceClassName:{
      first:{status:false,firtsRange:1,secondRange:99},
      second:{status:false,firtsRange:100,secondRange:149},
      third:{status:false,firtsRange:150,secondRange:199},
      forth:{status:false,firtsRange:200,secondRange:249},
      fifth:{status:false,firtsRange:250,secondRange:299},
      sixth:{status:false,firtsRange:300,secondRange:2000},
    },
    filterdByPrice:[],
    stock:false,
    discount:false,
    filteredByStock:[],
    filteredByDiscount:[],
    accordian:false,
color:{
  0:{status:false,class:""},
  1:{status:false,class:""},
  2:{status:false,class:""},
  3:{status:false,class:""},
  4:{status:false,class:""},
  5:{status:false,class:""},
  6:{status:false,class:""},
  7:{status:false,class:""},
  8:{status:false,class:""},
  9:{status:false,class:""},
  10:{status:false,class:""},
},
filteredByColor:[],


  };
componentDidMount() {
  let categoryId=16;
  this.setState({categoryId});
 let products =this.props.productsOfSpecificCategory(categoryId)
 this.setState({products});
 let attribute = { ...this.props.attribute };
 let allAttributeItemS = attribute.attributeItem;
 this.setState({ allAttributeItemS });
 let allCategories = this.props.allCategories.categories
 this.setState({allCategories});
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.filtered!==this.state.filtered){
    this.handleStock();
    this.handleDiscount();
    this.handleFilterOfPrice();
  }
}

handleValue = ({currentTarget:input}) => {
  const data = { ...this.state.data };
  data[input.name] = input.value;
  this.setState({ data });
  this.handleSearch(input.value);
};
handleSearch=(searchWord)=>{
  let {products}=this.state
  let filtered = products.filter(m =>
    m.title.toLowerCase().includes(searchWord.toLowerCase())
  );
  this.setState({filtered});
}
handleFilterOfPrice=(number)=>{
  let {RangePriceClassName} = this.state;
  if (number){
if (RangePriceClassName[number].status===false){
  RangePriceClassName[number].status=true
}
else RangePriceClassName[number].status=false
this.setState({RangePriceClassName});
  }

  
let {filtered,products,filterdByPrice}=this.state
let prices=[]
let final=[]
if (filtered.length>0) final=filtered
else final=products
final.map(p=>(
  p.off?prices.push((parseInt(p.price) *
  (100 - parseInt(p.off)))/100):prices.push(p.price)
))
let newRangePrice = prices.filter(p=>(
  p>=RangePriceClassName[number].firtsRange && p<=RangePriceClassName[number].secondRange
))
let unique = [...new Set(newRangePrice)];

let newProducts=[]
final.map(p=>{
  for (let index = 0; index < prices.length; index++) {
    if (p.price === unique[index] || (parseInt(p.price) * (100 - parseInt(p.off))/100) === newRangePrice[index] ){
      newProducts.push(p);
    }
  }
})
if (RangePriceClassName[number].status===true){
filterdByPrice.push(...newProducts);
}
else filterdByPrice= filterdByPrice.filter((item) => !newProducts.includes(item));
console.log(filterdByPrice);

this.setState({filterdByPrice});
}

handleStock=(status=false)=>{
  console.log("i am called");
  let {stock} = this.state;
  if (stock===false && status===true){
    stock=true
  }
  else if(stock===true && status===true) stock =false
  this.setState({stock});

let {filtered,products,filteredByStock,notFound}=this.state
let final=[]

if (filtered.length>0 ) final=filtered
else final=products
let newProduct=final.filter(p=>p.price!==0)
if(stock===true &&newProduct.length>0){
  console.log(newProduct);
  filteredByStock=newProduct
  notFound.filteredByStock.status=false
  console.log(newProduct);
  console.log("1111");
}
else if(stock===true && newProduct.length===0){
  notFound.filteredByStock.status=true
  console.log("2222");

}
else{
  notFound.filteredByStock.status=false
  filteredByStock=[];
  console.log("3333");

}
this.setState({filteredByStock,notFound});
console.log(this.state.filteredByStock,this.state.notFound.filteredByStock.status);



}
handleDiscount=(status=false)=>{
  console.log(" i am back!!!");
  let {discount} = this.state;
  if (discount===false && status===true){
    discount=true
  }
  else if(discount===true && status===true) discount =false
  this.setState({discount});

  let {filtered,products,filteredByDiscount,notFound}=this.state
let final=[]
if (filtered.length>0) final=filtered
else final=products
let newProduct=final.filter(p=>p.off!==null)
if(discount===true && newProduct.length>0){
  filteredByDiscount=newProduct
  notFound.filteredByDiscount.status=false
  console.log("yes");
  console.log(filteredByDiscount);

}
else if(discount===true && newProduct.length===0){
  notFound.filteredByDiscount.status=true
  console.log("no");
}
else {
  filteredByDiscount=[];
  notFound.filteredByDiscount.status=false
  console.log("really?");
}
this.setState({filteredByDiscount,notFound});
console.log(filteredByDiscount);

}

handleAccordian=()=>{
  let {accordian} = this.state;
  if (accordian===false){
    accordian=true
  }
  else accordian =false
  this.setState({accordian});
}
handleColor=(index)=>{
  let {color} = this.state;
  if (color[index].status===false){
    color[index].status=true
  }
  else color[index].status=false
  this.setState({color});
  
  let {filtered,products,}=this.state
  let final=[]
  if (filtered.length>0) final=filtered
  else final=products
  // final.map(p=>(
  //   p.off?prices.push((parseInt(p.price) *
  //   (100 - parseInt(p.off)))/100):prices.push(p.price)
  // ))
  // let newRangePrice = prices.filter(p=>(
  //   p>=RangePriceClassName[number].firtsRange && p<=RangePriceClassName[number].secondRange
  // ))
  // let unique = [...new Set(newRangePrice)];
  
  // let newProducts=[]
  // final.map(p=>{
  //   for (let index = 0; index < prices.length; index++) {
  //     if (p.price === unique[index] || (parseInt(p.price) * (100 - parseInt(p.off))/100) === newRangePrice[index] ){
  //       newProducts.push(p);
  //     }
  //   }
  // })
  // if (RangePriceClassName[number].status===true){
  // filterdByPrice.push(...newProducts);
  // }
  // else filterdByPrice= filterdByPrice.filter((item) => !newProducts.includes(item));
  // this.setState({filterdByPrice});
  }

  render() {
    return (
      <Header__Footer>
        <div className="main">
          <div className="container">
            <div className="breadcrumb11">
              <Breadcrumb>
                <Breadcrumb.Item href="#">صفحه اصلی </Breadcrumb.Item>
                <Breadcrumb.Item href="#">کیف و کفش زنانه </Breadcrumb.Item>

                <Breadcrumb.Item active> کفش زنانه </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <div className="whole__category">
            <div className="container">
              <div className="main__search">
<RightFilters categoryId={this.state.categoryId} allCategories={this.state.allCategories} 
searchBoxValue={this.state.data} handleValue={this.handleValue} handleSearch={this.handleSearch}
products={this.state.products} filtered={this.state.filtered} searchWords={this.state.data.internalSearchBox}
RangePriceClassName={this.state.RangePriceClassName} handleFilterOfPrice={this.handleFilterOfPrice} 
handleStock={this.handleStock} stock={this.state.stock} discount={this.state.discount} handleDiscount={this.handleDiscount}
accordian={this.state.accordian} handleAccordian={this.handleAccordian} allAttributeItemS={this.state.allAttributeItemS}
color={this.state.color} handleColor={this.handleColor}
> 

</RightFilters>
                <div className="left__search__products">
                  <div className="whole__left__search">
<FirstBox></FirstBox>
<SecondBox></SecondBox>
<WholeProduct products={this.state.products} allAttributeItemS={this.state.allAttributeItemS} filtered={this.state.filtered}
 searchWords={this.state.data.internalSearchBox} filterdByPrice={this.state.filterdByPrice} filteredByStock={this.state.filteredByStock}
 filteredByDiscount={this.state.filteredByDiscount} notFound={this.state.notFound}
 > 

 </WholeProduct>
<Pagination></Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header__Footer>
    );
  }
}
function mapStateToProps(state) {
  return {
    allCategories: state.api.apiattributeItem.categories,
    productsOfSpecificCategory: (categoryId) => getSpecificProduct(categoryId)(state),
    attribute: state.api.apiattributeItem.attributeItem,

};
  }


function mapDispatchToProps(dispatch) {
  return {

  }

}
export default connect (mapStateToProps,mapDispatchToProps) (Last_category);
