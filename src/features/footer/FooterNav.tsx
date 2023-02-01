import React from "react";

interface Props {
  setNav: React.Dispatch<React.SetStateAction<string>>;
  nav: string;
}

const activeClass =
  "py-1 px-3 border-2 text-white rounded-xl font-bold bg-slate-500";
const inactiveClass = "py-1 px-3 border-2 text-slate-500 rounded-xl font-bold";

const FooterNav = ({ nav, setNav }: Props) => {
  return (
    <nav className="w-full flex justify-center">
      <ul className="flex gap-4 hover:cursor-pointer">
        <li
          onClick={() => setNav("aboutus")}
          className={nav === "aboutus" ? activeClass : inactiveClass}
        >
          About Us
        </li>
        <li
          onClick={() => setNav("contacts")}
          className={nav === "contacts" ? activeClass : inactiveClass}
        >
          Contacts
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
