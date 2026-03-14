import React from "react";
import Header from "./component/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} exact={true} element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
