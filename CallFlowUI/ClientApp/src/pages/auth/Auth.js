import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Footer from "../../parts/footer/Footer";
import Header from "../../parts/header/Header";
import background from '../../assets/bg2.jpg'

function Auth() {
  return (
    <Box backgroundImage={background} >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Auth;
