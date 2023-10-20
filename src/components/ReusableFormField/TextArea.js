import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

const TextArea = (props) => {
  const { label, name, placeholder, valid, ...rest } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <label
          className={`font-semibold after:content['*'] ${
            !valid ? "null" : "text-red-500"
          }`}
          htmlFor={label}
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
          as="textarea"
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

export default TextArea;
