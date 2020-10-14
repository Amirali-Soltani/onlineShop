import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Custom__form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };


  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };


  handleChange = (e) => {
    let input=e.currentTarget
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    if(input.name==="gender")
    this.handleSoloValidate(e)
  };

  handleSoloValidate=({ currentTarget: input }) =>{
    const data = { ...this.state.data };
const {name,value}=input;
const obj = { [name]: value };
const schema = { [name]: this.schema[name] };
const { error } = Joi.validate(obj, schema);
let errorMessage = error===null? null:error.details[0].message;
const errors = { ...this.state.errors };
if (errorMessage) errors[input.name] = errorMessage;
else delete errors[input.name];
this.setState({errors});
  }
 

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label,placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleSoloValidate}
        error={errors[name]}
        className="form-control mt-3 mb-3"
      />
    );
  }
}

export default Custom__form;
