import React, { Component } from "react";
import "./../../../css/footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <div className="mainfooter">
          <div className="container">
            <div className="footer__top">
              <div className="footer__top__image image1">
                <img src={require("./../../../assets/icons/free.png")} alt="" />
                <span> ارسال رایگان کالاهای بالای 200 هزار تومان</span>
              </div>
              <div className="footer__top__image image2">
                <img src={require("./../../../assets/icons/24.png")} alt="" />
                <span> بسته بندی و ارسال کالا کمتر از 24 ساعت </span>
              </div>
              <div className="footer__top__image image3">
                <img
                  src={require("./../../../assets/icons/shield.png")}
                  alt=""
                />
                <span> گارانتی اصل بودن تمام کالا ها </span>
              </div>
              <div className="footer__top__image image4">
                <img
                  src={require("./../../../assets/icons/time-and-date.png")}
                  alt=""
                />
                <span>پشتیبانی 24 ساعته و 7 روز هفته </span>
              </div>
            </div>
            <hr />
          </div>

          <div className="footer__middle">
            <div className="container">
              <div className="footer__middle__main">
                <div className="footer__middle__right">
                  <ul>
                    <li>
                      <span>راهنمای خرید</span>
                      <ul className="sub_cat">
                        <li>نحوه ارسال سفارش</li>
                        <li className="second">رویه ارسال سفارش</li>
                        <li className="third">شیوه های پرداخت</li>
                      </ul>
                    </li>
                    <li>
                      <span>خدمات مشتریان</span>
                      <ul className="sub_cat">
                        <li> پرسش های متداول</li>
                        <li className="second">رویه بازگرداندن کالا</li>
                        <li className="third">شرایط استفاده</li>
                        {/* <li>حریم خصوصی</li> */}
                      </ul>
                    </li>
                    <li>
                      <span>خدمات فروش</span>
                      <ul className="sub_cat">
                        <li>نحوه ارسال سفارش</li>
                        <li className="second">رویه ارسال سفارش</li>
                        <li className="third">شیوه های پرداخت</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="footer__middle__left">
                  <div className="footer__middle__left__first">
                    <span>ما را در شبکه های اجتماعی دنبال کنید</span>
                    <ul>
                      <li>
                        <img
                          src={require("./../../../assets/icons/011-youtube.png")}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={require("./../../../assets/icons/035-whatsapp.png")}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={require("./../../../assets/icons/025-instagram.png")}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={require("./../../../assets/icons/029-telegram.png")}
                          alt=""
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="footer__middle__left__second">
                    <div className="icon__image">
                      <img
                        src={require("./../../../assets/icons/phone-call.png")}
                        alt=""
                      />
                    </div>
                    <div className="phone__number">09035412827</div>
                  </div>
                </div>
              </div>
              <hr className="line" />
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__info">
                طراح وب سایت : &nbsp;
                <div className="developer__name">امیر سلطانی</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
