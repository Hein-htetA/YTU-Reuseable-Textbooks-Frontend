import React from "react";
import { Link, useParams } from "react-router-dom";
import { defaultBookImg } from "../../../url";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addToCart } from "../../slices/cartSlice";
import { Book, markBookAsInCart } from "../../slices/bookSlice";

interface Props {
  department?: string;
  year?: string;
  bookInfo: Book;
}

const addToCartClass =
  "text-xs w-full rounded-xl border-2 border-slate-500 text-slate-500 py-1 font-bold flex items-center justify-center uppercase";
const inCartClass =
  "text-xs w-full rounded-xl border-2 border-pink-600 bg-pink-600 text-white py-1 font-bold flex items-center justify-center uppercase";

const SingleBook = ({ department, year, bookInfo }: Props) => {
  const { departmentId, year: yearId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(bookInfo));
    dispatch(markBookAsInCart({ departmentId, bookId: bookInfo._id }));
  };
  return (
    <div className="w-40 flex flex-col ">
      <Link
        to={
          departmentId
            ? `/department/${departmentId}/year/${yearId}/book/${bookInfo._id}`
            : `/search/${bookInfo._id}`
        }
        state={{ department, year, bookInfo }}
      >
        <img
          src={bookInfo.bookPhotoUrl || defaultBookImg}
          alt="book"
          className="aspect-[3/4] object-cover rounded-lg"
        />
      </Link>
      <div className="mt-2 font-bold leading-5 grow capitalize">
        {bookInfo.title}
      </div>
      <div className="mb-2 text-xs font-bold text-pink-600 capitalize">
        {bookInfo.edition}
      </div>
      <div className="text-xs font-bold text-slate-600 grow capitalize">
        {bookInfo.author}
      </div>
      <div className="text-sm text-pink-600 mb-3">{bookInfo.price} Kyats</div>
      <div>
        {bookInfo.status === "cart" ? (
          <button className={inCartClass}>
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
  );
};

export default SingleBook;
