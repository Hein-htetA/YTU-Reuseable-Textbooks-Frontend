import React from "react";

const PasswordInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        placeholder="Password"
        className="px-3 py-1 border-2 border-slate-500 rounded-md  mt-1"
      />
    </div>
  );
};

export default PasswordInput;
