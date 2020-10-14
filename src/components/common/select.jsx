import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group mb-0 mt-0">
      {/* <label htmlFor={name}>{label}</label> */}
      <select name={name} id={name} {...rest} style={{cursor:"pointer"}} className="form-control mt-3">
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">{error}</div>}
    </div>
  );
};

export default Select;