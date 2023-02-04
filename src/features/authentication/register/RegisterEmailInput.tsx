import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  email: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  emailError: string;
  handleEmailBlur: () => void;
}

const normalClass =
  "px-3 py-1 border-2 border-slate-500 rounded-md mt-1 outline-none";

const errorClass =
  "px-3 py-1 rounded-md mt-1 outline-none border-2 border-red-500";

const RegisterEmailInput = ({
  email,
  onChangeInput,
  disabled,
  emailError,
  handleEmailBlur,
}: Props) => {
  const serverErrorMsg = useSelector(
    (state: RootState) => state.user.serverErrorMsg
  );

  return (
    <div className="flex flex-col">
      <label htmlFor="email">
        Email
        {serverErrorMsg ? (
          <span className="ml-1 text-red-500 text-xs font-bold">
            {"- " + serverErrorMsg}
          </span>
        ) : (
          emailError && (
            <span className="ml-1 text-red-500 text-xs font-bold">
              {"- " + emailError}
            </span>
          )
        )}
      </label>

      <input
        type="text"
        name="email"
        value={email}
        onChange={onChangeInput}
        onBlur={handleEmailBlur}
        placeholder="example@gmail.com"
        disabled={disabled}
        className={emailError ? errorClass : normalClass}
      />
    </div>
  );
};

export default RegisterEmailInput;
