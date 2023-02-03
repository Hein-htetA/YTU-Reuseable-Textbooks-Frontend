import React from "react";

interface Props {
  confirmPassword: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  confirmPasswordError: string;
  handleConfirmPasswordBlur: () => void;
}

const ConfirmPasswordInput = ({
  confirmPassword,
  onChangeInput,
  disabled,
  confirmPasswordError,
  handleConfirmPasswordBlur,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="confirmPassword">
        Confirm Password
        {confirmPasswordError && (
          <span className="ml-1 text-red-500 text-xs">
            {"- " + confirmPasswordError}
          </span>
        )}
      </label>
      <input
        type="text"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={onChangeInput}
        onBlur={handleConfirmPasswordBlur}
        className="px-3 py-1 border-2 border-slate-500 rounded-md  mt-1 outline-none"
        disabled={disabled}
      />
    </div>
  );
};

export default ConfirmPasswordInput;
