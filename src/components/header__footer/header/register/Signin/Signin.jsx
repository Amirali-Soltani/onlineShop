import React from "react";
import "./../../../../../css/Signin.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Joi from "joi-browser";
import Custom__form from "../../../../common/Custom__form";
import { connect } from "react-redux";
import {
  register,
  confirmLogin,
} from "../../../../../redux-slicers/successLogin";

class Signin extends Custom__form {
  state = {
    showRegisterModal: false,
    data: {
      name: "",
      email: "",
      password: "",
      gender: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("name").min(5),
    gender: Joi.string().required().label("gender"),
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) this.showingErros();
  }

  doSubmit = () => {
    this.props.register(
      this.state.data.email,
      this.state.data.password,
      this.state.data.name
    );
    this.showingErros();
  };

  showingErros = () => {
    const errors = { ...this.state.errors };
    errors.email = this.props.error;
    this.setState({ errors });
  };

  confirmLogin = () => {
    this.props.confirmlogin();
  };

  render() {
    const { login, memberName, loading } = this.props;

    return (
      <div>
        <div className="signin" id="signin__button">
          <button
            onClick={() => this.setState({ showRegisterModal: true })}
            className="btn "
          >
            <span className="signin__1">ثبت نام</span>
            <span className="signin__2">ثبت نام</span>
            <span className="signin__hidden">ثبت نام</span>
          </button>
        </div>

        {/*//////////////////////////////// Register - modal //////////////////*/}
        <Modal
          className="register__modal"
          show={this.state.showRegisterModal}
          onHide={() => this.setState({ showRegisterModal: false })}
          animation={1}
        >
          {!login && (
            <div className="register" id="register__modal">
              <Modal.Header closeButton>
                <Modal.Title>ثبت نام</Modal.Title>
              </Modal.Header>
              <form onSubmit={this.handleSubmit}>
                <Modal.Body>
                  {this.renderInput("name", "", "اسمتو اینجا بزن")}
                  {this.renderInput("email", "", "ایمیلتو اینجا بزن")}
                  {this.renderInput(
                    "password",
                    "",
                    "یه پسورد انتخابی اینجا بزن",
                    "password"
                  )}
                  {this.renderSelect("gender", "", [
                    { _id: "", name: "جنسیتتو انتخاب کن" },
                    { _id: "male", name: "آقا" },
                    { _id: "femal", name: "خانم" },
                  ])}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ showRegisterModal: false })}
                  >
                    بیخیال !
                  </Button>
                  <Button type="submit" variant="primary">
                    {loading && (
                      <Spinner
                        as="span"
                        animation="grow"
                        variant="light"
                        role="status"
                        aria-hidden="false"
                        style={{
                          width: "21px",
                          height: "21px",
                          marginLeft: "13px",
                          marginBottom: "2px",
                        }}
                      />
                    )}
                    عضوم کن
                  </Button>
                </Modal.Footer>
              </form>
            </div>
          )}

          {login && (
            <div id="success__register" className="success__register">
              <Modal.Header closeButton onClick={this.confirmLogin}>
                <Modal.Title>ایول! ثبت نامت کامل شد</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="name__after__register__modal" className="name">
                  {memberName}
                </div>
                <div className="welcom">خیلی خوش اومدی</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.confirmLogin}>
                  برو که اومدم!{" "}
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.authorization.isLoggedIn.login,
  memberName: state.authorization.isLoggedIn.name,
  error: state.authorization.isLoggedIn.error,
  loading: state.authorization.isLoggedIn.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    register: (email, password, name) =>
      dispatch(register(email, password, name)),
    confirmlogin: () => dispatch(confirmLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
