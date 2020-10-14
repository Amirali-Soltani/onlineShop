import React, { Component } from "react";
import "./../../../css/products__category.css";
import {
  getcolors,
  getPriceClasses,
  getStars,
  changeImage,
  backToFirstImage,checkForStock
} from "./../../common/functionsOfProducts";
import { Link } from "react-router-dom";

class WholeProduct extends Component {
  state = {};

  classNameOfImage=(product)=>{
    let className="main__pic"
    if(!checkForStock(product)) className+=" gray__scale "
    return className
  }

  render() {
    let {
      allAttributeItemS,
      getProducts,
      paginate,
    } = this.props;
    if (getProducts().length === 0) {
      return (
        <div
          style={{
            textAlign: "center",
            margin: "50px",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          {" "}
          متاسفانه هیچ کالایی با مشخصات درخواستیت پیدا نکردیم{" "}
        </div>
      );
    }
    return (
      <div className="whole__products">
        {paginate().map((product, index2) => (
          <div className="one__product" key={product._id}>
            {product.off && <div className="tag__discount"> {product.off}</div>}
            <Link to={`/product/${product._id}/Review`}>
              <div className="product__images">
                {!checkForStock(product)&&
              <div className="overlay__name">
                          <span>
                            اتمام موجودی
                          </span>
                        </div>
  }
                <div className="overlay">
                  <div className="product__star">
                    <ul>
                      {getStars(product.dailyRentalRate).map((star, index) => {
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
                                className={`without__color number${5 - index} `}
                                src={require("./../../../assets/icons/half-star-2.png")}
                                alt="star"
                                style={{ height: "25px", width: "25px" }}
                              />
                            </li>
                          );
                        }

                        if (star <= 0) {
                          return (
                            <li className="star__icon" key={index}>
                              <svg
                                className={`without__color number${5 - index} `}
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
                  </div>
                </div>
                <div className="pic">
                  <img
                    className={this.classNameOfImage(product)}
                    src={product.productPic[Object.keys(product.productPic)[0]]}
                    alt="product"
                    id={product._id}
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
                        changeImage(product, index2, a.class, product._id)
                      }
                      onMouseLeave={() =>
                        backToFirstImage(product, index2, a.class, product._id)
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
                    {(parseInt(product.price) * (100 - parseInt(product.off))) /
                      100}
                    هزار تومان
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WholeProduct;
