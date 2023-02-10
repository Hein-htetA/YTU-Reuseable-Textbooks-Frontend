import React from "react";
import {
  SelectSearchResults,
  SelectSearchStatus,
} from "../../slices/bookSlice";
import { useSelector } from "react-redux";
import LoadingBooksInYear from "../SingleYearPage/LoadingBooksInYear";
import SingleBook from "../SingleYearPage/SingleBook";
import NoResultFound from "./NoResultFound";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const searchStatus = useSelector(SelectSearchStatus);
  const searchResults = useSelector(SelectSearchResults);
  const navigate = useNavigate();

  return (
    <div className="px-5 grow min-h-screen">
      {searchStatus === "loading" && <LoadingBooksInYear />}
      {((searchStatus === "succeeded" && searchResults.length === 0) ||
        searchStatus === "failed") && <NoResultFound />}
      <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6 my-4 w-fit md:mx-auto mb-10">
        {searchResults.map((book) => (
          <SingleBook key={book._id} bookInfo={book} />
        ))}
      </div>
      <button
        className="flex px-2 py-1 fixed left-5 bottom-5 bg-slate-600 text-white items-center rounded-md "
        onClick={() => navigate("/")}
      >
        <AiOutlineLeft />
        <div>Go Back</div>
      </button>
    </div>
  );
};

export default SearchResults;
