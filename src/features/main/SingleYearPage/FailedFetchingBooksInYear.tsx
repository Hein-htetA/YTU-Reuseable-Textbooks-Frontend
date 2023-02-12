import React from "react";
import { BsTelegram } from "react-icons/bs";

const FailedFetchingBooksInYear = () => {
  return (
    <div className="flex flex-col max-w-lg mx-auto my-6 p-5 border-2 border-slate-500 rounded-lg gap-6">
      <div className="text-center text-lg">
        <div>Sorry. We're having some techanical issues.</div>
        <div>Try refreshing the page.</div>
      </div>
      <button
        className="py-2 border-2 border-slate-500 bg-slate-500 text-white rounded-3xl"
        onClick={() => window.location.reload()}
      >
        RETRY
      </button>

      <a
        href="https://t.me/Hein_HtetAung"
        target={"_blank"}
        rel="noreferrer"
        className="py-2 -mt-3 border-2 border-slate-500 rounded-3xl"
      >
        <div className="flex justify-center items-center gap-1">
          <BsTelegram className="text-xl text-slate-500" />
          <div> CONTACT US</div>
        </div>
      </a>
    </div>
  );
};

export default FailedFetchingBooksInYear;
