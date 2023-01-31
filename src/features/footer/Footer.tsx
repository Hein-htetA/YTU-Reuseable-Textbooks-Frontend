import React, { useState } from "react";
import AboutUs from "./aboutus/AboutUs";
import Contacts from "./contacts/Contacts";
import FooterNav from "./FooterNav";

const Footer = () => {
  const [nav, setNav] = useState("aboutus");
  return (
    <footer className="py-4 px-5 shadow-[0px_-1px_6px_1px_rgba(0,0,0,0.3)]">
      <FooterNav setNav={setNav} nav={nav} />
      {nav === "aboutus" ? <AboutUs /> : <Contacts />}
    </footer>
  );
};

export default Footer;
