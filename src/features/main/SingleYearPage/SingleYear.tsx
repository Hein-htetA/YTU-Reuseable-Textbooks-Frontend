import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import FailedFetchingBooksInYear from "./FailedFetchingBooksInYear";
import LoadingBooksInYear from "./LoadingBooksInYear";
import SingleBook from "./SingleBook";

const SingleYear = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { departmentId } = useParams();

  const status = useSelector(
    (state: RootState) => state.book[departmentId!].status
  );
  const books = useSelector(
    (state: RootState) => state.book[departmentId!].books
  );

  return (
    <div className="px-5 min-h-screen">
      <h3
        className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        {state.department}
      </h3>
      <div className="px-2 pb-1 border-b-2 border-slate-600 w-fit my-2">
        {state.year}
      </div>
      {status === "loading" ? (
        <LoadingBooksInYear />
      ) : status === "failed" ? (
        <FailedFetchingBooksInYear />
      ) : (
        <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-3 sm:gap-6 md:grid-cols-4 my-4 w-fit md:mr-auto md:ml-0">
          {books.map((book) => (
            <SingleBook
              key={book._id}
              year={state.year}
              department={state.department}
              bookInfo={book}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleYear;
