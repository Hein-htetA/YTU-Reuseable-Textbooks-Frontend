import React, { useRef, MouseEvent, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { defaultBookImg } from "../../../url";
import {
  closeCartModal,
  SelectCartModal,
  SelectCartModalOpen,
  SelectTotalAmount,
  SelectTotalCount,
} from "../../slices/cartSlice";

const activeModalBackground =
  "fixed top-0 bottom-0 left-0 right-0 z-40 bg-[#000000a8] transition-colors";
const normalModalBackground =
  "fixed top-0 bottom-0 left-0 right-0 z-[-1] bg-transparent";

const displayModal =
  "bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md w-[350px] scale-1 transition-all duration-700";

const hideModal =
  "bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md w-[350px] scale-0";

const AddToCartModel = () => {
  const cartModalOpen = useSelector(SelectCartModalOpen);
  const cartModal = useSelector(SelectCartModal);
  const totalAmount = useSelector(SelectTotalAmount);

  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!modalRef.current!.contains(e.target as Node)) {
        dispatch(closeCartModal());
      }
    },
    [dispatch]
  );

  const clickCheckout = () => {
    dispatch(closeCartModal());
    navigate("/cart");
  };

  useEffect(() => {
    if (cartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside as any);
    } else {
      document.removeEventListener("mousedown", handleClickOutside as any);
    }
  }, [cartModalOpen, handleClickOutside]);

  return (
    <div
      className={cartModalOpen ? activeModalBackground : normalModalBackground}
    >
      <div className={cartModalOpen ? displayModal : hideModal} ref={modalRef}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <img src={defaultBookImg} alt="book" className="rounded-md" />
          <div className="flex flex-col text-sm">
            <div className="text-base font-bold mb-2 capitalize">
              {cartModal.title + "(" + cartModal.edition + ")"}
            </div>
            <div className="mb-6">Is now in your cart.</div>
            <div>
              <span className="text-base font-bold">{totalAmount} Kyats</span>{" "}
              total
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full text-sm ">
          <button
            className="py-2 rounded-full border-2 border-slate-500 uppercase"
            onClick={() => dispatch(closeCartModal())}
          >
            keep shoping
          </button>
          <button
            className="py-2 rounded-full bg-slate-500 uppercase border-2 border-slate-500 text-white"
            onClick={clickCheckout}
          >
            check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModel;
