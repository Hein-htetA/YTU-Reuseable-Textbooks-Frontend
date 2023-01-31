import React from "react";
import BrandName from "./BrandName";
import CartAndAccount from "./CartAndAccount";

const Navbar = () => {
  return (
    <nav className="py-4 px-5 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex justify-between items-cente">
      <BrandName />
      <CartAndAccount />
    </nav>
  );
};

export default Navbar;
