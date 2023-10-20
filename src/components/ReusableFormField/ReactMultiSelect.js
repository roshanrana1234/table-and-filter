import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import ReactSelect from "react-select";

const ReactMultiSelect = (props) => {
  const { label, name, options, valid, ...rest } = props;
  return (
    <div className="flex flex-col ">
      <label
        className={` font-semibold ${
          !valid ? "text-green-500" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <ReactSelect
              {...field}
              {...rest}
              isMulti={true}
              defaultValue={value}
              value={value}
              component={ReactSelect}
              onChange={(val) => setFieldValue(name, val)}
              options={options}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ReactMultiSelect;

// npm i react-select
