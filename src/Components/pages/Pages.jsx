import React from "react";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Login from "./login";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
};

export default Pages;
