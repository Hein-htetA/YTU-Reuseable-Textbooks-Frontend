import React from "react";
import { useParams, Link } from "react-router-dom";
import { departmentList } from "../IndexPage/DepartmentList";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";

export const yearArray = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Fifth Year",
  "Final Year",
  "Postgraduate",
];

const SingleDepartment = () => {
  const { department } = useParams();
  const departmentInfo = departmentList.find(
    (singleDepartment) => singleDepartment.shortName === department
  );

  return (
    <div className="grow mb-8">
      <h3 className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold">
        {departmentInfo?.fullName}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-3 px-5 gap-3">
        {yearArray.map((year, index) => (
          <li className="flex p-3 border-2 border-slate-500 rounded-lg items-center">
            <AiFillFolderOpen className="text-2xl mr-3 text-slate-800" />
            <Link to={`year/${index + 1}`} className="w-full text-slate-800">
              {year}
            </Link>
            <FaExternalLinkAlt className="text-xl text-slate-600" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleDepartment;
