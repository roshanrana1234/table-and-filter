import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Student from "./pages/Student";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddStudent from "./pages/AddStudent";
import StudentById from "./pages/StudentById";
import EditStudent from "./pages/EditStudent";
import Studentfilter from "./pages/Studentfilter";
import AdvanceFilter from "./pages/AdvanceFilter";
import ReactDataTable from "./components/React-Data-Table-Component/ReactDataTable";
import NewFilter from "./pages/NewFilter";
import NewFilterStudent from "./pages/NewFilterStudent";
import ReactTable from "./components/React-Data-Table-Component/ReactTable";
import Rdtc from "./components/React-Data-Table-Component/Rdtc";

// Create a client
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="student" element={<Student />} />
          <Route path="datatable" element={<ReactTable />} />
          <Route path="rdtc" element={<Rdtc />} />
          <Route path="filter" element={<Studentfilter />} />
          <Route path="new" element={<NewFilter />} />
          <Route path="advance" element={<AdvanceFilter />} />
          <Route path="student/:studentID" element={<StudentById />} />
          <Route path="student/edit/:studentID" element={<EditStudent />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="table" element={<ReactDataTable />} />
          <Route path="studentFilter" element={<NewFilterStudent />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;
