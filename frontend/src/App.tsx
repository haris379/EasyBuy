import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [userCart, setUserCart] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUserCart([]);
    setCartCount(0);
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
      setCartCount(
        response.data.cart.items.reduce(
          (total: number, item: any) => total + item.quantity,
          0,
        ),
      );
    } catch (error: any) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: any) => {
    if (!userId || !token) {
      alert("Please Login to continue");
      return;
    }
    userCart.map((item: any) => {
      if (item.productId._id === productId) {
        return { item, quantity: item.quantity + 1 };
      }
    });
    setCartCount(cartCount + 1);
    try {
      await api.post("/cart/addToCart", { userId, productId });
    } catch (error: any) {
      console.error("Error adding Product in Cart", error);
    }
  };

  const increaseQuantity = async (productId: any) => {
    if (!userId) {
      alert("Please login first");
      return;
    }
    const updatedCart = userCart.map((item: any) => {
      if (item.productId._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartCount(cartCount + 1);
    setUserCart(updatedCart);
    try {
      await api.put(`/cart/increase/${productId}`, { userId });
    } catch (error) {
      console.error("Error in increasing Quantity of Product in Cart", error);
    }
  };

  const decreaseQuantity = async (productId: any) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    const item = userCart.find((item: any) => item.productId._id === productId);
    if (!item) return;
    if (item.quantity <= 1) {
      removeItem(productId);
      setCartCount(cartCount - 1);
      return;
    }
    const updatedCart = userCart.map((item: any) => {
      if (item.productId._id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartCount(cartCount - 1);
    setUserCart(updatedCart);
    try {
      await api.put(`/cart/decrease/${productId}`, { userId });
    } catch (error) {
      console.error("Error in decreasing Quantity of Product in Cart", error);
    }
  };

  const removeItem = async (productId: any) => {
    if (!userId) {
      alert("Please login first");
      return;
    }
    setLoading(true);
    const removed = userCart.find(
      (item: any) => item.productId?._id === productId,
    );
    if (!removed) return;
    const updatedCart = userCart.filter((item: any) => {
      return item.productId?._id !== productId;
    });
    setUserCart(updatedCart);
    setCartCount(cartCount - removed.quantity);
    try {
      await api.post("/cart/removeItem", {
        userId,
        productId,
      });
    } catch (error: any) {
      console.error("Error in Removing Product from Cart", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }
    if (userCart.length === 0) {
      return;
    }
    setLoading(true);
    setCartCount(0);
    try {
      await api.post(`/order/placeOrder`, { userId });
      setUserCart([]);
      setCartCount(0);
      setTimeout(() => {
        navigate("/orderPlaced");
      });
    } catch (error: any) {
      console.error("Error in Placing order", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCartCount(cartCount);
    loadCart();
  }, []);

  return (
    <>
      <Navbar
        onLogout={handlelogout}
        loadCart={loadCart}
        cartCount={cartCount}
        role={role}
      />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
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
        <Route
          path="/cart"
          element={
            <Cart
              removeItem={removeItem}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              loadCart={loadCart}
              userCart={userCart}
              loading={loading}
              handleOrder={handleOrder}
            />
          }
        />
        <Route path="/orderPlaced" element={<OrderPlaced />} />
      </Routes>
    </>
  );
};

export default App;
