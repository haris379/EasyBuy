import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.ts";

import { useAppDispatch, useAppSelector } from "../reduxStore/cartHooks.ts";
import LoadingBar from "../components/LoadingBar";
import IncrementBtn from "../components/IncrementBtn";
import DecrementBtn from "../components/DecrementBtn";

import { UserCartContext } from "../context/UserCart.tsx";
import { LoadingContext } from "../context/LoadingContext.tsx";
import { increment, decrement, setCartCount } from "../reduxStore/cartSlice.ts";

interface CartProps {
  loadCart: () => void;
}

const Cart = ({ loadCart }: CartProps) => {
  const userId = localStorage.getItem("userId");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const userCartContext = useContext(UserCartContext);
  const loadingCont = useContext(LoadingContext);

  const { userCart, setUserCart } = userCartContext;
  const { loading, setLoading } = loadingCont;

  const cartCount = useAppSelector((state) => state.cartCount.cartCount);
  const dispatch = useAppDispatch();

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
    dispatch(increment());
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
    dispatch(decrement());
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
    dispatch(setCartCount(cartCount - removed.quantity));
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
    if (!userId) {
      alert("Please Login to add items in your cart");
      return;
    }
    loadCart();
  }, []);

  useEffect(() => {
    const totalPrice = userCart.reduce((total, item) => {
      if (!item.productId) return total;

      return total + item.quantity * item.productId.price;
    }, 0);

    setTotal(totalPrice);
  }, [userCart]);

  return (
    <>
      <div className="min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="font-bold text-2xl text-ink">Your Cart</h1>
          </div>

          {loading ? (
            <div className="text-center flex justify-center items-center">
              <LoadingBar />
            </div>
          ) : !userId ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">
                Please Login to add items your cart
              </p>
            </div>
          ) : userCart.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-ink-soft">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userCart.map((item: any) => {
                if (!item.productId) return null;
                return (
                  <div
                    key={item._id}
                    className="card p-4  bg-[#FFF9F2] sm:p-5 border-2 border-[#800020] rounded-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-20 h-20 object-cover rounded-lg bg-paper shrink-0"
                        />

                        <div className="flex flex-col">
                          {/* Product Price and Title  */}
                          <div className="min-w-0">
                            <h2 className="font-semibold text-ink truncate">
                              {item.productId.title}
                            </h2>
                            <p className="text-sm text-ink-soft  font-light">
                              Rs.{item.productId.price}
                            </p>
                          </div>

                          {/* Buttons  */}
                          <div className="h-7 w-fit border border-line rounded-md mt-2">
                            <div className="flex h-full items-center px-2 gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(item.productId._id)
                                }
                                className="w-5 h-5 flex items-center justify-center text-ink-soft"
                              >
                                <DecrementBtn />
                              </button>
                              <span className="w-6 text-sm text-center text-black">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(item.productId._id)
                                }
                                className="w-4 h-3 flex items-center justify-center text-ink-soft"
                              >
                                <IncrementBtn />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-28 text-left sm:text-right">
                        <p className="text-sm font-semibold text-ink">
                          Rs. {item.quantity * item.productId.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-sm bg-[#800020] text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors w-full sm:w-auto"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="">
                <h2>
                  <strong>Total Amount</strong> : <span>{total}</span>
                </h2>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => handleOrder()}
              disabled={userCart.length === 0 || loading}
              className="w-1/2 py-3 m-5 bg-[#7A1F3D] hover:bg-[#92284A] text-[#F3E6D5] text-center font-semibold rounded-lg  duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
