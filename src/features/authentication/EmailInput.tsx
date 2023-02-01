import React from "react";

const EmailInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        placeholder="example@gmail.com"
        className="px-2 py-1 border-2 border-slate-500 rounded-md mt-1"
      />
    </div>
  );
};

export default EmailInput;
