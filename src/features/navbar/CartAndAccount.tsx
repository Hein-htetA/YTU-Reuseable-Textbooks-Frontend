import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { defaultAvator } from "../../url";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../slices/userSlice";
import LoginRegisterBtn from "./LoginRegisterBtn";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

interface Props {
  setProfileShow: React.Dispatch<React.SetStateAction<boolean>>;
  profileShow: boolean;
}
const activeClass =
  "transition-all flex items-center w-[70px] duration-300 ease-in-out overflow-hidden";
const inactiveClass =
  "transition-all flex items-center w-[20px] duration-300 ease-in-out";

const CartAndAccount = ({ setProfileShow, profileShow }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userProfile = useSelector(
    (state: RootState) => state.user.userData.picture
  );
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-center">
      <span
        className="text-xl text-slate-700 hover:cursor-pointer"
        onClick={() => navigate("cart")}
      >
        <AiOutlineShoppingCart />
      </span>
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
              className="w-5 object-scale-down rounded-md"
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
