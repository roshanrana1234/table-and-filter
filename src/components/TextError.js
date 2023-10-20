import React from "react";

const TextError = (props) => {
  return (
    <div className="text-red-500 text-sm font-semibold">{props.children}</div>
  );
};

export default TextError;
