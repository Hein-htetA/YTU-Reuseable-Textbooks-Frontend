import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { addNewOrder, SelectAddNewOrderStatus } from "../../slices/orderSlice";
import { BsArrowClockwise } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  openAuthenticationModal,
  selectIsLoggedIn,
} from "../../slices/userSlice";

const errorClass =
  "decoration-red-500 underline mb-2 underline-offset-4 decoration-2";
const normalClass = "mb-2";

export interface CheckoutFormInterface {
  phone: string;
  telegram: string;
  viber: string;
  facebook: string;
}

const CheckoutForm = () => {
  const [formValues, setFormValues] = useState<CheckoutFormInterface>({
    phone: "",
    telegram: "",
    viber: "",
    facebook: "",
  });

  const [formError, setFormError] = useState(false);

  const addNewOrderStatus = useSelector(SelectAddNewOrderStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (!isLoggedIn) {
      dispatch(openAuthenticationModal());
      return;
    }
    let error = true;
    for (let i in formValues) {
      if (formValues[i as keyof CheckoutFormInterface].trim().length !== 0) {
        error = false;
        break;
      }
    }
    if (error) {
      setFormError(true);
      return;
    }
    try {
      await dispatch(addNewOrder(formValues)).unwrap();
      navigate("/cart/order-history");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-3 text-base flex flex-col gap-3">
      <div className={formError ? errorClass : normalClass}>
        Please fill at least <span className="text-pink-500">One </span>of the
        following fields.
      </div>
      <div className="flex gap-4 items-center text-sm">
        <label htmlFor="phoneNo" className="w-20">
          Phone:
        </label>
        <input
          type="text"
          name="phone"
          className="px-2 py-1 border-2 border-slate-500 rounded-md grow outline-none"
          placeholder="+959776222333"
          onChange={onChangeInput}
          value={formValues.phone}
        />
      </div>
      <div className="flex gap-4 items-center text-sm">
        <label htmlFor="telegram" className="w-20">
          Telegram:
        </label>
        <input
          type="text"
          name="telegram"
          className="px-2 py-1 border-2 border-slate-500 rounded-md grow outline-none"
          placeholder="Telegram Profile Link"
          onChange={onChangeInput}
          value={formValues.telegram}
        />
      </div>
      <div className="flex gap-4 items-center text-sm">
        <label htmlFor="viber" className="w-20">
          Viber:
        </label>
        <input
          type="text"
          name="viber"
          className="px-2 py-1 border-2 border-slate-500 rounded-md grow outline-none"
          placeholder="Viber Number"
          onChange={onChangeInput}
          value={formValues.viber}
        />
      </div>
      <div className="flex gap-4 items-center text-sm">
        <label htmlFor="facebook" className="w-20">
          Facebook:
        </label>
        <input
          type="text"
          name="facebook"
          className="px-2 py-1 border-2 border-slate-500 rounded-md grow outline-none"
          placeholder="Facebook Profile Link"
          onChange={onChangeInput}
          value={formValues.facebook}
        />
      </div>
      <button
        className="py-2 my-3 px-3 bg-slate-600 text-white rounded-lg w-full max-w-md self-center flex justify-center gap-1 items-center disabled:bg-slate-400"
        onClick={handleConfirmOrder}
        disabled={addNewOrderStatus === "loading"}
      >
        {addNewOrderStatus === "loading" && (
          <BsArrowClockwise className="text-2xl animate-spin" />
        )}
        <div>Confirm Order</div>
      </button>
    </div>
  );
};

export default CheckoutForm;
