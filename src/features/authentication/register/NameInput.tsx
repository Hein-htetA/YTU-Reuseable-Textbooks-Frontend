import React from "react";

interface Props {
  name: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const NameInput = ({ name, onChangeInput, disabled }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="rollNo">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChangeInput}
        disabled={disabled}
        placeholder="Enter Your Full Name"
        className="px-3 py-1 border-2 border-slate-500 rounded-md mt-1 outline-none"
      />
    </div>
  );
};

export default NameInput;
