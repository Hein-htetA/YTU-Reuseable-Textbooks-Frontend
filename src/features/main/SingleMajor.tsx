import React from "react";
import archi from "../../selection/archi.jpg";

interface Props {
  fullName: string;
  shortName: string;
  picture: string;
}

const SingleMajor = ({ fullName, shortName, picture }: Props) => {
  return (
    <div className="rounded">
      <img
        src={picture}
        alt="department"
        className="rounded-lg shadow-[6px_6px_11px_-3px_rgba(0,0,0,0.75)]"
      />
      <div className="text-center text-base py-4">{fullName}</div>
    </div>
  );
};

export default SingleMajor;
