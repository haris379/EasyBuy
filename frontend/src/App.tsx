import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import LoginWithID from "./Pages/LoginWithID";
import AddProduct from "./Pages/admin/AddProduct.tsx";
import AdminDashBoard from "./Pages/admin/AdminDashBoard.tsx";
import EditProduct from "./Pages/admin/EditProduct.tsx";
import Home from "./Pages/Home.tsx";
import Cart from "./Pages/Cart.tsx";
import CounterApp from "./Pages/CounterApp.tsx";
import Navbar from "./components/Navbar.tsx";
import Login from "./Pages/Login.tsx";
import Verification from "./Pages/Verification.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";
import ResendCode from "./Pages/ResendCode.tsx";

const App = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={handlelogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/re-send-otp" element={<ResendCode />} />

        <Route path="/login-id/:id" element={<LoginWithID />} />
        <Route path="/login" element={<Login />} />

        <Route path="/counter-app" element={<CounterApp />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin/products/" element={<AdminDashBoard />} />
          <Route path="/admin/products/add-product" element={<AddProduct />} />
          <Route path="/admin/products/update/:id" element={<EditProduct />} />
        </Route>

        <Route path="/home/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
