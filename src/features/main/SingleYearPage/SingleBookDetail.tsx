import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight, AiOutlineClockCircle } from "react-icons/ai";
import { defaultBookImg } from "../../../url";

const SingleBookDetail = () => {
  const { state } = useLocation();
  const { department, year, bookInfo } = state;
  const navigate = useNavigate();
  return (
    <div className="px-5 min-h-screen">
      <h3
        className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold hover:cursor-pointer"
        onClick={() => navigate(-2)}
      >
        {department}
      </h3>
      <div className="px-2 pb-1 border-b-2 border-slate-600 w-fit my-2 font-bold">
        {year}
      </div>
      <div className="flex flex-col my-6 sm:grid sm:grid-cols-[auto_1fr] gap-4 ">
        <img
          src={bookInfo.bookPhotoUrl || defaultBookImg}
          alt=""
          className="w-60 mx-auto rounded-md object-fill aspect-[3/4]"
        />
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="font-bold text-center mb-1 text-base sm:text-left">
            {bookInfo.title + "(" + bookInfo.edition + ")"}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Author - </div>
            <div>{bookInfo.author}</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Available Chapters -</div>
            <div>
              {bookInfo.availableChapters.some(
                (chapter: number) => chapter === 99
              )
                ? "1 - End"
                : bookInfo.availableChapters.join(", ")}
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Price - </div>
            <div>{bookInfo.price} Kyats</div>
          </div>
          <div className="flex items-center gap-2 font-bold -mb-2 mt-2">
            <AiOutlineDoubleRight className="text-base" />
            <div>{bookInfo.amountInStock} + in stock</div>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <AiOutlineClockCircle className="text-base" />
            <div>YTU Delivery within 2 days</div>
          </div>
          <button className="text-sm w-36 rounded-md bg-slate-500 text-white py-1 mt-3">
            Add to basket
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetail;
