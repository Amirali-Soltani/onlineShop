import React, { Component, Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "./Login/Login";
import Signin from "./Signin/Signin";
import "./../../../../css/signin__login__box.css";
import { connect } from "react-redux";
import { loadAllProducts } from "../../../../redux-slicers/products";
import { loggedOut } from "../../../../redux-slicers/successLogin";

class SigninLoginBox extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    const { confirmlogin, memberName,className1 } = this.props;
    return (
      <div>
        <div className={`signin__login__box ${className1}`} >
          {!confirmlogin && (
            <Fragment>
              <Login />
              <Signin />
            </Fragment>
          )}

          {confirmlogin && (
            <div
              className="success__login__register"
              id="success__login__register"
            >
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {memberName}
                </Dropdown.Toggle>
{className1==="regular" && 
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">سفارشات</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">لیست ارزوها</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">صفحه کاربری</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>خروج</Dropdown.Item>
                </Dropdown.Menu>
  }
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  confirmlogin: state.authorization.isLoggedIn.confirmLogin,
  memberName: state.authorization.isLoggedIn.name,
});
const mapDispatchToProps = (dispatch) => ({
  loadAll: () => dispatch(loadAllProducts()),
  logout: () => dispatch(loggedOut()),
  loadAllProducts: () => dispatch(loadAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninLoginBox);
