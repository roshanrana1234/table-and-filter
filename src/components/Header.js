import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="flex p-4 bg-emerald-800 text-white justify-between items-center">
        <span>Logo</span>
        <ul className="flex space-x-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="student">
            <li>Students</li>
          </Link>
          <Link to="addstudent">
            <li>Add Students</li>
          </Link>
          <Link to="filter">
            <li>Filter</li>
          </Link>
          <Link to="studentFilter">
            <li>All Case Sence</li>
          </Link>
          <Link to="table">
            <li>Table</li>
          </Link>
          <Link to="datatable">
            <li>DataTable</li>
          </Link>
          <Link to="rdtc">
            <li>RDTC</li>
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Header;
