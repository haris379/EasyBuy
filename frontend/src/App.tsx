import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { reset } from "./reduxStore/cartSlice.ts";

import api from "./api/axios.ts";

import Signup from "./Pages/Signup";
import LoginWithID from "./Pages/LoginWithID";
import AddProduct from "./Pages/admin/AddProduct.tsx";
import AdminDashBoard from "./Pages/admin/AdminDashBoard.tsx";
import EditProduct from "./Pages/admin/EditProduct.tsx";
import Home from "./Pages/Home.tsx";
import Cart from "./Pages/Cart.tsx";
import CounterApp from "./Pages/CounterApp.tsx";
import Login from "./Pages/Login.tsx";
import Verification from "./Pages/Verification.tsx";
import OrderPlaced from "./Pages/OrderPlaced.tsx";
import ResendCode from "./Pages/ResendCode.tsx";

import Navbar from "./components/Navbar.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";

import { UserCartContext } from "./context/UserCart.tsx";
import { LoadingContext } from "./context/LoadingContext.tsx";
import { useAppDispatch } from "./reduxStore/cartHooks.ts";

import { setCartCount } from "./reduxStore/cartSlice.ts";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const userCartContext = useContext(UserCartContext);
  const LoadingCont = useContext(LoadingContext);

  const userId = localStorage.getItem("userId");

  const { userCart, setUserCart } = userCartContext;
  const { setLoading } = LoadingCont;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUserCart([]);
    dispatch(reset());
    setRole(null);
    navigate("/");
  };

  const loadCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/cart/${userId}`);
      setUserCart(response.data.cart.items);

      dispatch(
        setCartCount(
          response.data.cart.items.reduce(
            (total: number, item: any) => total + item.quantity,
            0,
          ),
        ),
      );
    } catch (error: any) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Navbar loadCart={loadCart} role={role} onlogout={handlelogout} />
      <Routes>
        <Route
          path="/"
          element={<Home userCart={userCart} loadCart={loadCart} />}
        />
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
        <Route path="/cart" element={<Cart loadCart={loadCart} />} />
        <Route path="/orderPlaced" element={<OrderPlaced />} />
      </Routes>
    </>
  );
};

export default App;
