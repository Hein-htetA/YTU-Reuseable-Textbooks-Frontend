import React, { useState, ChangeEvent, FormEvent } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { searchBookByTitle, SelectSearchStatus } from "../../slices/bookSlice";

const errorClass =
  "border-2 border-red-500 px-4 py-2 rounded-full text-sm w-full outline-none";

const normalClass =
  "border-2 border-slate-500 px-4 py-2 rounded-full text-sm w-full outline-none";

const buttonErrorClass =
  "absolute text-2xl h-10 right-0 px-2 pl-3 rounded-full border-2 border-red-500";

const buttonNormalClass =
  "absolute text-2xl h-10 right-0 px-2 pl-3 rounded-full border-2 border-slate-500";

const SearchBox = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const searchStatus = useSelector(SelectSearchStatus);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setTitleError(true);
      return;
    }
    navigate("search");
    dispatch(searchBookByTitle(title));
  };

  return (
    <form className="my-6 mx-auto relative w-8/12" onSubmit={handleSubmit}>
      <input
        type="text"
        className={titleError ? errorClass : normalClass}
        placeholder="Enter the book title"
        value={title}
        name="title"
        onChange={onChangeInput}
        disabled={searchStatus === "loading"}
      />
      <button
        className={titleError ? buttonErrorClass : buttonNormalClass}
        disabled={searchStatus === "loading"}
      >
        <BiSearchAlt className="text-slate-500" />
      </button>
    </form>
  );
};

export default SearchBox;
