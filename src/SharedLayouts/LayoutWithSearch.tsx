import React from "react";
import { Outlet } from "react-router-dom";
import SearchBox from "../features/main/Search/SearchBox";

const LayoutWithSearch = () => {
  return (
    <div>
      <SearchBox />
      <Outlet />
    </div>
  );
};

export default LayoutWithSearch;
