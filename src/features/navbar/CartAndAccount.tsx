import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { defaultAvator } from "../../url";

const CartAndAccount = () => {
  return (
    <div className="flex gap-5 items-center">
      <span className="text-xl text-slate-700">
        <AiOutlineShoppingCart />
      </span>
      <button>
        <img
          src={defaultAvator}
          alt="avator"
          className="w-5 object-scale-down"
        />
      </button>
    </div>
  );
};

export default CartAndAccount;
