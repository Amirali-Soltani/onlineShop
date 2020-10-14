import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import Example from "./header/mobie_menu"
class HeaderFooter extends Component {
  state = {};
  showSettings (event) {
    event.preventDefault();
  
  }
  render() {
    return (
      <>
{/* <Example></Example> */}
        <Header history={this.props.history} />
        {this.props.children} 
        <Footer />
      </>
    );
  }
}

export default HeaderFooter;
