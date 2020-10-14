import React, { Component } from "react";
import "./../../../../css/serach.css";
import { connect } from "react-redux";
import Input from "../../../common/input";
import { Link, Redirect } from "react-router-dom";

class Search extends Component {
  state = {
    data: {
      searchBox: "",
    },
    className: "dropdown__search",
    filtered: [],
  };

  handleKey = (e) => {
    if (e.keyCode === 13) {
      this.props.history.push(`/last__category/0/search=${this.state.data.searchBox}`);
      this.closeSearch()
      return <Redirect to={`/last__category/0/search=${this.state.data.searchBox}`} />;
    }
  };

  renderInput(name, label, placeholder, ref, className, type = "text") {
    const { data } = this.state;

    return (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={data[name]}
        label={label}
        onChange={this.handleValue}
        onBlur={this.closeSearch}
        className={className}
        onKeyDown={this.handleKey}
      />
    );
  }

  handleValue = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    if (input.value.length > 0) {
      let className = "dropdown__search dropdown__search__active";
      this.setState({ className });
    } else {
      let className = "dropdown__search";
      this.setState({ className });
    }

    let { allProducts } = this.props;
    let filtered = allProducts.filter(
      (m) =>
        m.title.toLowerCase().includes(input.value.toLowerCase()) ||
        m.title_En.toLowerCase().includes(input.value.toLowerCase())
    );
    this.setState({ filtered });
  };

  closeSearch = () => {
    let className = "dropdown__search";
    this.setState({ className });
  };
  handleShow = () => {
    let { searchBox } = this.state.data;
    let { filtered } = this.state;

    if (filtered.length > 0 && searchBox.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    let { className, filtered } = this.state;
    return (
      <div className="search__box">
        {this.renderInput(
          "searchBox",
          null,
          "هر کالایی تو فکرته سرچ کن!",
          this.searchBox,
          "form-control"
        )}
        <Link to={`/last__category/0/search=${this.state.data.searchBox}`}>
          <button onClick={this.closeSearch} className="btn lets__go">بزن بریم!</button>
        </Link>

        <div className={className}>
          {filtered.length === 0 && (
            <div className="without__result ">
              متاسفیم! هیچ کالایی برات پیدا نکردیم
            </div>
          )}

          {filtered.length > 0 && (
            <div className="dropdown__search__main">
              <div className="dropdown__search__header">
                <div className="number__of__result">
                  <span>
                    {`${filtered.length}تا کالا مطابق جستجوت یافتیم!`}
                  </span>
                </div>
              </div>
              {filtered.slice(0, 6).map((product) => (
                <Link to={`/product/${product._id}/Review`} key={product._id}>
                  <div className="dropdown__search__body">
                    <div className="dropdown__search__body__right">
                      <img
                        src={
                          product.productPic[Object.keys(product.productPic)[0]]
                        }
                        alt="product"
                      />
                    </div>
                    <div className="dropdown__search__body__left">
                      <div className="productName">
                        <span>{product.title.slice(0.3)}</span>
                        {product.title.length > 29 && <span>...</span>}
                      </div>

                      <div className="dropdown__search__body__left__icons">
                        <div className="basket__price">
                          <span> {product.price} هزارتومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {filtered[filtered.length - 1] !== product && <hr />}
                </Link>
              ))}

              {filtered.length > 6 && (
                <div className="dropdown__search__footer">
                  <div className="result__button">
                    <img
                      src={require("./../../../../assets/icons/eye-1.png")}
                      alt="logo"
                    />
                            <Link to={`/last__category/0/search=${this.state.data.searchBox}`}>
                      <span onClick={this.closeSearch} > همه نتایح سرچتو ببین!</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.api.apiProducts.list,
  };
}
export default connect(mapStateToProps, null)(Search);
