import React, { useEffect, useState } from "react";
import { UseStudent } from "../../Hooks/UseStudentData";
import DataTable from "react-data-table-component";

const ReactDataTable = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onSuccess = (data) => {
    setFilteredData(data.data);
  };

  useEffect(() => {
    const result = data?.data.filter((value) => {
      return (
        value?.name.toLowerCase().match(name.toLowerCase()) &&
        value?.designation.toLowerCase().match(designation.toLowerCase())
      );
    });
    setFilteredData(result);
  }, [name, designation]);

  const { data, isError, isLoading, error } = UseStudent(onSuccess);

  //   Row Style
  const conditionalRowStyles = [
    {
      when: (row) => row.name == "Kiran",
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  //   All Table Stule
  const customStyles = {
    headRow: {
      style: {
        border: "none",
        backgroundColor: "orange",
        height: "10vh",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "18px",
        color: "white",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  //   Column
  const columns = [
    {
      name: "FullName",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      style: {
        color: "#202124",
        fontSize: "14px",
        fontWeight: 500,
      },
      conditionalCellStyles: [
        {
          when: (row) => row.name === "roshan",
          style: {
            backgroundColor: "purple",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => console.log("roshan")} className="btn">
          Edit
        </button>
      ),
      button: true,
    },
  ];

  return (
    <>
      <div>This is React Data Table</div>
      <div className="grid items-center   grid-cols-1 bg-green-500 h-screen">
        <div className="w-10/12 m-auto ">
          <DataTable
            data={filteredData}
            columns={columns}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="50vh"
            progressPending={isLoading}
            title="All The Data"
            conditionalRowStyles={conditionalRowStyles}
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            subHeader
            actions={<button className="btn text-sm">Export</button>}
            subHeaderComponent={
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="rounded p-1 focus:scale-x-105 duration-300"
                  type="text"
                  placeholder="search..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="rounded p-1 focus:scale-x-105 duration-300"
                  type="text"
                  placeholder="Deignation..."
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
            }
            subHeaderAlign="right"
            theme="dark"
          />
        </div>
      </div>
    </>
  );
};

export default ReactDataTable;
