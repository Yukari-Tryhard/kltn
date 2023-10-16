import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
const StepThree = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-full mt-4 items-center flex flex-col">
      <div className="flex flex-column gap-2 w-[60%]">
        <label htmlFor="password" className="font-bold">New Password</label>
        <InputText
          id="password"
          aria-describedby="password-help"
          pt={{
            root: { className: " !border-b-4" },
          }}
          type="password"
        />
        <small id="password-help">
          Enter your new Password.
        </small>
      </div>
      <div className="flex flex-column gap-2 w-[60%] mt-4">
        <label htmlFor="re-password" className="font-bold">Retype your New Passoword</label>
        <InputText
          id="re-password"
          aria-describedby="re-password-help"
          pt={{
            root: { className: " !border-b-4" },
          }}
          type="password"
        />
        <small id="re-password-help">
          Re-enter your password.
        </small>
        <div className="w-full justify-center flex">
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
    </div>
  );
};

export default StepThree;
