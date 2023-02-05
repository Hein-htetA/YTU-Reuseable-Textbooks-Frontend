import React from "react";
import { useParams } from "react-router-dom";
import { departmentList } from "../IndexPage/DepartmentList";
import { yearArray } from "../SingleDepartmentPage/SingleDepartment";
import SingleBook from "./SingleBook";

const SingleYear = () => {
  const { department, year } = useParams();

  const departmentInfo = departmentList.find(
    (singleDepartment) => singleDepartment.shortName === department
  );

  return (
    <div className="px-5 min-h-screen">
      <h3 className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold">
        {departmentInfo?.fullName}
      </h3>
      <div className="px-2 pb-1 border-b-2 border-slate-600 w-fit my-2">
        {yearArray[parseInt(year || "0", 10) - 1]}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 my-4 w-fit mx-auto">
        <SingleBook />
        <SingleBook />
        <SingleBook />
      </div>
    </div>
  );
};

export default SingleYear;
