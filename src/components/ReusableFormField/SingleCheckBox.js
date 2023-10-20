import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

const SingleCheckBox = (props) => {
  const { name, label, valid } = props;
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
        <Field type="checkbox" name={name} id={name} label={label} />
        <ErrorMessage name="tc" component={TextError} />
      </div>
    </>
  );
};

export default SingleCheckBox;
