import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="p-1 bg-slate-500 text-white"
        onClick={() => navigate("/")}
      >
        HOME
      </button>
    </div>
  );
};

export default NotFound;
