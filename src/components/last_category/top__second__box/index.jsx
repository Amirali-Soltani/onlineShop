import React, { Component } from "react";
import "./../../../css/top__second__box.css";
class SecondBox extends Component {
  state = {};

  getClassName = (order,index) => {
    let { Sort } = this.props;
    let className = `number${index}`;
    if (Sort.path === order.path && Sort.order === order.sort)
      className += " bg-orange c-white";
    return className;
  };
  render() {
    const orders = [
      { name: "پر بازدیدترین", path: "numberInStock.visited", sort: "desc" },
      { name: "پر فروش ترین", path: "numberInStock.sold", sort: "desc" },
      { name: "محبوب ترین", path: "numberInStock.popularity", sort: "desc" },
      { name: "جدیدترین", path: "_id", sort: "desc" },
      { name: "ارزانترین", path: "price", sort: "asc" },
      { name: "گرانترین", path: "price", sort: "desc" },
    ];
    let { handleSort,handelClickOrder } = this.props;
    return (
      <div className="second__box">
        <div className="sort__icon">
          <img src={require("./../../../assets/icons/filter.png")} alt="sort" />
          <span>مرتب سازی بر اساس:</span>
        </div>
        <div className="sort__name">
          {orders.map((order, index) => (
            <span
              className={this.getClassName(order,index)}
              onClick={() => handelClickOrder(order)}
              key={index}
            >
              {order.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default SecondBox;
