import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface Props {
  confirmPassword: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  confirmPasswordError: string;
  handleConfirmPasswordBlur: () => void;
}

const normalClass =
  "px-3 py-1 w-full border-2 border-slate-500 rounded-md mt-1 outline-none";

const errorClass =
  "px-3 py-1 w-full rounded-md mt-1 outline-none border-2 border-red-500";

const ConfirmPasswordInput = ({
  confirmPassword,
  onChangeInput,
  disabled,
  confirmPasswordError,
  handleConfirmPasswordBlur,
}: Props) => {
  const [passwordHide, setPasswordHide] = useState(true);
  const togglePasswordHide = () => {
    setPasswordHide(!passwordHide);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="confirmPassword">
        Confirm Password
        {confirmPasswordError && (
          <span className="ml-1 text-red-500 text-xs font-bold">
            {"- " + confirmPasswordError}
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={passwordHide ? "password" : "text"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChangeInput}
          onBlur={handleConfirmPasswordBlur}
          className={confirmPasswordError ? errorClass : normalClass}
          disabled={disabled}
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

export default ConfirmPasswordInput;
