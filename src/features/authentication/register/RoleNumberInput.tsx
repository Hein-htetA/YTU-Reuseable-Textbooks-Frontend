import React from "react";

interface Props {
  rollNo: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RoleNumberInput = ({ rollNo, onChangeInput, disabled }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="rollNo">Roll Number</label>
      <input
        type="text"
        name="rollNo"
        value={rollNo}
        onChange={onChangeInput}
        disabled={disabled}
        placeholder="V R.EP-14"
        className="px-3 py-1 border-2 border-slate-500 rounded-md mt-1 outline-none"
      />
    </div>
  );
};

export default RoleNumberInput;
