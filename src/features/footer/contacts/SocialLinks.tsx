import React from "react";
import { BsTelegram } from "react-icons/bs";
import { FaViber, FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const SocialLinks = () => {
  return (
    <ul className="w-1/2 flex mx-auto text-2xl justify-center gap-4 text-slate-500">
      <li>
        <a
          href="https://www.facebook.com/profile.php?id=100090265963446&mibextid=ZbWKwL"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaFacebook />
        </a>
      </li>
      <li>
        <a href="https://t.me/Hein_HtetAung" target={"_blank"} rel="noreferrer">
          <BsTelegram />
        </a>
      </li>
      <li>
        <a
          href="mailto:heinha12345@gmail.com"
          target={"_blank"}
          rel="noreferrer"
        >
          <TfiEmail />
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
