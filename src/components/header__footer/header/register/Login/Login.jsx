import React from "react";
import "./../../../../../css/Login.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Joi from "joi-browser";
import Custom__form from "../../../../common/Custom__form";
import { connect } from "react-redux";
import { login, confirmLogin } from "../../../../../redux-slicers/successLogin";
import Spinner from "react-bootstrap/Spinner";

class Login extends Custom__form {
  state = {
    showloginModal: false,
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5),
  };


  componentDidUpdate(prevProps, prevState) {
    if(prevProps.error!==this.props.error)this.showingErros()
  }
  
  doSubmit = () => {
    this.props.login(this.state.data.username, this.state.data.password);
   this.showingErros()
  };

  showingErros=()=>{
      const errors = { ...this.state.errors };
      errors.username = this.props.error;
      this.setState({ errors });
  }
  confirmLogin = () => {
    this.props.confirmlogin();
    this.setState({ showRegisterModal: false });
  };

  render() {
    const { loginState, memberName, loading } = this.props;
    return (
      <div>
        <div className="login" id="login__button">
          <button
            className="btn "
            onClick={() => this.setState({ showloginModal: true })}
          >
            <span className="login__1">ورود</span>
            <span className="login__2">ورود</span>
            <span className="login__hidden">ورود</span>
          </button>
        </div>

        {/*//////////////////////////////// login - modal //////////////////*/}

        <Modal
          className="login__modal"
          show={this.state.showloginModal}
          onHide={() => this.setState({ showloginModal: false })}
          animation={true}
        >
          {!loginState && (
            <div className="login" id="login__modal" ref={this.loginModal}>
              <Modal.Header closeButton>
                <Modal.Title>ورود</Modal.Title>
              </Modal.Header>
                  <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <div>
                    {this.renderInput("username", "", "ایمیلتو اینجا بزن")}
                    {this.renderInput(
                      "password",
                      "",
                      "پسوردتو اینجا بزن",
                      "password"
                    )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ showloginModal: false })}
                >
                  عضو نیستم اصلا!
                </Button>
                <Button type="submit" variant="primary" >
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
                  برو که اومدم!
                </Button>
              </Modal.Footer>
                </form>
            </div>
          )}

          {loginState && (
            <div className="success__login " id="success__login">
                {/* {    document.getElementById("success__login").onkeydown=this.confirmLogin} */}
              <Modal.Header closeButton onClick={this.confirmLogin}>
                <Modal.Title>با موفقیت وارد شدید</Modal.Title>
              </Modal.Header>
              <form onSubmit={this.confirmLogin}>
              <Modal.Body>
                <div className="name">{memberName}</div>
                <div className="welcom">خوش برگشتید</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submite">
                  برو که اومدم!
                </Button>
              </Modal.Footer>
              </form>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.authorization.isLoggedIn.login,
  memberName: state.authorization.isLoggedIn.name,
  error: state.authorization.isLoggedIn.error,
  loading: state.authorization.isLoggedIn.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  confirmlogin: () => dispatch(confirmLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
