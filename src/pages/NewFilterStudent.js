import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/Axios-utils";
import { Link } from "react-router-dom";

const fetchStudents = () => {
  return request({ url: "/students" });
};

// half second
const NewFilterStudent = () => {
  const [search, setSearch] = useState("");
  const [searchDeveloper, setSearchDeveloper] = useState("");
  const [filterData, setFilterData] = useState([]);

  //   ONSuccessFuntion
  const onSuccess = (data) => {
    setFilterData(data?.data);
  };
  console.log("Filter Data", filterData);

  // Get Student
  const { data, isError, isLoading, error } = useQuery(
    ["student-data"],
    fetchStudents,
    {
      onSuccess: onSuccess,
    }
  );

  useEffect(() => {
    const newFilterData = data.data.filter((value) => {
      return (
        value.name.toLowerCase().match(search.toLocaleLowerCase()) &&
        value.designation
          .toLowerCase()
          .match(searchDeveloper.toLocaleLowerCase())
      );
    });
    setFilterData(newFilterData);
  }, [search, searchDeveloper]);

  return (
    <>
      <div>This is filter</div>

      <div className="grid grid-cols-2 gap-3 w-10/12 m-auto my-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="search">Enter Name </label>
          <input
            type="text"
            placeholder="Enter Name For Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="search">Designation </label>
          <input
            type="text"
            placeholder="Enter Designation..."
            value={searchDeveloper}
            onChange={(e) => setSearchDeveloper(e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
        {filterData &&
          filterData?.map((value) => {
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
    </>
  );
};

export default NewFilterStudent;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { request } from "../utils/Axios-utils";
// import { Link } from "react-router-dom";
// import UseDebounce from "../Hooks/UseDebounce";

// const fetchStudents = (searchValue, searchDesignation) => {
//   if (searchValue && !searchDesignation) {
//     return request({ url: `/students?name=${searchValue}` });
//   }
//   if (searchValue && searchDesignation) {
//     return request({
//       url: `/students?name=${searchValue}&designation=${searchDesignation}`,
//     });
//   }
//   if (!searchValue && searchDesignation) {
//     return request({
//       url: `/students?designation=${searchDesignation}`,
//     });
//   }
//   return request({ url: "/students" });
//   //   return { data: [] };
// };

// // half second
// const NewFilterStudent = () => {
//   const [search, setSearch] = useState("");
//   const [searchDeveloper, setSearchDeveloper] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [searchDesignation, setSearchDesignation] = useState("");
//   // Get Student
//   const { data, isError, isLoading, error } = useQuery(
//     ["student-data", searchValue, searchDesignation],
//     () => fetchStudents(searchValue, searchDesignation)
//   );

//   console.log(data);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSearchValue(search);
//     setSearchDesignation(searchDeveloper);
//   };

//   return (
//     <>
//       <div>This is filter</div>

//       <div className="grid grid-cols-2 gap-3 w-10/12 m-auto my-5">
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="search">Enter Name </label>
//             <input
//               type="text"
//               placeholder="Enter Name For Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="search">Designation </label>
//             <input
//               type="text"
//               placeholder="Enter Designation..."
//               value={searchDeveloper}
//               onChange={(e) => setSearchDeveloper(e.target.value)}
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>

//       <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
//         {data &&
//           data?.data.map((value) => {
//             return (
//               <div
//                 key={value.id}
//                 className="grid w-full h-full justify-items-center items-center bg-pink-600 p-4 rounded-md"
//               >
//                 <span>{value.id}</span>
//                 <span>name : {value.name}</span>
//                 <span> {value.designation}</span>

//                 <div className="flex w-full justify-between ">
//                   <Link to={`${value.id}`}>
//                     <button className="btn">Detail Page</button>
//                   </Link>
//                   <Link to={`edit/${value.id}`}>
//                     <button className="btn bg-green-500">Edit</button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default NewFilterStudent;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { request } from "../utils/Axios-utils";
// import { Link } from "react-router-dom";
// import UseDebounce from "../Hooks/UseDebounce";

// const fetchStudents = (search, searchDeveloper) => {
//   if (search && !searchDeveloper) {
//     return request({ url: `/students?name=${search}` });
//   }
//   if (search && searchDeveloper) {
//     return request({
//       url: `/students?name=${search}&designation=${searchDeveloper}`,
//     });
//   }
//   if (!search && searchDeveloper) {
//     return request({
//       url: `/students?designation=${searchDeveloper}`,
//     });
//   }
//   return request({ url: "/students" });
//   //   return { data: [] };
// };

// // half second
// const NewFilterStudent = () => {
//   const [search, setSearch] = useState("");
//   const [searchDeveloper, setSearchDeveloper] = useState("");

//   const debounceSearchTerm = UseDebounce(search, 600);
//   const debounceSearchTermDesignation = UseDebounce(searchDeveloper, 600);

//   // Get Student
//   const { data, isError, isLoading, error } = useQuery(
//     ["student-data", debounceSearchTerm, debounceSearchTermDesignation],
//     () => fetchStudents(search, searchDeveloper)
//   );

//   console.log(data);

//   return (
//     <>
//       <div>This is filter</div>

//       <div className="grid grid-cols-2 gap-3 w-10/12 m-auto my-5">
//         <div className="flex flex-col gap-2">
//           <label htmlFor="search">Enter Name </label>
//           <input
//             type="text"
//             placeholder="Enter Name For Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="search">Designation </label>
//           <input
//             type="text"
//             placeholder="Enter Designation..."
//             value={searchDeveloper}
//             onChange={(e) => setSearchDeveloper(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="min-h-[50vh] grid sm:grid-cols-3 grid-cols-1 gap-4">
//         {data &&
//           data?.data.map((value) => {
//             return (
//               <div
//                 key={value.id}
//                 className="grid w-full h-full justify-items-center items-center bg-pink-600 p-4 rounded-md"
//               >
//                 <span>{value.id}</span>
//                 <span>name : {value.name}</span>
//                 <span> {value.designation}</span>

//                 <div className="flex w-full justify-between ">
//                   <Link to={`${value.id}`}>
//                     <button className="btn">Detail Page</button>
//                   </Link>
//                   <Link to={`edit/${value.id}`}>
//                     <button className="btn bg-green-500">Edit</button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default NewFilterStudent;
