import React from "react";
import { Outlet } from "react-router-dom";

const CartSharedLayout = () => {
  return (
    <div className="px-5 py-5">
      <Outlet />
    </div>
  );
};

export default CartSharedLayout;
