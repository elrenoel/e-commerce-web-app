import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} exact={true} element={<Login />}/>
          <Route path={"/register"} exact={true} element={<Register />}/>
          <Route path={"/"} element={<Dashboard />}/>

          <Route element={<ProtectedRoute />}>
            <Route path={"/"} element={<Dashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
