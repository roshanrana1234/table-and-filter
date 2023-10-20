import React from "react";
import { UseDeleteStudent, UseGetSingleData } from "../Hooks/UseStudentData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentById = () => {
  const navigate = useNavigate();
  const { studentID } = useParams();
  const { isLoading, isError, error, data } = UseGetSingleData(studentID);

  //   Delete Hook
  const onSuccess = (data) => {
    console.log(data);
    if (data.status == 200) {
      navigate("/student");
    }
  };
  const { mutate } = UseDeleteStudent(onSuccess);

  console.log(data);
  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-bold m-4">Student Detail</h1>

        <div className="w-7/12 flex flex-col p-5 rounded bg-gray-950 text-white justify-between items-center gap-5 text-3xl font-semibold m-auto">
          <span>{data?.data.name}</span>
          <span>{data?.data.designation}</span>
          <button className="btn" onClick={() => mutate(studentID)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentById;
