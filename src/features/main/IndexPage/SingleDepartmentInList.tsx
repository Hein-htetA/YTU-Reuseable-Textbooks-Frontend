import React from "react";
import { Link } from "react-router-dom";

interface Props {
  fullName: string;
  shortName: string;
  picture: string;
}

const SingleDepartmentInList = ({ fullName, shortName, picture }: Props) => {
  return (
    <div>
      <Link to={`department/${shortName}`}>
        <img
          src={picture}
          alt="department"
          className="rounded-lg shadow-[6px_6px_11px_-3px_rgba(0,0,0,0.75)]"
        />
      </Link>
      <div className="text-center text-base py-4">{fullName}</div>
    </div>
  );
};

export default SingleDepartmentInList;
