import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { fetchBooksByDepartment } from "../../slices/bookSlice";

const FailedFetchingBooksInYear = () => {
  const { departmentId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-col max-w-lg mx-auto my-6 p-5 border-2 border-slate-500 rounded-lg gap-6">
      <div className="text-center text-lg">
        <div>Sorry. We're having some techanical issues.</div>
        <div>Try refreshing the page.</div>
      </div>
      <button
        className="py-2 border-2 border-slate-500 bg-slate-500 text-white rounded-3xl"
        onClick={() => dispatch(fetchBooksByDepartment(departmentId!))}
      >
        RETRY
      </button>
      <button className="py-2 -mt-3 border-2 border-slate-500 rounded-3xl">
        CONTACT US
      </button>
    </div>
  );
};

export default FailedFetchingBooksInYear;
