import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksByDepartment } from "../../slices/bookSlice";
import { AppDispatch, RootState } from "../../../store";

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
  const { state } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { departmentId } = useParams();

  const status = useSelector(
    (state: RootState) => state.book.departments[departmentId!].status
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooksByDepartment(departmentId!));
    }
  }, [departmentId, dispatch]);

  return (
    <div className="grow mb-8">
      <h3 className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold">
        {state.department}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-3 px-5 gap-3">
        {yearArray.map((year, index) => (
          <li
            key={index}
            className="border-2 border-slate-500 rounded-lg items-center"
          >
            <Link
              to={`year/${index + 1}`}
              state={{ ...state, year: yearArray[index] }}
              className="w-full text-slate-800 flex p-3"
            >
              <AiFillFolderOpen className="text-2xl mr-3 text-slate-800" />
              <div className="grow">{year}</div>
              <FaExternalLinkAlt className="text-xl text-slate-600" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleDepartment;
