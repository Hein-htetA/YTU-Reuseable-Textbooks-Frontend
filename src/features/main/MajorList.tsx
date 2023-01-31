import React from "react";
import SearchBox from "./SearchBox";
import SingleMajor from "./SingleMajor";

const majorList: string[] = [
  "Architecture",
  "Civil Engineering",
  "Chemical Engineering",
  "Computer Engineering and Information Technology",
  "Electrical Power Engineering",
  "Electronic Engineering",
  "Food Engineering",
  "Mechanical Engineering",
  "Mechatronic Engineering",
  "Metallurgical Engineering",
  "Mining Engineering",
  "Petroleum Engineering",
  "Textile Engineering",
];

const majorShortName: string[] = [
  "Archi",
  "Civil",
  "Chemical",
  "CEIT",
  "EP",
  "EC",
  "FE",
  "Mechanical",
  "McE",
];

const MajorList = () => {
  return (
    <main className="">
      <SearchBox />
      <h1 className="text-xl text-slate-700 text-center uppercase px-6 border-b-2 border-slate-700 w-fit mx-auto pb-1">
        Departments
      </h1>
      <div className="py-3 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {majorList.map((major, index) => (
          <SingleMajor key={index} />
        ))}
      </div>
    </main>
  );
};

export default MajorList;
