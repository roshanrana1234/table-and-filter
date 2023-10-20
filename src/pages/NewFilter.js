import React, { useEffect, useState } from "react";
import { UseStudent } from "../Hooks/UseStudentData";
import { Link } from "react-router-dom";
import { request } from "../utils/Axios-utils";
import { useQuery } from "@tanstack/react-query";
import UseDebounce from "../Hooks/UseDebounce";
import { useStateManager } from "react-select";

const NewFilter = () => {
  const [search, setSearch] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onSuccess = (data) => {
    setFilteredData([]);
  };

  const { isLoading, data, isError, error } = UseStudent(onSuccess);

  useEffect(() => {
    const result = data?.data?.filter((value) => {
      return (
        value?.name.toLowerCase().match(search?.toLowerCase()) &&
        value?.designation.toLowerCase().match(searchDesignation?.toLowerCase())
      );
    });
    setFilteredData(result);
  }, [search, searchDesignation]);

  // Delay in SEarch
  //   const debounceSearchTerm = UseDebounce(search, 500);

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
          <label htmlFor="search">Enter Designation</label>
          <input
            className="text-black"
            type="text"
            value={searchDesignation}
            onChange={(e) => setSearchDesignation(e.target.value)}
          />
        </div>

        <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
          {filteredData?.map((value) => {
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
      </div>
    </>
  );
};

export default NewFilter;
