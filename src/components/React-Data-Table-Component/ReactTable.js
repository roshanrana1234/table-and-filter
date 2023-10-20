import React, { useState, useEffect } from "react";
import { UseTableData } from "../../Hooks/UseStudentData";
import DataTable, { createTheme, Direction } from "react-data-table-component";
import CustomMenu from "../CustomMenu";

//Custom Theme eg:  theme="solarized"
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

//   All Table Stule
const customStyles = {
  headRow: {
    style: {
      border: "none",
      backgroundColor: "black",
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

const ReactTable = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  // const [deleteData, setDeleteData] = React.useState(data?.data);

  const onSuccess = (data) => {
    setFilteredData(data?.data);
    console.log(data?.data);
  };

  const { data, isLoading, isError, error } = UseTableData(onSuccess);
  console.log(data?.data);

  const newData = [
    { id: 1, name: "roshan", year: 2012 },
    { id: 2, name: "roshan", year: 2012 },
    { id: 3, name: "roshan", year: 2012 },
    { id: 4, name: "roshan", year: 2012 },
    { id: 5, name: "roshan", year: 2012 },
    { id: 6, name: "roshan", year: 2012 },
    { id: 7, name: "roshan", year: 2012 },
  ];

  ////////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////
  //   Table Column
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      grow: 0,
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
      //   grow: 2,
      style: {
        color: "yellow",
        fontSize: "18px",
        fontWeight: 500,
      },
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Value",
      selector: (row) => row.value,
      hide: "sm",
      conditionalCellStyles: [
        {
          when: (row) => row.value > 500,
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
      name: "Age",
      selector: (row) => row.age,
      // right: true,
      // compact: true,
      center: true,
      width: "70px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "About",
      selector: (row) => row.body,
      width: "200px",
      wrap: true,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) => <div>{row.isActive ? "Active" : "Not Active"}</div>,
      hide: "sm",

      conditionalCellStyles: [
        {
          when: (row) => row.isActive,
          style: (row) => ({
            backgroundColor: row.isActive ? "green" : "red",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          }),
        },
        {
          when: (row) => row.isActive === false,
          style: (row) => ({
            backgroundColor: row.isActive ? "green" : "red",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          }),
        },
      ],
    },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => console.log(row.id)} className="btn">
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

  /////////////////////////////////////////////////////////////////////////////////////////

  // Filter
  useEffect(() => {
    const result = data?.data.filter((value) => {
      return (
        value?.name.toLowerCase().match(name.toLowerCase()) &&
        value?.designation.toLowerCase().match(designation.toLowerCase())
      );
    });
    setFilteredData(result);
  }, [name, designation]);

  /////////////////////////////////////////////////////////////////////////////////////////
  //hide in sort
  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);
  ///////////////////////////////////////////////////////////////////////////////////////
  // selectedRows
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
    const selectedIDS = selectedRows.map((value) => {
      return value.id;
    });
    console.log(selectedIDS);
    alert(selectedIDS);
  };

  ///////////////////////////////////////////////////////////////////////////////////////

  // Expandable row
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
    </>
  );
  // ////////////////////////////////////////////////////////////////////////////////////
  // PreExpandble

  /////////////////////////////////////////////////

  // Pre disable row
  const rowPreExpanded = (row) => {
    if (row.isActive === false) {
      return false;
    } else {
      return true;
    }
  };

  // const datanew = data?.data;
  // datanew.defaultExpanded = true;
  ///////////////////////////////////////////////
  return (
    <>
      <div className="bg-green-500 h-screen grid items-center">
        <div className="w-10/12 m-auto grid">
          <DataTable
            className="grid rounded-md"
            data={filteredData}
            columns={columns}
            title="Employee Datas"
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            pagination // it is used to show number of data at one time
            highlightOnHover // When we Hover we can highlight the rows
            // theme="default"
            theme="solarized" // We can Make Our own Custom theme
            // selectableRowsSingle // We can select only one row at a time
            actions={actionsMemo} // it is for CSV comma seperated value
            subHeader // it is used to show subHeaderComponent
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
            subHeaderAlign="right" // This search bar can be shifted left right or center
            // dense // it will make grid close to each other
            progressPending={isLoading} // Showing Loading when data is not fetched
            // customStyles={customStyles}
            onSort={handleSort} // When Reach sm , md , lg the column can be hidden
            // subHeaderAlign="Center"
            direction={Direction.AUTO}
            selectableRows // We can Select Multi row in order to take some action
            onSelectedRowsChange={handleChange}
            expandableRows
            expandableRowExpanded={rowPreExpanded}
            expandableRowsComponent={ExpandedComponent}
            expandableRowDisabled={(row) => row.isActive === false}
          />
        </div>
      </div>
    </>
  );
};

export default ReactTable;
