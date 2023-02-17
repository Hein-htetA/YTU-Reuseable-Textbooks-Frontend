import React from "react";

type Props = {
  children: JSX.Element[];
};

const FormContainer = ({ children }: Props) => {
  return (
    <form className="text-sm grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      {children}
    </form>
  );
};

export default FormContainer;
