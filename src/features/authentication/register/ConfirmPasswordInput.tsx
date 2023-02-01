import React from "react";

const ConfirmPasswordInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="text"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="px-3 py-1 border-2 border-slate-500 rounded-md  mt-1"
      />
    </div>
  );
};

export default ConfirmPasswordInput;
