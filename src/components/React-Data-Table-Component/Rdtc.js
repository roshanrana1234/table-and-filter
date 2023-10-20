import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { UseTableData } from "../../Hooks/UseStudentData";
import CustomMenu from "../CustomMenu";

const Rdtc = () => {
  const [ids, setIds] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onSuccess = (data) => {
    setFilteredData(data?.data);
    // console.log(data?.data);
  };

  // Getting Data form server
  const { data, isLoading, isError, error } = UseTableData(onSuccess);

  //   Filter
  useEffect(() => {
    const result = data?.data.filter((value) => {
      return (
        value?.name.toLowerCase().match(name.toLowerCase()) &&
        value?.designation.toLowerCase().match(designation.toLowerCase())
      );
    });
    setFilteredData(result);
  }, [name, designation]);

  //   Columns of the Tables
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      //   width: "50px",
      grow: 0,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      //   center: true,
      sortable: true,
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
      },
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      //   noTableHead: true,
      grow: 0,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Desigantion",
      selector: (row) => row.designation,
    },
    {
      name: "Value",
      selector: (row) => row.value,
      //   right: true,
      grow: 0,
      hide: "md",
      conditionalCellStyles: [
        {
          when: (row) => row.value >= 500,
          style: {
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
        {
          when: (row) => row.value < 500,
          style: {
            backgroundColor: "green",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
    {
      name: "Body",
      selector: (row) => row.body,
      //   grow: 3, // it help to give more column space
      hide: "md",
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => <div>{row.isActive ? "Active" : "Not Active"}</div>,
      grow: 0,
      hide: "md",
      conditionalCellStyles: [
        {
          when: (row) => row.isActive === true,
          style: {
            backgroundColor: "green",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
        {
          when: (row) => row.isActive === false,
          style: {
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
    {
      name: "Action",
      cell: () => (
        <button onClick={() => alert("Edit button Clicked")} className="btn">
          Edit
        </button>
      ),
      button: true,
    },
    {
      cell: (row) => <CustomMenu size="small" row={row} />,
      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  //   Custom Styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  //   createTheme
  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  //   hide on resize
  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);

  // selectedRows
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
    const selectedIDS = selectedRows.map((value) => {
      return value.id;
    });
    // console.log(selectedIDS);
    if (selectedIDS) {
      setIds(selectedIDS);
    }
  };

  console.log(ids);

  // Expandable rows
  const ExpandedComponent = ({ data }) => (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid p-4 gap-3 grid-cols-1 md:grid-cols-2 bg-black/70 rounded-2xl m-auto duration-300 w-11/12 text-white ">
        <div className="flex gap-3 items-center">
          ID :<span className="text-xl">{data.id}</span>
        </div>

        <div className="flex gap-3 items-center">
          value :<span className="text-xl">{data.value}</span>
        </div>
        <div className="flex gap-3 items-center">
          name :<span className="text-xl">{data.name}</span>
        </div>
        <div className="flex gap-3 items-center">
          isActive :
          <span
            className={`text-xl ${
              data.isActive ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.isActive ? "Active" : "Not Active"}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          age :<span className="text-xl">{data.age}</span>
        </div>
        <div className="flex gap-3 items-center">
          gender :<span className="text-xl">{data.gender}</span>
        </div>
        <div className="flex gap-3 items-center">
          designation :<span className="text-xl">{data.designation}</span>
        </div>
        <div className="flex gap-3 items-center md:col-span-2">
          body :<span className="text-xl">{data.body}</span>
        </div>
      </div>

      <div className="w-11/12 p-6 bg-orange-400 rounded-md m-auto flex flex-col justify-center">
        <h1 className="text-white">Action Buttons</h1>
        <div className="grid grid-cols-2 gap-3">
          <button className="btn">edit</button>
          <button className="btn">Delete</button>
          <button className="btn">Active</button>
          <button className="btn">Deactivate</button>
        </div>
      </div>
    </>
  );

  // Pre disable row
  const rowPreExpanded = (row) => {
    if (row.isActive === false) {
      return false;
    } else {
      return true;
    }
  };

  // Export Data
  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        // eslint-disable-next-line no-plusplus
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    console.log(array);
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  // eslint-disable-next-line react/prop-types
  const Export = ({ onExport }) => (
    <button className="btn text-sm" onClick={(e) => onExport(e.target.value)}>
      Export
    </button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data.data)} />,
    []
  );
  return (
    <>
      <div className="grid w-full h-screen bg-cyan-600 justify-items-center items-center ">
        <div className="grid w-11/12 h-[90vh]  bg-orange-400  ">
          <DataTable
            data={filteredData} // This is Data for the Table
            columns={columns} // Declare number of columns in the table
            pagination // This is used To handle the pagination system of Table
            title="Employee Detail" // This is the Main Heading of table
            fixedHeader // This is used to Make the table header Fixed
            fixedHeaderScrollHeight="80vh" // This is the height of table
            // dense // it reduce the space around the table cells
            highlightOnHover // it is used for highlite the hover rows
            pointerOnHover // it is used to make pointer cursor in the table
            customStyles={customStyles} // custom style
            theme="solarized" // Custom Theme
            subHeader // Subheader for search
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
            subHeaderAlign="right" // seach aligment
            progressPending={isLoading} // it shows loading indicator till the data comes
            onSort={handleSort} // help in hiding column base on screen size sm , md , and lg
            selectableRows
            onSelectedRowsChange={handleChange}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            // expandableRowExpanded={rowPreExpanded}
            actions={actionsMemo}
          />
        </div>
      </div>
    </>
  );
};

export default Rdtc;
