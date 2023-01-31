import React from "react";
import archi from "../../selection/archi.jpg";

const SingleMajor = () => {
  return (
    <div className="rounded">
      <img
        src={archi}
        alt="department"
        className="rounded-lg shadow-[6px_6px_11px_-3px_rgba(0,0,0,0.75)]"
      />
      <div className="text-center text-base py-4">
        Computer Engineering and Information Technology
      </div>
    </div>
  );
};

export default SingleMajor;
