import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MajorList from "./features/main/MajorList";
import MainSharedLayout from "./SharedLayouts/MainSharedLayout";

function App() {
  const handleCallbackResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "349525303217-7f1t6oh2rranlfq74pg1kvg87ikk047u.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.prompt();
    google.accounts.id.renderButton(document.getElementById("signInDiv")!, {
      theme: "outline",
      size: "medium",
      type: "standard",
      text: "continue_with",
      shape: "pill",
      width: "250",
    });
  }, []);
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
