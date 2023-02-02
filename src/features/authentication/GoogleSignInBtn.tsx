import React, { useEffect, useRef } from "react";

const GoogleSignInBtn = () => {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleCallbackResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "349525303217-7f1t6oh2rranlfq74pg1kvg87ikk047u.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(btnRef.current!, {
      theme: "outline",
      size: "large",
      type: "standard",
      text: "continue_with",
      shape: "pill",
      width: "250",
    });
  }, []);

  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="h-px bg-slate-500 grow"></div>
        <div className="mx-2">Or</div>
        <div className="h-px bg-slate-500 grow"></div>
      </div>
      <div id="signInDiv" className="mx-auto w-fit mt-3" ref={btnRef}></div>
    </div>
  );
};

export default GoogleSignInBtn;
