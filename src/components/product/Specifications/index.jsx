import React, { Component } from "react";
import "./../../../css/specifications.css";
import Table from "react-bootstrap/Table";
import { getAttributes } from "../../common/functionsOfProducts";

class Specifications extends Component {
  state = {};
  componentDidMount() {
    this.props.setTabs("Specifications");
  }
  render() {
    let { product, allAttribute } = this.props;
    let productAttribute = [];
    if (product !== undefined) {
      productAttribute.push([
        "جنس",
        getAttributes(product, allAttribute, 3)[0],
      ]);
      productAttribute.push([
        "تن خور",
        getAttributes(product, allAttribute, 7)[0],
      ]);
      productAttribute.push([
        "نوع آستین",
        getAttributes(product, allAttribute, 8)[0],
      ]);
      productAttribute.push([
        "مناسب برای فصل",
        getAttributes(product, allAttribute, 6)[0],
      ]);
      productAttribute.push([
        "گروه سنی",
        getAttributes(product, allAttribute, 5)[0],
      ]);
    }
    return (
      <div className="main__content">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2">مشخصات فیزیکی</th>
            </tr>
          </thead>
          <tbody>
            {productAttribute.map((a,index) => {
              if (a[1] !== undefined) {
                return (
                  <tr key={index}>
                    <td className="title">{a[0]}</td>
                    <td>{a[1].title}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Specifications;
