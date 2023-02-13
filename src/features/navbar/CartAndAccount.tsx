import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { defaultAvator } from "../../url";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../slices/userSlice";
import LoginRegisterBtn from "./LoginRegisterBtn";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { SelectTotalCount } from "../slices/cartSlice";

interface Props {
  setProfileShow: React.Dispatch<React.SetStateAction<boolean>>;
  profileShow: boolean;
}
const activeClass =
  "transition-all flex items-center w-[70px] duration-300 ease-in-out overflow-hidden";
const inactiveClass =
  "transition-all flex items-center w-[20px] sm:w-[25px] duration-300 ease-in-out";

const CartAndAccount = ({ setProfileShow, profileShow }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(
    (state: RootState) => state.user.userData.picture
  );
  const totalCount = useSelector(SelectTotalCount);
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 sm:gap-8 items-center">
      <div
        className="text-xl sm:text-2xl text-slate-700 hover:cursor-pointer relative"
        onClick={() => navigate("cart")}
      >
        <AiOutlineShoppingCart />
        {totalCount > 0 && (
          <div className="absolute -right-2 -top-2 clip-count bg-slate-500 text-[9px] font-bold text-white w-5 h-5 flex justify-center items-center">
            <div>{totalCount}</div>
          </div>
        )}
      </div>
      <div className={isLoggedIn ? inactiveClass : activeClass}>
        {isLoggedIn ? (
          <button
            onClick={() => {
              setProfileShow(true);
            }}
            className={profileShow ? "-z-10" : ""}
          >
            <img
              src={userProfile || defaultAvator}
              alt="avator"
              className="object-cover rounded-md"
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
