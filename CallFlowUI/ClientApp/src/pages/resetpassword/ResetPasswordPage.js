import React, {useState} from "react";
import { Steps } from "primereact/steps";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";


const ResetPasswordPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([
    {
      label: "Provide Email",
      component: <StepOne></StepOne>,
      readOnly: true
    },
    {
      label: "Input 4-digits code",
      component: <StepTwo></StepTwo>,
      readOnly: true
    },
    {
      label: "Create new password",
      component: <StepThree></StepThree>,
      readOnly: true
    }
  ]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-center">
      <div className="w-[40%] mt-[5rem] items-center flex flex-col">
        <Steps model={items} activeIndex={activeIndex} className="flex flex-col w-full"/>
        {items[activeIndex].component}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
