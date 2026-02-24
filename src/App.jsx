import React from "react";
import Header from "./component/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return ( 
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
