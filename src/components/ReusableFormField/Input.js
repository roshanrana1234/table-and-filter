import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

const Input = (props) => {
  const { label, name, placeholder, valid, ...rest } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full ">
        <label
          className={` font-semibold after:content['*'] ${
            !valid ? "text-green-500" : "text-red-500"
          }`}
          htmlFor={name}
        >
          {label}
        </label>
        <Field
          className={`w-full rounded focus:border-none  ${
            !valid ? "border-green-500" : "border-red-500"
          }
           ${
             !valid
               ? "focus:ring-green-500 focus:ring-2"
               : "focus:ring-red-500 focus:ring-2"
           } `}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default Input;
