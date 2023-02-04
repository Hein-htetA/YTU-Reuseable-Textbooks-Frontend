import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { socialSignIn } from "../slices/userSlice";

const GoogleSignInBtn = () => {
  const [googleError, setGoogleError] = useState(false);

  const btnRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleCallbackResponse = (response: any) => {
    dispatch(socialSignIn(response.credential));
    //console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
    try {
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
    } catch (error) {
      setGoogleError(true);
    }
  }, []);

  if (googleError) {
    return <></>;
  }

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
