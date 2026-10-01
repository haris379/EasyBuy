import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.ts";

interface NavbarProps {
  onLogout: () => void;
}

const navBtn =
  "btn-primary whitespace-nowrap px-2 py-1.5 text-center text-[11px] sm:px-4 sm:py-2 sm:text-sm hover:cursor-pointer";

const Navbar = ({ onLogout }: NavbarProps) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = userName?.split(" ")[0];
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
    const handleAuthChange = () => {
      const id = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");
      setUserId(id);
      setUserName(name);
      setRole(localStorage.getItem("role"));
      if (id) {
        loadCart();
      } else {
        setCartCount(0);
      }
    };

    const handleCartDelta = (e: Event) => {
      const delta = (e as CustomEvent<number>).detail;
      setCartCount((c) => Math.max(0, c + delta));
    };
    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("cartDelta", handleCartDelta);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("cartDelta", handleCartDelta);
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

      setCartCount(
        response.data.cart.items.reduce(
          (total: number, item: any) => total + item.quantity,
          0,
        ),
      );
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
    setRole(null);
    setCartCount(0);
    window.dispatchEvent(new Event("authChanged"));
    onLogout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-auto bg-[#800020] shadow-[#800020] text-[#F3E6D5] m-5 rounded-3xl">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex min-h-15 items-center justify-between gap-2 py-2">
          <div className="flex shrink-0 flex-col items-start justify-center">
            <Link
              to="/"
              className="text-lg font-bold leading-tight text-[#F3E6D5] transition hover:text-[#FFF9F2] sm:text-xl"
            >
              EasyBuy
            </Link>

            {userId && (
              <span className="max-w-22.5 truncate whitespace-nowrap text-[11px] font-medium leading-tight text-[#F3E6D5] sm:absolute sm:left-1/2 sm:top-1/2 sm:max-w-none sm:-translate-x-1/2 sm:-translate-y-1/2 sm:text-sm">
                <span className="sm:hidden">Hi, {firstName}</span>
                <span className="hidden sm:inline">Welcome, {userName}</span>
              </span>
            )}
          </div>

          <div className="hidden items-center justify-end gap-2 sm:flex">
            {role === "admin" ? (
              <Link to="/admin/products/" className={navBtn}>
                Admin Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/cart"
                  aria-label="Shopping cart"
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base transition  sm:h-10 sm:w-10 sm:text-lg"
                >
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-volt px-1 text-[10px] font-bold text-[#F3E6D5] sm:h-5 sm:min-w-5">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/" className={navBtn}>
                  Home
                </Link>
                <Link to="/counter-app" className={navBtn}>
                  Counter App
                </Link>
              </>
            )}

            {userId ? (
              <button onClick={logout} className={navBtn}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className={navBtn}>
                  Login
                </Link>
                <Link to="/signup" className={navBtn}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            {role !== "admin" && (
              <Link
                to="/cart"
                aria-label="Shopping cart"
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base transition  sm:h-10 sm:w-10 sm:text-lg"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-volt px-1 text-[10px] font-bold text-[#F3E6D5] sm:h-5 sm:min-w-5">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="flex h-8 w-8 items-center justify-center text-xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div
            className="flex flex-col gap-2 pb-3 sm:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {role === "admin" ? (
              <Link to="/admin/products/" className={navBtn}>
                Admin Dashboard
              </Link>
            ) : (
              <>
                <Link to="/" className={navBtn}>
                  Home
                </Link>
                <Link to="/counter-app" className={navBtn}>
                  Counter App
                </Link>
              </>
            )}
            {userId ? (
              <button onClick={logout} className={navBtn}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className={navBtn}>
                  Login
                </Link>
                <Link to="/signup" className={navBtn}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
