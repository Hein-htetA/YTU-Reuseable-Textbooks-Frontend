import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface Props {
  password: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  passwordError: string;
  handlePasswordBlur: () => void;
}

const normalClass =
  "px-3 py-1 w-full border-2 border-slate-500 rounded-md mt-1 outline-none";

const errorClass =
  "px-3 py-1 w-full rounded-md mt-1 outline-none border-2 border-red-500";

const RegisterPasswordInput = ({
  password,
  onChangeInput,
  disabled,
  passwordError,
  handlePasswordBlur,
}: Props) => {
  const [passwordHide, setPasswordHide] = useState(true);
  const togglePasswordHide = () => {
    setPasswordHide(!passwordHide);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="password">
        Password
        {passwordError && (
          <span className="ml-1 text-red-500 text-xs font-bold">
            {"- " + passwordError}
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={passwordHide ? "password" : "text"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangeInput}
          onBlur={handlePasswordBlur}
          disabled={disabled}
          className={passwordError ? errorClass : normalClass}
        />
        {passwordHide ? (
          <AiOutlineEye
            className="text-2xl absolute right-2 top-2 text-slate-500 "
            onClick={togglePasswordHide}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="text-2xl absolute right-2 top-2 text-slate-500 "
            onClick={togglePasswordHide}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPasswordInput;
