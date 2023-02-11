import React from "react";
import {
  AiOutlineClockCircle,
  AiOutlineDoubleRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultBookImg } from "../../../url";

const addToCartClass =
  "text-xs w-full rounded-xl border-2 border-slate-500 text-slate-500 py-2 font-bold flex items-center justify-center uppercase";
const inCartClass =
  "text-xs w-full rounded-xl border-2 border-pink-600 bg-pink-600 text-white py-2 font-bold flex items-center justify-center uppercase";

const CartBookDetail = () => {
  const { state } = useLocation();
  const { book } = state;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col my-6 sm:grid sm:grid-cols-[auto_1fr] gap-4 px-5">
      <img
        src={book?.bookPhotoUrl || defaultBookImg}
        alt=""
        className="w-60 mx-auto rounded-md object-fill aspect-[3/4]"
      />
      <div className="flex flex-col gap-y-2 text-sm">
        <div className="font-bold text-center mb-1 text-base sm:text-left capitalize">
          {book?.title + " (" + book?.edition + ")"}
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-1 capitalize">
          <div>Author - </div>
          <div>{book?.author}</div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-1">
          <div>Available Chapters -</div>
          <div>
            {book?.availableChapters.some((chapter: number) => chapter === 99)
              ? "1 - End"
              : book?.availableChapters.join(", ")}
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-1">
          <div>Price - </div>
          <div>{book?.price} Kyats</div>
        </div>
        <div className="flex items-center gap-2 font-bold -mb-2 mt-2">
          <AiOutlineDoubleRight className="text-base" />
          <div>{book?.amountInStock} + in stock</div>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <AiOutlineClockCircle className="text-base" />
          <div>YTU Delivery within 2 days</div>
        </div>
        <div>
          {book?.status === "cart" ? (
            <button className={inCartClass} onClick={() => navigate("/cart")}>
              <AiOutlineShoppingCart className="text-lg mr-2" />
              <div>in cart</div>
            </button>
          ) : (
            <button className={addToCartClass}>Add to cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartBookDetail;
