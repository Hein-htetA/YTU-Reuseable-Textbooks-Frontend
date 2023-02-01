import React from "react";
import BrandName from "./BrandName";
import CartAndAccount from "./CartAndAccount";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthenticationModal from "../authentication/AuthenticationModal";

const Navbar = () => {
  const authenticationModalOpen = useSelector(
    (state: RootState) => state.user.authenticationModalOpen
  );
  return (
    <nav className="py-4 px-5 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex justify-between items-cente">
      <BrandName />
      <CartAndAccount />
      {true && <AuthenticationModal />}
    </nav>
  );
};

export default Navbar;
