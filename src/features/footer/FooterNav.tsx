import React from "react";

interface Props {
  setNav: React.Dispatch<React.SetStateAction<string>>;
  nav: string;
}

const FooterNav = ({ nav, setNav }: Props) => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>About Us</li>
        <li>Contacts</li>
      </ul>
    </nav>
  );
};

export default FooterNav;
