import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectItems, SelectTotalAmount } from "../../slices/cartSlice";
import CheckoutForm from "./CheckoutForm";
import SingleCartItem from "./SingleCartItem";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../slices/userSlice";

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const itemsInCart = useSelector(SelectItems);
  const totalAmount = useSelector(SelectTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (itemsInCart.length < 1) {
      setIsCheckout(false);
    }
  }, [itemsInCart.length]);
  return (
    <div className="w-full max-w-3xl mx-auto text-sm min-h-screen">
      <div className="text-lg flex justify-between items-center font-bold mb-4">
        <div>Shopping Cart</div>
        {isLoggedIn && (
          <Link
            to="/cart/order-history"
            className="text-sm flex items-center gap-1 text-pink-500"
          >
            <div>Order History</div>
            <RxDoubleArrowRight className="text-lg" />
          </Link>
        )}
      </div>
      <div className="h-[2px] bg-slate-500 my-5"></div>
      <div className="grid grid-cols-[minmax(0,2.5fr)_1fr_1fr_auto] gap-5 items-center">
        {itemsInCart.map((book) => (
          <SingleCartItem key={book._id} bookInfo={book} />
        ))}
      </div>
      {itemsInCart.length === 0 && (
        <div className="mx-auto h-32 text-lg w-fit text-slate-500 my-auto flex items-center">
          <div className="py-2 px-6 border-2 border-slate-500 rounded-xl text-center">
            You haven't added anything to your cart
          </div>
        </div>
      )}
      <div className="h-[2px] bg-slate-500 my-5"></div>

      <div className="flex justify-between items-start -mt-2">
        {!isCheckout && itemsInCart.length !== 0 && (
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
      {isCheckout && itemsInCart.length !== 0 && <CheckoutForm />}
    </div>
  );
};

export default Cart;
