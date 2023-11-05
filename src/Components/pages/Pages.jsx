import React from "react";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Reset from "./Reset";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/reset" element={<Reset></Reset>}></Route>
      </Routes>
    </div>
  );
};

export default Pages;
