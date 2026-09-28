import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.ts";
interface NavbarProps {
  onLogout: () => void;
}
const Navbar = ({ onLogout }: NavbarProps) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [cartCount, setCartCount] = useState(0);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    loadCart();
    const handleAuthChange = () => {
      const id = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");
      setUserId(id);
      setUserName(name);
      if (id) {
        loadCart();
      } else {
        setCartCount(0);
      }
    };
    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);
  const loadCart = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        setCartCount(0);
        return;
      }
      const response = await api.get(`/cart/${id}`);
      setCartCount(response.data.cart.items.length);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartCount(0);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUserId(null);
    setUserName(null);
    setCartCount(0);
    window.dispatchEvent(new Event("authChanged"));
    onLogout();
    navigate("/");
  };
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[70px] flex-col justify-center gap-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-2">
          <div className="flex flex-col items-center lg:items-start">
            <Link
              to="/"
              className="text-lg font-bold text-gray-800 transition hover:text-gray-600 sm:text-xl"
            >
              EasyBuy
            </Link>
            {userId && (
              <h2 className="mt-1 text-xs font-medium text-gray-700 sm:text-sm">
                Welcome, {userName}
              </h2>
            )}
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-auto lg:justify-end">
            {role === "admin" ? (
              <Link
                to="/admin/products/"
                className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
              >
                Admin Dashboard
              </Link>
            ) : (
              <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-auto lg:justify-end">
                <Link
                  to="/cart"
                  aria-label="Shopping cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-md text-lg transition hover:bg-gray-200"
                >
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-volt px-1 text-[10px] font-bold text-black">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/"
                  className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
                >
                  Home
                </Link>

                <Link
                  to="/counter-app"
                  className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
                >
                  Counter App
                </Link>
              </div>
            )}

            {userId ? (
              <button
                onClick={logout}
                className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary whitespace-nowrap px-3 py-2 text-xs text-center sm:px-4 sm:text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
