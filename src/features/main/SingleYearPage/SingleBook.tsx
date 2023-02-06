import React from "react";
import { Link } from "react-router-dom";
import { defaultBookImg } from "../../../url";

interface Book {
  title: string;
  edition: string;
  author: string;
  amountInStock: number;
  bookPhotoId: string;
  bookPhotoUrl: string;
  price: number;
  availableChapters: number[];
  year: number[];
}

interface Props {
  department: string;
  year: string;
  bookInfo: Book;
}

const SingleBook = ({ department, year, bookInfo }: Props) => {
  return (
    <div className="w-40 flex flex-col ">
      <Link to="book/bookId" state={{ department, year, bookInfo }}>
        <img
          src={bookInfo.bookPhotoUrl || defaultBookImg}
          alt="book"
          className="aspect-[3/4] object-cover rounded-lg"
        />
      </Link>
      <div className="mt-2 font-bold leading-5 grow">{bookInfo.title}</div>
      <div className="mb-2 text-xs font-bold text-pink-600">
        {bookInfo.edition}
      </div>
      <div className="text-xs font-bold text-slate-600 grow">
        {bookInfo.author}
      </div>
      <div className="text-sm text-pink-600">{bookInfo.price} Kyats</div>
      <button className="text-sm w-full rounded-md bg-slate-500 text-white py-1">
        Add to basket
      </button>
    </div>
  );
};

export default SingleBook;
