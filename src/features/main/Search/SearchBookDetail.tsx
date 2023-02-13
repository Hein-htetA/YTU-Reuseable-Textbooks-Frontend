import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { defaultBookImg } from "../../../url";
import { markBookFromSearchResults } from "../../slices/bookSlice";
import { addToCart } from "../../slices/cartSlice";
import {
  AiOutlineDoubleRight,
  AiOutlineClockCircle,
  AiOutlineShoppingCart,
  AiOutlineLeft,
} from "react-icons/ai";

const addToCartClass =
  "text-xs w-full rounded-xl border-2 border-slate-500 text-slate-500 py-2 font-bold flex items-center justify-center uppercase";
const inCartClass =
  "text-xs w-full rounded-xl border-2 border-pink-600 bg-pink-600 text-white py-2 font-bold flex items-center justify-center uppercase";

const SearchBookDetail = () => {
  const { bookId } = useParams();

  const book = useSelector((state: RootState) =>
    state.book.searchResults.find((book) => book._id === bookId)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    dispatch(markBookFromSearchResults(bookId));
  };

  useEffect(() => {
    if (!book) {
      navigate("/");
    }
  }, []);

  return (
    <div className="px-5 min-h-screen">
      <div className="flex flex-col my-6 sm:grid sm:grid-cols-[auto_1fr] gap-4 ">
        <img
          src={book?.bookPhotoUrl || defaultBookImg}
          alt=""
          className="w-60 mx-auto rounded-md object-fill aspect-[3/4]"
        />
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="font-bold text-center mb-1 text-base sm:text-left">
            {book?.title + "(" + book?.edition + ")"}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
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
              <button onClick={handleAddToCart} className={addToCartClass}>
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        className="flex px-2 py-1 fixed left-5 bottom-5 bg-slate-600 text-white items-center rounded-md "
        onClick={() => navigate(-1)}
      >
        <AiOutlineLeft />
        <div>Go Back</div>
      </button>
    </div>
  );
};

export default SearchBookDetail;
