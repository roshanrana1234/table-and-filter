import { request } from "../utils/Axios-utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/InterCeptor";

// Get Student
const fetchStudents = () => {
  // return request({ url: "/students" });
  return axiosInstance({ url: "/students", method: "get" });
};

export const UseStudent = (onSuccess) => {
  return useQuery(["student-data"], fetchStudents, {
    onSuccess: onSuccess,
  });
};

// Post/Create Student

const createStudent = (data) => {
  // return request({ url: "/students", method: "post", data: data });
  return axiosInstance({ url: "/students", method: "post", data: data });
};

export const UsePostStudent = (onSuccess) => {
  return useMutation(createStudent, {
    onSuccess: onSuccess,
  });
};

// Get Student By Id

const getStudentById = (studentID) => {
  // return request({ url: `students/${studentID}`, method: "get" });
  return axiosInstance({ url: `students/${studentID}`, method: "get" });
};

export const UseGetSingleData = (studentID) => {
  return useQuery(["single-data", studentID], () => getStudentById(studentID));
};

// Delet Student

const deleteStudent = (studentID) => {
  // return request({ url: `students/${studentID}`, method: "delete" });
  return axiosInstance({ url: `students/${studentID}`, method: "delete" });
};

export const UseDeleteStudent = (onSuccess) => {
  return useMutation(deleteStudent, {
    onSuccess: onSuccess,
  });
};

// Edit Student

const editStudent = ({ studentID, values }) => {
  // return request({ url: `students/${studentID}`, method: "PUT", data: values });
  return axiosInstance({
    url: `students/${studentID}`,
    method: "PUT",
    data: values,
  });
};

export const UseEditStudent = (onSuccess) => {
  return useMutation(editStudent, {
    onSuccess: onSuccess,
  });
};

//
// Get table
const fetchTable = () => {
  // return request({ url: "/students" });
  return axiosInstance({ url: "/tabledata", method: "get" });
};

export const UseTableData = (onSuccess) => {
  return useQuery(["Table-data"], fetchTable, {
    onSuccess: onSuccess,
  });
};
