import React from "react";

const LoginErrorMsg = () => {
  return (
    <p className="text-sm text-red-600 -mt-2 mb-2">
      The email and password you entered did not match our records. Please
      double-check and try again.
    </p>
  );
};

export default LoginErrorMsg;
