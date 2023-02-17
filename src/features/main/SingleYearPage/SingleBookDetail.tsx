import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineDoubleRight,
  AiOutlineClockCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { defaultBookImg } from "../../../url";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addToCart } from "../../slices/cartSlice";
import { markBookAsInCart } from "../../slices/bookSlice";

const addToCartClass =
  "text-xs w-full rounded-xl border-2 border-slate-500 text-slate-500 py-2 font-bold flex items-center justify-center uppercase";
const inCartClass =
  "text-xs w-full rounded-xl border-2 border-pink-600 bg-pink-600 text-white py-2 font-bold flex items-center justify-center uppercase";

const SingleBookDetail = () => {
  const { state } = useLocation();
  const { departmentId, bookId } = useParams();
  const { department, year } = state;

  const book = useSelector((state: RootState) =>
    state.book.departments[departmentId!].books.find(
      (book) => book._id === bookId
    )
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    dispatch(markBookAsInCart({ departmentId, bookId: book?._id }));
  };

  useEffect(() => {
    if (!book) {
      navigate("/");
    }
  }, []);

  return (
    <div className="px-5 min-h-screen">
      {department && (
        <h3
          className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold hover:cursor-pointer"
          onClick={() => navigate(-2)}
        >
          {department}
        </h3>
      )}
      {year && (
        <div className="px-2 pb-1 border-b-2 border-slate-600 w-fit my-2 font-bold">
          {year}
        </div>
      )}
      <div className="flex flex-col my-6 sm:grid sm:grid-cols-[auto_1fr] gap-4 ">
        <img
          src={book?.bookPhotoUrl || defaultBookImg}
          alt=""
          className="w-60 mx-auto rounded-md object-fill aspect-[3/4]"
        />
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="font-bold text-center mb-1 text-base sm:text-left capitalize">
            {book?.title + " (" + book?.edition + ")"}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 capitalize">
            <div>Author: </div>
            <div>{book?.author}</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 ">
            <div>Available Chapters: </div>
            <div>
              {book?.availableChapters.some((chapter: number) => chapter === 99)
                ? "Start - End"
                : book?.availableChapters.join(", ")}
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            <div>Price: </div>
            <div>{book?.price} Kyats</div>
          </div>
          <div className="flex items-center gap-2 font-bold -mb-2 mt-2">
            <AiOutlineDoubleRight className="text-base" />
            <div>
              {book?.amountInStock === 1 ? (
                <span className="text-red-500">Only 1 left</span>
              ) : (
                <span>{book?.amountInStock}</span>
              )}{" "}
              in stock
            </div>
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
              <button onClick={handleAddToCart} className={addToCartClass}>
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetail;
