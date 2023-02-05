import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBox = () => {
  return (
    <form className="my-6 mx-auto relative w-8/12">
      <input
        type="text"
        className="border-2 border-slate-500 px-4 py-2 rounded-full text-sm w-full outline-none"
        placeholder="Enter the book title"
      />
      <button className="absolute text-2xl h-10 right-0 px-2 pl-3 rounded-full border-2 border-slate-500">
        <BiSearchAlt className="text-slate-500" />
      </button>
    </form>
  );
};

export default SearchBox;
