import React, { Component } from "react";
import "./../../../css/back__to__top.css";
import { Fragment } from "react";

class BackToTop extends Component {
  state = {
    height:0
  };
  
componentDidUpdate(prevProps, prevState) {
  if(this.state.height!==document.documentElement.scrollTop || prevState.height!==document.body.scrollTop ) {
    this.setState({height:document.documentElement.scrollTop});
  }
}

  scrollFunction = () => {
    console.log(document.documentElement.scrollTop);
    if (
      document.body.scrollTop > 1500 ||
      document.documentElement.scrollTop > 1500
    ) {
      return true;
    } else return false;
  };
  top_Function = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  render() {
    return (
      <Fragment>
        {this.scrollFunction() && (
          <div
            class="back__to__top"
            onClick={() => {
              this.top_Function();
            }}
          >
            <img src={require("./../../../assets/icons/top-1.png")} alt="" />
          </div>
        )}
      </Fragment>
    );
  }
}

export default BackToTop;
