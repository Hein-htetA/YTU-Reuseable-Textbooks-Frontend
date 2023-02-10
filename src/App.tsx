import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DepartmentList from "./features/main/IndexPage/DepartmentList";
import SearchBookDetail from "./features/main/Search/SearchBookDetail";
import SearchResults from "./features/main/Search/SearchResults";
import SingleDepartment from "./features/main/SingleDepartmentPage/SingleDepartment";
import SingleBookDetail from "./features/main/SingleYearPage/SingleBookDetail";
import SingleYear from "./features/main/SingleYearPage/SingleYear";
import MainSharedLayout from "./SharedLayouts/MainSharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSharedLayout />}>
          <Route index element={<DepartmentList />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="search/:bookId" element={<SearchBookDetail />} />
          <Route
            path="department/:departmentId"
            element={<SingleDepartment />}
          />
          <Route
            path="department/:departmentId/year/:year"
            element={<SingleYear />}
          />
          <Route
            path="department/:departmentId/year/:year/book/:bookId"
            element={<SingleBookDetail />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
