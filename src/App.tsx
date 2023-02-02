import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MajorList from "./features/main/MajorList";
import MainSharedLayout from "./SharedLayouts/MainSharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSharedLayout />}>
          <Route index element={<MajorList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
