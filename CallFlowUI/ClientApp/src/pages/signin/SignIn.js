import React, { useEffect, useState, useContext } from "react";
import { LinkAccountClient } from "../../api/web-api-client.ts";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Ripple } from 'primereact/ripple';
import LogoBlack from "../../assets/Logo-black.png"
import LogoWhite from "../../assets/Logo-white.png"
import { PrimeReactContext } from 'primereact/api';
import { Link } from "react-router-dom";

const CLIENT_ID = "3221d71db78c4584a0fd";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRipple } = useContext(PrimeReactContext);
  setRipple(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add your logic here to handle email and password sign in
  };

  const handleGithubSignIn = () => {
    // Add your logic here to handle GitHub sign in
    window.location.assign(
      "https://github.com/login/oauth/authorize?scope=repo&client_id=" +
        CLIENT_ID
    );
  };

  const googleLogin = (
    <div className="flex flex-row justify-center items-center gap-2">
      <img className="w-[1rem] h-[1rem]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"></img>
      <div>Login with Google</div>
    </div>
  );

  return (
    <div className="flex flex-row h-[100vh]">
      <div className="flex flex-[4_4_0%] flex-col gap-3 !items-center">
        <div className="flex flex-row w-full justify-start">
          <Image className="w-[10rem] h-[10rem]" src={LogoBlack}></Image>
        </div>
        <div className="flex flex-col w-[60%] items-center mt-8">
          <Button label={googleLogin} outlined  className="w-full p-component"/>
          <div className="flex flex-row w-full items-center gap-2 mt-4"><hr className="flex flex-[1_1_0%]"/>or<hr className="flex flex-[1_1_0%]"/></div>
          <span className="p-float-label w-full mt-12">
            <InputText
               pt={{
                root: { className: '!border-b-4' }
            }}
            className="w-full"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username">Email</label>
          </span>
          <span className="p-float-label w-full mt-8">
            <InputText 
            pt={{
              root: { className: ' !border-b-4' }
          }}
          className="w-full"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="username">Password</label>
          </span>
          <Link to={"/forgot-password"} className="mt-2 w-full underline underline-offset-2 font-bold text-sm cursor-pointer p-text-secondary">Forgot password</Link>
          <Button className="w-full !mt-12 p-ripple" label="Log in"><Ripple /></Button>
          <div className="mt-6 flex flex-row">Don't have account? <Link to={"/signup"} className="font-semibold ml-2 underline underline-offset-2 cursor-pointer p-component p-text-secondary" >Sign up for free</Link></div>
        </div>
      </div>
      <div className="card flex-[6_6_0%] justify-content-center !bg-[#F9FAFC] !rounded-l-[6rem]">
        <Image className="flex absolute start-[30%] w-[30rem] h-[30rem]" src={LogoWhite}></Image>
        <Image
          className="!rounded-l-[6rem] overflow-hidden"
          imageClassName=" h-full w-full object-cover"
          loading="lazy"
          src="https://media1.giphy.com/media/xT9Ighw18Ay7f0cIjS/giphy.gif?cid=ecf05e47e6bhdxrgn8cre3jkbhgdt13urs9qp3u5endxauv2&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="Image"
          width="250"
        />
      </div>
    </div>
  );
};

export default SignIn;
