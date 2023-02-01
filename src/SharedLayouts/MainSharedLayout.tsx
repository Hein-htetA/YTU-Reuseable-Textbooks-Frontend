import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../features/footer/Footer";

const MainSharedLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainSharedLayout;
