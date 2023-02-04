import React from "react";

interface Props {
  name: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  handleNameBlur: () => void;
  nameError: string;
}

const normalClass =
  "px-3 py-1 border-2 border-slate-500 rounded-md mt-1 outline-none";

const errorClass =
  "px-3 py-1 rounded-md mt-1 outline-none border-2 border-red-500";

const NameInput = ({
  name,
  onChangeInput,
  disabled,
  handleNameBlur,
  nameError,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="rollNo">
        Name
        {nameError && (
          <span className="ml-1 text-red-500 text-xs font-bold">
            {"- " + nameError}
          </span>
        )}
      </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChangeInput}
        disabled={disabled}
        onBlur={handleNameBlur}
        placeholder="Enter Your Full Name"
        className={nameError ? errorClass : normalClass}
      />
    </div>
  );
};

export default NameInput;
