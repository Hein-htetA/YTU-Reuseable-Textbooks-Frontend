import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { defaultAvator } from "../../url";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../slices/userSlice";
import LoginRegisterBtn from "./LoginRegisterBtn";
import { toggleLogin } from "../slices/userSlice";

const activeClass =
  "transition-all flex items-center w-[80px] duration-300 ease-in-out";
const inactiveClass =
  "transition-all flex items-center w-[20px] duration-300 ease-in-out";

const CartAndAccount = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 items-center">
      <span
        className="text-xl text-slate-700"
        onClick={() => dispatch(toggleLogin())}
      >
        <AiOutlineShoppingCart />
      </span>
      <div className={isLoggedIn ? inactiveClass : activeClass}>
        {isLoggedIn ? (
          <button>
            <img
              src={defaultAvator}
              alt="avator"
              className="w-5 object-scale-down"
            />
          </button>
        ) : (
          <LoginRegisterBtn />
        )}
      </div>
    </div>
  );
};

export default CartAndAccount;
