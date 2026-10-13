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
import OrderPlaced from "./Pages/OrderPlaced.tsx";
import { useState, useEffect } from "react";
import api from "./api/axios.ts";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [userCart, setUserCart] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  // Logout
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setRole(null);
    setUserCart([]);
    navigate("/");
  };

  const loadCart = async () => {
    if (!userId || !token || role === "admin") {
      return;
    }
    // setLoading(true);
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
      console.error("Backend response:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.log("Failed to load cart:", error);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items: any[]) => {
    return items.reduce((total: any, item: any) => {
      return total + item.quantity * item.productId.price;
    }, 0);
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
      console.log("Error adding Product in Cart", error);
    }
  };

  const increaseQuantity = async (productId: any) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    const previouCart = userCart.map((item: any) => ({ ...item }));
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
    setTotal(calculateTotal(updatedCart));
    try {
      await api.put(`/cart/increase/${productId}`, { userId });
    } catch (error) {
      setUserCart(previouCart);
      setTotal(calculateTotal(previouCart));
      console.error(error);
    }
  };

  const decreaseQuantity = async (productId: any) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    const previouCart = userCart.map((item: any) => ({ ...item }));
    const item = userCart.find((item: any) => item.productId._id === productId);
    if (!item) return;
    if (item.quantity <= 1) {
      removeItem(productId);
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
    setTotal(calculateTotal(updatedCart));
    try {
      await api.put(`/cart/decrease/${productId}`, { userId });
    } catch (error) {
      setUserCart(previouCart);
      setTotal(calculateTotal(previouCart));
      console.error(error);
    }
  };

  const removeItem = async (productId: any) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    const previouCart = [...userCart];
    const removed = userCart.find(
      (item: any) => item.productId?._id === productId,
    );
    if (!removed) return;
    const updatedCart = userCart.filter((item: any) => {
      return item.productId?._id !== productId;
    });
    setUserCart(updatedCart);
    // setTotal(calculateTotal(updatedCart));
    try {
      await api.post("/cart/removeItem", {
        userId,
        productId,
      });

      // window.dispatchEvent(
      //   new CustomEvent("cartDelta", { detail: -removed.quantity }),
      // );
    } catch (error: any) {
      setUserCart(previouCart);
      // window.dispatchEvent(
      //   new CustomEvent("cartDelta", { detail: removed.quantity }),
      // );
      console.error(error);
    }
  };

  useEffect(() => {
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
              userCart={userCart}
              loading={loading}
              total={total}
            />
          }
        />
        <Route path="/orderPlaced" element={<OrderPlaced />} />
      </Routes>
    </>
  );
};

export default App;
