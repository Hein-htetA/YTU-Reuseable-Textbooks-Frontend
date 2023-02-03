import React from "react";

interface Props {
  email: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  emailError: string;
  handleEmailBlur: () => void;
}

const RegisterEmailInput = ({
  email,
  onChangeInput,
  disabled,
  emailError,
  handleEmailBlur,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="email">
        Email
        {emailError && (
          <span className="ml-1 text-red-500 text-xs">{"- " + emailError}</span>
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
        className="px-3 py-1 border-2 border-slate-500 rounded-md mt-1 outline-none"
      />
    </div>
  );
};

export default RegisterEmailInput;
