import React, { Component } from "react";
import "./../../../css/pagination.css";
import { range } from "lodash";
class Pagination extends Component {
  state = {};

  getClassName = (page) => {
    let { pagination } = this.props;
    let { currentPage } = pagination;
    let className = "";
    if (page === currentPage) className += "bg-orange c-white";
    return className;
  };
  render() {
    let { pagination, sortproducts, handlePgeChange } = this.props;
    let productsCount = sortproducts().length;
    let { pageSize, currentPage } = pagination;
    let pageCount = Math.ceil(productsCount / pageSize);
    let pages = range(1, pageCount + 1);
    let index = pages.indexOf(currentPage);
    if (pages.length === 1 || pages.length === 0) {
      return null;
    }
    if (pages.length <= 5) {
      return (
        <div className="last__box">
          <div className="numbers">
            {pages.map((page) => (
              <span
              key={page}
                className={this.getClassName(page)}
                onClick={() => handlePgeChange(page)}
              >
                {page}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (pages.length >= 6) {
      return (
        <div className="last__box">
          <div className="numbers">
            {index - 0 > 1 && (
              <span onClick={() => handlePgeChange(pages[0])}>{pages[0]}</span>
            )}

            {index - 0 > 2 && (
              <span onClick={() => handlePgeChange(pages[index - 2])}>...</span>
            )}

            {pages[index - 1] && (
              <span onClick={() => handlePgeChange(pages[index - 1])}>
                {pages[index - 1]}
              </span>
            )}

            <span className="bg-orange c-white" style={{ cursor: "none" }}>
              {pages[index]}
            </span>

            {pages[index + 1] && (
              <span onClick={() => handlePgeChange(pages[index + 1])}>
                {pages[index + 1]}
              </span>
            )}

            {pages.length - 1 - index > 2 && (
              <span onClick={() => handlePgeChange(pages[index + 2])}>...</span>
            )}

            {pages.length - 1 - index > 1 && (
              <span onClick={() => handlePgeChange(pages[pages.length - 1])}>
                {pages[pages.length - 1]}
              </span>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Pagination;
