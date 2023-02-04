import React, { useRef, useEffect, useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiErrorAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  resetUpdateState,
  selectUpdateStatus,
  selectUserData,
  updateUser,
} from "../slices/userSlice";

const icons = {
  idle: <AiOutlineCloudUpload className="text-slate-500" />,
  succeeded: <IoMdCheckmarkCircleOutline className="text-green-700" />,
  failed: <BiErrorAlt className="text-red-600" />,
  loading: <BsArrowRepeat className="animate-spin text-slate-500" />,
};

interface Props {
  profileShow: boolean;
  setProfileShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  rollNo: string;
}

const showClass =
  "fixed top-16 right-4 bg-slate-200 rounded-3xl z-40 flex flex-col text-sm p-2 gap-y-1 transition-transform duration-300";

const hideClass =
  "fixed top-16 right-4 bg-slate-200 rounded-3xl z-40 flex flex-col text-sm p-2 gap-y-1 translate-x-[calc(100%+2rem)] transition-transform duration-300";

const Profile = ({ profileShow, setProfileShow }: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    rollNo: "",
  });
  const profileRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const updateStatus = useSelector(selectUpdateStatus);
  const userData = useSelector(selectUserData);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    dispatch(resetUpdateState());
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!profileRef.current!.contains(e.target as Node)) {
        setProfileShow(false);
      }
    },
    [setProfileShow]
  );

  useEffect(() => {
    if (profileShow) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [handleClickOutside, profileShow]);

  //sync global store and localState
  useEffect(() => {
    setFormValues((formValues) => ({ ...formValues, rollNo: userData.rollNo }));
  }, [userData]);

  return (
    <div className={profileShow ? showClass : hideClass} ref={profileRef}>
      <div className="bg-white rounded-2xl p-2">
        <div className="text-center text-base">{userData.name}</div>
        <div className="text-center mb-1">{userData.email}</div>
        <div className="flex justify-between gap-2 items-center mb-1">
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            placeholder="V-R.EP-14"
            value={formValues.rollNo}
            onChange={onChangeInput}
            className="outline-none border-b-2 border-slate-300 w-32 px-1 -ml-1 pt-1"
          />
          <button
            className="text-2xl"
            onClick={() => dispatch(updateUser(formValues))}
            disabled={updateStatus === "loading"}
          >
            {icons[updateStatus]}
          </button>
        </div>
      </div>
      <button className="w-fit ml-auto px-3 py-1 my-2 bg-slate-300 text-slate-600 rounded-3xl font-bold">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
