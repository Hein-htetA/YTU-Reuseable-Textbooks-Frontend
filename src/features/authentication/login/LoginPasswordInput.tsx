import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface Props {
  password: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  passwordError?: string;
}

const LoginPasswordInput = ({
  password,
  onChangeInput,
  disabled,
  passwordError,
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
          <span className="ml-1 text-red-500 text-xs">
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
          disabled={disabled}
          autoComplete="new-password"
          className="px-3 py-1 border-2 w-full border-slate-500 rounded-md  mt-1 outline-none"
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

export default LoginPasswordInput;
