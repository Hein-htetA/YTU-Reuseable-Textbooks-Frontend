import React, { useState } from "react";
import BrandName from "./BrandName";
import CartAndAccount from "./CartAndAccount";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

import { logoutUser } from "../slices/userSlice";
import Profile from "./Profile";

const Navbar = () => {
  const [profileShow, setProfileShow] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileShow(false);
  };

  return (
    <nav className="py-4 px-5 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex justify-between items-center sticky top-0 z-10 bg-white">
      <BrandName />
      <CartAndAccount
        setProfileShow={setProfileShow}
        profileShow={profileShow}
      />
      <Profile
        profileShow={profileShow}
        setProfileShow={setProfileShow}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
