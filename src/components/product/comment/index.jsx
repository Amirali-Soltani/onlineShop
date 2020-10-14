import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../../../css/comment.css";
import { connect } from "react-redux";
import Input from "./../../common/input";
import Joi from "joi-browser";
import { getRandomManAvatar, getRandomWomanAvatar } from "../../common/avatars";
import { addComment, addRate } from "./../../../redux-slicers/products";
import { getStars } from "../../common/functionsOfProducts";

class Comment extends Component {
  state = {
    show__wirte__modal: false,
    data: { title: "", body: "" },
    vote: ["withoutVote", 0],
    errors: {},
    pics: [],
    sourceOfImages: { src1: "", src2: "", src3: "" },
    sourceOfImages2: { src1: "", src2: "", src3: "" },
    submit: false,
    date: { year: 0, month: 0, day: 0 },
    srcOfAvatar: 0,
    show: false,
    login__modal: false,
  };

  schema = {
    title: Joi.string().required().label("Title").min(5),
    body: Joi.string().required().label("Main review").min(20).max(250),
  };

  componentDidMount() {
    this.props.setTabs("Comment");
  }
  progress = (id, number, max) => {
    setTimeout(() => {
      this.progress2(id, number, max);
    }, 1000);
  };

  progress2 = (id, number, max) => {
    let percent = document.getElementById(id);
    let progress = document.getElementById(id + 1);
    let count = 0;
    let per = 0;
    let cleft = 0;
    let ctop = 0;
    let maxPrograss = 400 / max;
    let maxcleft = 360 / max;
    let loading = setInterval(animate, 500);

    function animate() {
      if (count == number) {
        clearInterval(loading);
      } else {
        per = per + maxPrograss;
        count = count + 1;
        cleft = cleft + maxcleft;
        var ctrans = "translate(" + -cleft + "px, " + -ctop + "px)";
        progress.style.width = per + "px";
        percent.style.transform = ctrans;
        percent.textContent = count;
      }
    }
  };
  writeReview = () => {
    let { login } = this.props;
    if (login) this.setState({ show__wirte__modal: true });
    if (!login) {
      this.setState({ login__modal: true });
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };
  handle__solo__validate = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    let errorMessage = error === null ? null : error.details[0].message;
    const errors = { ...this.state.errors };
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  submiteVote = (newVote) => {
    let errors = { ...this.state.errors };
    errors.vote = "";
    this.setState({ errors, vote: newVote });
  };

  getClassName = (v) => {
    let className = "without__color ";
    if (v[1] <= this.state.vote[1]) {
      className += " positive";
    }
    return className;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    let vote = [...this.state.vote];
    if (vote[1] == 0) {
      let errors = { ...this.state.errors };
      errors.vote = "you must vote";
      this.setState({ errors });
      return;
    }
    this.doSubmit();
  };
  doSubmit = () => {
    this.setState({ submit: true });
    let date = new Date();
    this.gregorian_to_jalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this.setState({ srcOfAvatar: getRandomManAvatar() });
    this.saveComment();
  };

  saveComment = () => {
    setTimeout(() => {
      let { data, vote, pics, sourceOfImages, date, srcOfAvatar } = this.state;
      vote = vote[1];
      let { memberName } = this.props;
      let show = this.state.show;
      let comment = {
        show,
        data,
        vote,
        pics,
        sourceOfImages,
        date,
        srcOfAvatar,
        memberName,
      };
      let product = { ...this.props.product };
      let comments = [...product.dailyRentalRate];
      let numberInStock = { sold: 1, visited: 3, popularity: 4 };
      comments.push(comment);
      this.props.saveComment(
        comments,
        product._id,
        product.title,
        product.numberInStock
      );
    }, 1000);
  };
  gregorian_to_jalali = (gy, gm, gd) => {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = gm > 2 ? gy + 1 : gy;
    days =
      355666 +
      365 * gy +
      parseInt((gy2 + 3) / 4) -
      parseInt((gy2 + 99) / 100) +
      parseInt((gy2 + 399) / 400) +
      gd +
      g_d_m[gm - 1];
    jy = -1595 + 33 * parseInt(days / 12053);
    days %= 12053;
    jy += 4 * parseInt(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += parseInt((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + parseInt(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + parseInt((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    let month = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    let thisMonth = month[jm];
    let thisDay = jd;
    jy = jy.toString();
    let thisYear = jy.slice(2);
    let date = { ...this.state.date };
    date.year = thisYear;
    date.month = thisMonth;
    date.day = thisDay;
    this.setState({ date });
  };
  convertToArray = (sources) => {
    let arrayOfSOources = [];
    for (let key in sources) {
      if (sources[key].length > 0) arrayOfSOources.push(sources[key]);
    }
    return arrayOfSOources;
  };
  renderInput(name, placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={data[name]}
        onChange={this.handleChange}
        onBlur={this.handle__solo__validate}
        error={errors[name]}
        className="form-control mt-3 mb-3"
      />
    );
  }

  handleUploadPic = (e, p, index) => {
    let errors = { ...this.state.errors };
    let sourceOfImages = { ...this.state.sourceOfImages };
    let sourceOfImages2 = { ...this.state.sourceOfImages2 };

    let pics = [...this.state.pics];
    pics[index] = e;
    if (e.size >= 3000000) {
      errors.pic = "هر عکست نهایتا میتونه 3 مگابایت باشه";
      this.setState({ errors });
      return;
    }
    let src = URL.createObjectURL(e);
    sourceOfImages[p] = src;
    sourceOfImages2[p] = e;
    this.setState({ errors: "", sourceOfImages, sourceOfImages2, pics });
  };

  removePic = (src, index) => {
    let sourceOfImages = { ...this.state.sourceOfImages };
    sourceOfImages[src] = "";
    let pics = [...this.state.pics];
    pics[index] = "";
    this.setState({ sourceOfImages, pics });
  };
  resetModal = () => {
    let errors = { ...this.state.errors };
    let sourceOfImages = { ...this.state.sourceOfImages };
    let pics = [...this.state.pics];
    let data = { ...this.state.data };
    let vote = [...this.state.vote];
    data = { title: "", body: "" };
    vote = ["withoutVote", 0];
    errors = {};
    pics = [];
    sourceOfImages = { src1: "", src2: "", src3: "" };
    this.setState({
      errors,
      sourceOfImages,
      pics,
      data,
      vote,
      show__wirte__modal: false,
      submit: false,
    });
  };

  render() {
    let random = 3;
    let { comments } = this.props;
    let sum = 0;
    let numbers = comments.length;
    let exellent = 0,
      great = 0,
      good = 0,
      bad = 0,
      disaster = 0;
    let finalstar = [];
    if (comments !== undefined) {
      comments.map((c) => {
        sum += c.vote;
        if (c.vote == 5) exellent += 1;
        if (c.vote == 4) great += 1;
        if (c.vote == 3) good += 1;
        if (c.vote == 2) bad += 1;
        if (c.vote == 1) disaster += 1;
      });
      finalstar = [
        ["عالی", exellent],
        ["خوب", great],
        ["متوسط", good],
        ["بد", bad],
        ["فاجعه", disaster],
      ];
    }
    let finalAaverage = sum / numbers;
    finalAaverage = finalAaverage.toFixed(1);
    let use = finalAaverage;
    let showStar = [0, 0, 0, 0, 0];
    for (let index = 0; index < showStar.length; index++) {
      showStar[index] = use;
      use -= 1;
    }
    let allVote = [exellent, great, good, bad, disaster];
    let max = Math.max(...allVote);

    let pic = ["src1", "src2", "src3"];
    let vote = [
      ["فاجعه", 1],
      ["بد", 2],
      ["متوسط", 3],
      ["خوب", 4],
      ["عالی", 5],
    ];

    // if (product!==undefined) {

    return (
      <div className="content">
        <div className="comment">
          <div className="top__comment">
            <div className="result">
              {finalAaverage > 0 && <span className="text">میانگین</span>}
              {isNaN(finalAaverage) && (
                <span className="without__review">بدون نقد</span>
              )}
              {finalAaverage > 0 && (
                <span className="number">{finalAaverage}</span>
              )}

              <span className="icon">
                <ul>
                  {getStars(comments).map((star, index) => {
                    if (star >= 1) {
                      return (
                        <li className="star__icon" key={index}>
                          <svg
                            className="without__color positive "
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
                            src={require("./../../../assets/icons/half-star.png")}
                            alt="star"
                          />
                        </li>
                      );
                    }

                    if (star <= 0) {
                      return (
                        <li className="star__icon" key={index}>
                          <svg
                            className="without__color "
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
              </span>
              {finalAaverage > 0 && (
                <span className="text2">{`${numbers} نقد`}</span>
              )}
                        <div className="write2" onClick={this.writeReview}>
              <img
                className="icon"
                src={require("./../../../assets/icons/pencil.png")}
                alt=""
              />
              <span>نقد خودتو بنویس</span>
            </div>
            </div>

            <div className="custom__chart">
              {finalstar.map((c, index) => (
                <Fragment key={index}>
                  <div className="rank">
                    <span className="title">{c[0]}</span>
                    <div className="diagram">
                      <div id={c[0]} className="custom__percent">
                        0
                      </div>
                      <div className="custom__progress__bar">
                        <div id={c[0] + 1} className="custom__progress"></div>
                      </div>
                    </div>
                  </div>
                  {/* {setTimeout(() => {
                    this.progress(c[0], c[1], max);
                  }, 1000)} */}
                  {this.progress(c[0], c[1], max)}
                </Fragment>
              ))}
            </div>
            <div className="write" onClick={this.writeReview}>
              <img
                className="icon"
                src={require("./../../../assets/icons/pencil.png")}
                alt=""
              />
              <span>نقد خودتو بنویس</span>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="buttom__comment">
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <div className="one__comment" key={index}>
                <div className="right__comment">
                  <div className="avatar">
                    <img
                      className="icon"
                      src={require(`./../../../assets/man'sAvatar/${comment.srcOfAvatar}.png`)}
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <span>{comment.memberName}</span>
                  </div>
                  <div className="date">
                    <span>
                      {`نوشته شده در تاریخ ${comment.date.day} ${comment.date.month}ماه ${comment.date.year}`}
                    </span>
                  </div>
                </div>
                <div className="left__comment">
                  <div className="top__left__comment">
                    <div className="stars">
                      <ul>
                        {getStars([comment]).map((star, index) => {
                          if (star >= 1) {
                            return (
                              <li className="star__icon" key={index}>
                                <svg
                                  className="without__color positive "
                                  viewBox="0 -10 511.98685 511"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                                </svg>
                              </li>
                            );
                          }

                          if (star <= 0) {
                            return (
                              <li className="star__icon" key={index}>
                                <svg
                                  className="without__color "
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
                    <div className="title">
                      <span>{comment.data.title}</span>
                    </div>
                  </div>
                  <div className="buttom__left__comment">
                    <span>{comment.data.body}</span>
                  </div>
                </div>
                {comment.sourceOfImages.src1 !== undefined && (
                  <div className="images">
                    {this.convertToArray(comment.sourceOfImages).map(
                      (pic, index) => (
                        <img src={pic} alt="logo" key={index} />
                      )
                    )}
                  </div>
                )}
                {/* <div className="line">
    
</div> */}
              </div>
            ))}
        </div>

        {/* //////////////////////////////////////please__login ///////////////////////////// */}
        <Modal
          className="write__review__modal"
          show={this.state.login__modal}
          onHide={() => this.setState({ login__modal: false })}
          animation={true}
        >
          <div className="success__write">
            <Modal.Header closeButton>
              <Modal.Title>باید حتما عضو باشی</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>
                برای اینکه بتونی تو سایت نقد بذاری باید حتما عضو خانواده ما بشی
                <br></br>
                میتونی راحت با ثبت نام سریع از بالای سایت عضو شی
              </span>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this.setState({ login__modal: false })}
              >
                حله!{" "}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>

        {/* ///////////////////////////////////review__modal//////////////////////////// */}
        <Modal
          className="write__review__modal"
          show={this.state.show__wirte__modal}
          onHide={() => this.setState({ show__wirte__modal: false })}
          animation={true}
        >
          {!this.state.submit && (
            <div className="write ">
              <Modal.Header closeButton>
                <Modal.Title>نقد خودتو بنویس</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    {this.renderInput("title", "یه تیتر برای نقدت بزن")}
                  </Form.Group>
                  <div className="icon">
                    <span>رایتو بده!</span>
                    <ul>
                      {vote.map((v, index) => (
                        <li
                          key={index}
                          className="star__icon"
                          onClick={() => this.submiteVote(v)}
                        >
                          <svg
                            className={this.getClassName(v)}
                            viewBox="0 -10 511.98685 511"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
                          </svg>
                        </li>
                      ))}
                    </ul>
                    {this.state.vote[1] > 0 && (
                      <span
                        style={{
                          marginRight: "10px",
                          fontSize: "20px",
                          color: "#ff7675",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.vote[0]}
                      </span>
                    )}
                  </div>
                  {this.state.errors.vote && (
                    <div className="w-100 bg-danger text-center text-warning p-2 mt-2 mb-4 rounded">
                      {this.state.errors.vote}
                    </div>
                  )}

                  <Form.Group>
                    <textarea
                      class="form-control"
                      placeholder="یک نقد خوب زیر 250 کلمه بنویس"
                      name="body"
                      rows="4"
                      value={this.state.data.body}
                      onChange={this.handleChange}
                      onBlur={this.handle__solo__validate}
                      error={this.state.errors.body}
                    ></textarea>
                    {this.state.errors.body && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                        {this.state.errors.body}
                      </div>
                    )}
                  </Form.Group>
                </Form>
                <div className="import__images">
                  <div className="title"> تا 3 عکس میتونی آپلود کنی</div>
                  <div className="group__of__upload">
                    {pic.map((p, index) => (
                      <div key={index}>
                        {!this.state.sourceOfImages[p] && (
                          <Fragment>
                            <label for="upload-photo" className="upload_photo">
                              {p}
                            </label>
                            <input
                              id="upload-photo"
                              className="none"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                this.handleUploadPic(
                                  e.target.files[0],
                                  p,
                                  index
                                )
                              }
                            />
                          </Fragment>
                        )}
                        {this.state.sourceOfImages[p] && (
                          <img
                            style={{
                              width: "125px",
                              height: "115px",
                              cursor: "pointer",
                              display: "flex",
                              marginLeft: "21px",
                              marginTop: "-8px",
                            }}
                            src={this.state.sourceOfImages[p]}
                            onClick={() => this.removePic(p, index)}
                            alt="uploadPic"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {this.state.errors.pic && (
                    <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                      {this.state.errors.pic}
                    </div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ show__wirte__modal: false })}
                >
                  بیخیال{" "}
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  بزن که ثبت شه{" "}
                </Button>
              </Modal.Footer>
            </div>
          )}

          {this.state.submit && (
            <div className="success__write">
              <Modal.Header closeButton>
                <Modal.Title>نقدت با موفقیت ثبت شد</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{`${this.props.memberName} عزیز  `}</div>
                <span>
                  نقدتو کامل گرفتیم . بعد یه چک کوچولو میذاریمش تو سایت. خیالت
                  جمع
                </span>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.resetModal}>
                  حله!{" "}
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal>
      </div>
    );
    // }
  }
}

function mapStateToProps(state) {
  return {
    login: state.authorization.isLoggedIn.login,
    memberName: state.authorization.isLoggedIn.name,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    saveComment: (comment, productId, title, allRates) =>
      dispatch(addComment(comment, productId, title, allRates)),
    addRate: (allRates, productId, title) =>
      dispatch(addRate(allRates, productId, title)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
