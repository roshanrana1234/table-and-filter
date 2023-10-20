import React, { useEffect, useState } from "react";
import { UseStudent } from "../Hooks/UseStudentData";
import { Link } from "react-router-dom";
import { request } from "../utils/Axios-utils";
import { useQuery } from "@tanstack/react-query";
import UseDebounce from "../Hooks/UseDebounce";

const AdvanceFilter = () => {
  const [mainData, setMainData] = useState([]);
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const { isLoading, data, isError, error } = UseStudent();

  console.log(data);
  useEffect(() => {
    setMainData(data?.data);
  }, [data]);

  console.log(mainData);

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

  const handleSubmit = () => {
    setSearchValue(search);
    setSearchDesignation(designation);

    let filtredData = mainData.filter((value) => value.name == searchValue);

    return setMainData(filtredData);
  };

  return (
    <>
      <div className="min-h-screen bg-green-950 text-white p-5">
        <h1 className="text-center text-4xl font-bold m-4">Students</h1>

        <div className="flex items-end p-4 gap-3">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              className="text-black"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="designation">Designation</label>
            <input
              className="text-black"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="btn">
            submit
          </button>
        </div>

        {/* <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
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
        </div> */}

        {/* Student Search */}
        {mainData &&
          mainData?.map((value, index) => {
            return <div>{value?.name}</div>;
          })}
      </div>
    </>
  );
};

export default AdvanceFilter;
