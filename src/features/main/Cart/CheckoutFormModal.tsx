import React, { useRef } from "react";

const activeModalBackground =
  "fixed top-0 bottom-0 left-0 right-0 z-40 bg-[#000000a8] transition-colors";
const normalModalBackground =
  "fixed top-0 bottom-0 left-0 right-0 z-[-1] bg-transparent";

const displayModal =
  "bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md w-[350px] scale-1 transition-all duration-700";

const hideModal =
  "bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md w-[350px] scale-0";

interface Props {
  checkoutModalOpen: boolean;
}

const CheckoutFormModal = ({ checkoutModalOpen }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={
        checkoutModalOpen ? activeModalBackground : normalModalBackground
      }
    >
      <div
        className={checkoutModalOpen ? displayModal : hideModal}
        ref={modalRef}
      >
        Hello
      </div>
    </div>
  );
};

export default CheckoutFormModal;
