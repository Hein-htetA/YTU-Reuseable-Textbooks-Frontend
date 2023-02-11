import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectItems, SelectTotalAmount } from "../../slices/cartSlice";
import CheckoutForm from "./CheckoutForm";
import SingleCartItem from "./SingleCartItem";

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const itemsInCart = useSelector(SelectItems);
  const totalAmount = useSelector(SelectTotalAmount);
  return (
    <div className="px-5 py-5 w-full max-w-3xl mx-auto text-sm min-h-screen">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      <div className="h-[2px] bg-slate-500 my-5"></div>
      <div className="grid grid-cols-[minmax(0,2.5fr)_1fr_1fr_auto] gap-5 items-center">
        {itemsInCart.map((book) => (
          <SingleCartItem key={book._id} bookInfo={book} />
        ))}
      </div>
      {itemsInCart.length === 0 && (
        <div className="mx-auto w-fit text-xl">Empty Cart</div>
      )}
      <div className="h-[2px] bg-slate-500 my-5"></div>

      <div className="flex justify-between items-start -mt-2">
        {!isCheckout && (
          <button
            className="px-6 py-2 bg-slate-500 tracking-wider text-white text-sm capitalize rounded-full"
            onClick={() => setIsCheckout(true)}
          >
            checkout
          </button>
        )}
        <div className="ml-auto w-fit py-2">
          Total: <span>{totalAmount} Kyats</span>
        </div>
      </div>
      {isCheckout && <CheckoutForm />}
    </div>
  );
};

export default Cart;
