import React, { Component } from "react";
import "./../../../../css/menu.css";
import { connect } from "react-redux";
class Menu extends Component {
  state = {
      categories:[]
  };


  componentDidMount() {
      let {categories}=this.props.allCategories
      this.setState({categories});
      setTimeout(() => {
          console.log(this.state.categories)
          
      }, 5000);
  }
  
  render() {
    let {categories}=this.state
let c1=categories.filter(c1=>c1.parentId===0)
console.log(c1);
    return (
      <div className="main__menu">
        <div className="container">
          <div className="menu1">

          <ul>
                        <li>
                            زنانه
                            <ul>
                                <li>
                                    <div className="cat__name">
                                        کیف و کفش
                                    </div>

                                    <ul className="sub__cat__name">
                                        <li>کفش</li>
                                        <li>کیف</li>
                                        <li>دستبند</li>
                                        <li>گوشواره</li>
                                        <li>پابند</li>
                                    </ul>
                                </li>
                                <li>
                                    <div class="cat__name">
                                        لباس شب
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کفش</li>
                                        <li>کیف</li>
                                        <li>دستبند</li>
                                        <li>گوشواره</li>
                                        <li>پابند</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="cat__name">
                                        لباس حاملگی
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کفش</li>
                                        <li>کیف</li>
                                        <li>دستبند</li>
                                        <li>گوشواره</li>
                                        <li>پابند</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="cat__name">
                                        لباس رسمی
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کفش</li>
                                        <li>کیف</li>
                                        <li>دستبند</li>
                                        <li>گوشواره</li>
                                        <li>پابند</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            مردانه
                            <ul>
                                <li>
                                    <div class="cat__name">
                                        کمربند چرم
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کت</li>
                                        <li>کیف</li>
                                        <li>کوله</li>
                                        <li>شلوارک</li>
                                        <li>جوراب</li>
                                    </ul>
                                </li>
                                <li>
                                    <div class="cat__name">
                                        کت و شلوار
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کت</li>
                                        <li>کیف</li>
                                        <li>کوله</li>
                                        <li>شلوارک</li>
                                        <li>جوراب</li>
                                    </ul>
                                </li>
                                <li>
                                    <div class="cat__name">
                                        گیره کراوات
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کت</li>
                                        <li>کیف</li>
                                        <li>کوله</li>
                                        <li>شلوارک</li>
                                        <li>جوراب</li>
                                    </ul>
                                </li>
                                <li>
                                    <div class="cat__name">
                                        کفش مجلسی
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>کت</li>
                                        <li>کیف</li>
                                        <li>کوله</li>
                                        <li>شلوارک</li>
                                        <li>جوراب</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            بچگانه
                            <ul>
                                <li>
                                    <div className="cat__name">
                                        تاپ دخترانه
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>تاپ</li>
                                        <li>تیشرت</li>
                                        <li>سوئیشرت</li>
                                        <li>کلاه</li>
                                        <li>عینک</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="cat__name">
                                        شلوارک پسرانه
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>تاپ</li>
                                        <li>تیشرت</li>
                                        <li>سوئیشرت</li>
                                        <li>کلاه</li>
                                        <li>عینک</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="cat__name">
                                        ساعت بچگانه
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>تاپ</li>
                                        <li>تیشرت</li>
                                        <li>سوئیشرت</li>
                                        <li>کلاه</li>
                                        <li>عینک</li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="cat__name">
                                        کوله پشتی
                                    </div>
                                    <ul className="sub__cat__name">
                                        <li>تاپ</li>
                                        <li>تیشرت</li>
                                        <li>سوئیشرت</li>
                                        <li>کلاه</li>
                                        <li>عینک</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    allCategories: state.api.apiattributeItem.categories,

  
  
  });
  
  function mapDispatchToProps(dispatch) {
    return {  
   
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);
