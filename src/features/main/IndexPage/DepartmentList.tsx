import React from "react";
import { departmentList } from "../../slices/bookSlice";
import SingleDepartmentInList from "./SingleDepartmentInList";

const DepartmentList = () => {
  return (
    <main className="px-5">
      <h1 className="text-xl text-slate-700 text-center uppercase px-6 border-b-2 border-slate-700 w-fit mx-auto pb-1">
        Departments
      </h1>
      <div className="py-3 px-5 mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {departmentList.map((department, index) => (
          <SingleDepartmentInList key={index} {...department} />
        ))}
      </div>
    </main>
  );
};

export default DepartmentList;
