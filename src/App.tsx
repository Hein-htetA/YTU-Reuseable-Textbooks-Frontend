import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Cart from "./features/main/Cart/Cart";
import CartBookDetail from "./features/main/Cart/CartBookDetail";
import DepartmentList from "./features/main/IndexPage/DepartmentList";
import OrderHistory from "./features/main/OrderHistory/OrderHistory";
import SearchBookDetail from "./features/main/Search/SearchBookDetail";
import SearchResults from "./features/main/Search/SearchResults";
import SingleDepartment from "./features/main/SingleDepartmentPage/SingleDepartment";
import SingleBookDetail from "./features/main/SingleYearPage/SingleBookDetail";
import SingleYear from "./features/main/SingleYearPage/SingleYear";
import CartSharedLayout from "./SharedLayouts/CartSharedLayout";
import MainSharedLayout from "./SharedLayouts/MainSharedLayout";
import NotFound from "./SharedLayouts/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSharedLayout />}>
          <Route index element={<DepartmentList />} />
          <Route path="cart" element={<CartSharedLayout />}>
            <Route index element={<Cart />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="cart-book-detail" element={<CartBookDetail />} />
          </Route>

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
