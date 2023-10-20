import React, { useEffect, useState } from "react";
import { UseStudent } from "../Hooks/UseStudentData";
import { Link } from "react-router-dom";
import { request } from "../utils/Axios-utils";
import { useQuery } from "@tanstack/react-query";
import UseDebounce from "../Hooks/UseDebounce";

const handleSearch = (search, designation) => {
  if (search && !designation) {
    return request({ url: `/students/?name=${search}`, method: "get" });
  }
  if (search && designation) {
    return request({
      url: `/students/?name=${search}&designation=${designation}`,
      method: "get",
    });
  }

  return request({ url: `/students`, method: "get" });
  // return { data: [] };
};

const Student = () => {
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const { isLoading, data, isError, error } = UseStudent();
  // Delay in SEarch
  const debounceSearchTerm = UseDebounce(search, 500);
  const debounceSearchTermTwo = UseDebounce(designation, 500);

  // Search
  const { data: student } = useQuery(
    ["search", debounceSearchTerm, debounceSearchTermTwo],
    () => handleSearch(debounceSearchTerm, designation)
  );

  console.log(student);

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center text-4xl font-bold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="min-h-screen bg-green-950 text-white p-5">
        <h1 className="text-center text-4xl font-bold m-4">Students</h1>

        <div className="flex flex-col">
          <label htmlFor="search">Enter Name</label>
          <input
            className="text-black"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="designaton">Enter Designation</label>
          <input
            className="text-black"
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
          {data.data.map((value) => {
            return (
              <div
                key={value.id}
                className="grid w-full h-full justify-items-center items-center bg-pink-600 p-4 rounded-md"
              >
                <span>{value.id}</span>
                <span>name : {value.name}</span>
                <span> {value.designation}</span>

                <div className="flex w-full justify-between ">
                  <Link to={`${value.id}`}>
                    <button className="btn">Detail Page</button>
                  </Link>
                  <Link to={`edit/${value.id}`}>
                    <button className="btn bg-green-500">Edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Search */}
        {/* {student &&
          student.data.map((value, index) => {
            return (
              <div className="flex  gap-5">
                <span>{value.name}</span>
                <span>{value.designation}</span>
              </div>
            );
          })} */}
      </div>
    </>
  );
};

export default Student;
