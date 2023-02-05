import React from "react";
import Navbar from "../features/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../features/footer/Footer";

const MainSharedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainSharedLayout;
