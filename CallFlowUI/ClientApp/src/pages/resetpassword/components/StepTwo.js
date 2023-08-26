import React from "react";
import { InputMask } from 'primereact/inputmask';
import { Button } from "primereact/button";
const StepTwo = () => {
  return (
    <div className="w-full h-full mt-4 items-center flex flex-col">
        <div className="flex flex-col items-center gap-4">

      <div>
      <div className="flex flex-row items-center w-full gap-2 justify-center">
      <InputMask mask="9" placeholder="_" className="w-[4rem]"/>
      <InputMask mask="9" placeholder="_" className="w-[4rem]"/>
      <InputMask mask="9" placeholder="_" className="w-[4rem]"/>
      <InputMask mask="9" placeholder="_" className="w-[4rem]"/>
      </div>
      <div className="mt-2 flex flex-row gap-2">You didn't receive our email? <p className="underline font-bold hover:cursor-pointer">Send again</p></div>
      </div>
      <Button
          icon="pi pi-chevron-right"
          rounded
          text
          raised
          aria-label="Filter"
          className="!ml-10"
          />
          </div>
    </div>
  );
};

export default StepTwo;
