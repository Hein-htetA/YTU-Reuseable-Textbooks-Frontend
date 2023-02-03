import React from "react";

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
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChangeInput}
        disabled={disabled}
        className="px-3 py-1 border-2 border-slate-500 rounded-md  mt-1 outline-none"
      />
    </div>
  );
};

export default LoginPasswordInput;
