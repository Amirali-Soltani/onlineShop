import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="">
      <input {...rest} name={name} id={name} />
      {error && <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">{error}</div>}
    </div>
  );
};

export default Input;
