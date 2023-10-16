import React from "react";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import SendOTP from "../../../assets/SendOTP.png";

import { Button } from "primereact/button";
const StepOne = () => {
  return (
    <div className="w-full h-full mt-4 items-center flex flex-col">
      <Image src={SendOTP}></Image>
      <div className="flex flex-col items-center gap-4 justify-center w-full">
        <div className="w-[60%]">
          <div className="text-xl font-bold">Please tell us your email</div>
          <div className="flex flex-column gap-2">
            <InputText
              id="username"
              aria-describedby="username-help"
              className="mt-2 w-full"
            />
            <small id="username-help">
              Enter your email to reset your password.
            </small>
          </div>
        </div>

        <Button
          icon="pi pi-chevron-right"
          rounded
          text
          raised
          aria-label="Filter"
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default StepOne;
