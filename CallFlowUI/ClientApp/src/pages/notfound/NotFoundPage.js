import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";

const NotFoundPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <Badge value="404 error"></Badge>
      <div className="text-5xl font-bold mt-4">We've lost this page</div>
      <div className="text-lg mt-2">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </div>
      <span className="p-input-icon-left mt-10">
        <i className="pi pi-search" />
        <InputText placeholder="Search our site" />
      </span>
    </div>
  );
};

export default NotFoundPage;
