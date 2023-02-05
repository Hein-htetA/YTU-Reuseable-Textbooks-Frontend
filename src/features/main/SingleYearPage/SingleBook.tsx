import React from "react";
import book from "../../../book.jpg";

const SingleBook = () => {
  return (
    <div className="w-40 flex flex-col ">
      <img
        src={book}
        alt="book"
        className="aspect-[3/4] object-cover rounded-lg"
      />
      <div className="mt-2 font-bold leading-5 grow">
        Global Advanced CourseBook
      </div>
      <div className="mb-2 text-xs font-bold text-pink-600">
        Eleventh Edition
      </div>
      <div className="text-xs font-bold text-slate-600 grow">
        Lindsay Clandfield
      </div>
      <div className="text-sm text-pink-600">3000 Kyats</div>
      <button className="text-sm w-full rounded-md bg-slate-500 text-white py-1">
        Add to basket
      </button>
    </div>
  );
};

export default SingleBook;
