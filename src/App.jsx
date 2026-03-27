import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./pages/AdminPage";
import EditProduct from "./pages/EditProductPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} exact={true} element={<Login />} />
          <Route path={"/register"} exact={true} element={<Register />} />

          <Route element={<ProtectedRoute allowedRoles={'admin'}/>}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
