import React from "react";

const RoleNumberInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="rollNo">Roll Number</label>
      <input
        type="text"
        name="rollNo"
        placeholder="V R.EP-14"
        className="px-3 py-1 border-2 border-slate-500 rounded-md mt-1"
      />
    </div>
  );
};

export default RoleNumberInput;
