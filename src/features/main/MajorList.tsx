import React from "react";
import {
  archiImg,
  ceitImg,
  chemImg,
  civilImg,
  ecImg,
  epImg,
  foodImg,
  mceImg,
  mechImg,
  metalImg,
  miningImg,
  textileImg,
} from "../../url";
import SearchBox from "./SearchBox";
import SingleMajor from "./SingleMajor";

interface singleMajor {
  fullName: string;
  shortName: string;
  picture: string;
}

const majorList: singleMajor[] = [
  {
    fullName: "Architecture",
    shortName: "Arch",
    picture: archiImg,
  },
  {
    fullName: "Civil Engineering",
    shortName: "C",
    picture: civilImg,
  },
  {
    fullName: "Chemical Engineering",
    shortName: "ChE",
    picture: chemImg,
  },
  {
    fullName: "Computer Engineering and Information Technology",
    shortName: "CEIT",
    picture: ceitImg,
  },
  {
    fullName: "Electronic Engineering",
    shortName: "EC",
    picture: ecImg,
  },
  {
    fullName: "Electrical Power Engineering",
    shortName: "EP",
    picture: epImg,
  },
  {
    fullName: "Food Engineering",
    shortName: "FE",
    picture: foodImg,
  },
  {
    fullName: "Mechanical Engineering",
    shortName: "Mech",
    picture: mechImg,
  },
  {
    fullName: "Mechatronic Engineering",
    shortName: "McE",
    picture: mceImg,
  },
  {
    fullName: "Metallurgical Engineering",
    shortName: "Met",
    picture: metalImg,
  },
  {
    fullName: "Mining Engineering",
    shortName: "Mn",
    picture: miningImg,
  },
  {
    fullName: "Textile Engineering",
    shortName: "Tex",
    picture: textileImg,
  },
];

const MajorList = () => {
  return (
    <main className="">
      <SearchBox />
      <h1 className="text-xl text-slate-700 text-center uppercase px-6 border-b-2 border-slate-700 w-fit mx-auto pb-1">
        Departments
      </h1>
      <div className="py-3 px-5 mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {majorList.map((major, index) => (
          <SingleMajor key={index} {...major} />
        ))}
      </div>
    </main>
  );
};

export default MajorList;
