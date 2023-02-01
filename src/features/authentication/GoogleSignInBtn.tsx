import React from "react";

const GoogleSignInBtn = () => {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="h-px bg-slate-500 grow"></div>
        <div className="mx-2">Or</div>
        <div className="h-px bg-slate-500 grow"></div>
      </div>
      <div id="signInDiv" className="mx-auto w-fit mt-3"></div>
    </div>
  );
};

export default GoogleSignInBtn;
