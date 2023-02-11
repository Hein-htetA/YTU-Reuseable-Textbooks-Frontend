import React, { useState } from "react";

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

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-3 text-base flex flex-col gap-3">
      <div className="mb-2">
        Please fill at least <span className="text-pink-500">One </span>of the
        following fields.
      </div>
      <div className="flex gap-4 items-center text-sm">
        <label htmlFor="phoneNo" className="w-20">
          Phone:{" "}
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
          placeholder="Telegram Profile Link (or) Number"
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
      <button className="py-1 my-3 px-3 bg-slate-600 text-white rounded-lg w-full max-w-md self-center">
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutForm;
