import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/ReusableFormField/FormikControl";
import {
  UseEditStudent,
  UseGetSingleData,
  UsePostStudent,
} from "../Hooks/UseStudentData";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentID } = useParams();

  const { data } = UseGetSingleData(studentID);

  // OnSucceFul Post
  const onSuccess = (data) => {
    console.log(data);
    if (data.status == 200) {
      navigate("/student");
    }
  };

  const { mutate } = UseEditStudent(onSuccess);

  const initialValues = {
    name: "",
    designation: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    // console.log("From Data", values);
    console.log(onSubmitProps);
    mutate({ studentID, values });
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    designation: Yup.string().required("designation is Required"),
  });

  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-bold m-4">Students</h1>
        {/* Form */}

        <Formik
          initialValues={data?.data || initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="p-5 rounded bg-gray-200 w-10/12 m-auto flex flex-col gap-5 items-center ">
                {/* Name */}
                <FormikControl
                  control="input"
                  type="text"
                  label="Enter Your name"
                  name="name"
                  placeholder="Enter Your Full Name"
                />
                {/* designation */}
                <FormikControl
                  control="input"
                  type="text"
                  label="Your Designation"
                  name="designation"
                  placeholder="Enter Your Designation"
                />
                <button
                  className="btn disabled:bg-red-500 disabled:cursor-not-allowed"
                  disabled={!formik.isValid || formik.isSubmitting}
                  type="submit"
                >
                  submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EditStudent;
